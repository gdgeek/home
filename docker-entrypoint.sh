#!/bin/sh
set -e

# ============================================================
# docker-entrypoint.sh
# 动态生成 Nginx 负载均衡 + failover 配置
#
# 环境变量格式：
#   API_URL=https://api.xrteeth.com                    兼容旧变量，等同 APP_API_1_URL
#   BACKUP_API_URL=https://api.tmrpp.com               兼容旧变量，等同 APP_API_2_URL
#   APP_API_1_URL=https://api.xrteeth.com
#   APP_API_1_WEIGHT=60                                （可选，默认平均分配）
#   APP_API_2_URL=https://api.tmrpp.com
#   APP_API_2_WEIGHT=40
#   APP_API_3_URL=https://api.third.com
#   AUTH_API_URL=https://identity.xrteeth.com           兼容旧变量，等同 APP_AUTH_1_URL
#   AUTH_PROVIDER=identity                              可选，默认 legacy
#   APP_AUTH_1_URL=https://identity.xrteeth.com
#   APP_AUTH_1_WEIGHT=100                               （可选，默认平均分配）
#   APP_RESOLVER=8.8.8.8 223.5.5.5                    （可选，DNS 解析服务器）
#
# 生成负载均衡 + failover：
#   split_clients 按权重分流 → map 映射后端 URL/Host
#   /api/      → 加权分流到 APP_API_N → failover 到环形下一个
#   /api-auth/ → 加权分流到 APP_AUTH_N → failover 到环形下一个
# ============================================================

TEMPLATE="/etc/nginx/templates/default.conf.template"
OUTPUT="/etc/nginx/conf.d/default.conf"

# 全局累积变量（http 层级配置：split_clients + map）
LB_HTTP_BLOCK=""

normalize_url() {
  value="$1"
  while [ "${value%/}" != "$value" ]; do
    value="${value%/}"
  done
  printf '%s' "$value"
}

configure_api_upstreams() {
  # 兼容旧变量：API_URL 等同 APP_API_1_URL，BACKUP_API_URL 等同 APP_API_2_URL。
  if [ -z "${APP_API_1_URL:-}" ] && [ -n "${API_URL:-}" ]; then
    APP_API_1_URL="$API_URL"
    export APP_API_1_URL
  fi

  if [ -z "${APP_API_2_URL:-}" ] && [ -n "${BACKUP_API_URL:-}" ]; then
    APP_API_2_URL="$BACKUP_API_URL"
    export APP_API_2_URL
  fi

  i=1
  while true; do
    eval "url=\${APP_API_${i}_URL:-}"
    [ -z "$url" ] && break

    normalized=$(normalize_url "$url")
    eval "APP_API_${i}_URL=\"\$normalized\""
    eval "export APP_API_${i}_URL"

    i=$((i + 1))
  done
}

configure_auth_upstreams() {
  # 兼容旧变量：AUTH_API_URL 等同 APP_AUTH_1_URL。
  if [ -z "${APP_AUTH_1_URL:-}" ] && [ -n "${AUTH_API_URL:-}" ]; then
    APP_AUTH_1_URL="$AUTH_API_URL"
    export APP_AUTH_1_URL
  fi

  i=1
  while true; do
    eval "url=\${APP_AUTH_${i}_URL:-}"
    [ -z "$url" ] && break

    normalized=$(normalize_url "$url")
    eval "APP_AUTH_${i}_URL=\"\$normalized\""
    eval "export APP_AUTH_${i}_URL"

    i=$((i + 1))
  done
}

# ============================================================
# generate_lb_config
#   通用函数：为指定前缀生成负载均衡配置
#
# 参数：
#   $1 = ENV_PREFIX   环境变量前缀（如 APP_API）
#   $2 = LOC_PATH     location 路径（如 /api/）
#   $3 = PREFIX_NAME  Nginx 变量名前缀（如 api）
#   $4 = WITH_GEEK    是否包含 GEEK 自定义头和 WebSocket（yes/no）
#   $5 = FAILOVER_STATUS_CODES  触发 failover 的状态码（可选，默认 502 503 504）
#
# 输出（通过全局变量）：
#   LB_HTTP_BLOCK += split_clients + map 块（http 层级）
#   CHAIN_RESULT   = location 块（server 层级）
# ============================================================
generate_lb_config() {
  ENV_PREFIX="$1"
  LOC_PATH="$2"
  PREFIX_NAME="$3"
  WITH_GEEK="$4"
  FAILOVER_STATUS_CODES="${5:-502 503 504}"

  CHAIN_RESULT=""

  # --- 1. 收集后端信息 ---
  TOTAL=0
  i=1
  while true; do
    eval "url=\${${ENV_PREFIX}_${i}_URL:-}"
    if [ -z "$url" ]; then
      break
    fi

    eval "host=\${${ENV_PREFIX}_${i}_HOST:-}"
    eval "weight=\${${ENV_PREFIX}_${i}_WEIGHT:-}"

    # 自动从 URL 提取 Host
    if [ -z "$host" ]; then
      host=$(echo "$url" | sed -E 's|https?://||' | sed 's|/.*||' | sed 's|:.*||')
    fi

    TOTAL=$((TOTAL + 1))
    eval "LB_URL_${TOTAL}=\"${url}\""
    eval "LB_HOST_${TOTAL}=\"${host}\""
    eval "LB_WEIGHT_${TOTAL}=\"${weight}\""
    i=$((i + 1))
  done

  if [ "$TOTAL" -eq 0 ]; then
    echo "[entrypoint] WARNING: No ${ENV_PREFIX}_N_URL configured, skipping ${LOC_PATH}"
    return
  fi

  echo "[entrypoint] ---- ${LOC_PATH} load balancing ----"
  echo "[entrypoint] Found $TOTAL backend(s)"

  # 打印后端列表
  i=1
  while [ "$i" -le "$TOTAL" ]; do
    eval "u=\$LB_URL_${i}"
    eval "h=\$LB_HOST_${i}"
    eval "w=\$LB_WEIGHT_${i}"
    echo "[entrypoint]   Backend $i: $u (Host: $h, Weight: ${w:-auto})"
    i=$((i + 1))
  done

  # --- GEEK 头和 WebSocket 块 ---
  GEEK_BLOCK=""
  if [ "$WITH_GEEK" = "yes" ]; then
    GEEK_BLOCK="
        # GEEK 自定义请求头
        proxy_set_header X-GEEK-Proxy \"true\";
        proxy_set_header X-GEEK-Real-IP \$remote_addr;
        proxy_set_header X-GEEK-Source \"nginx\";

        # WebSocket 支持
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection \"upgrade\";

        # 请求体大小
        client_max_body_size 50m;"
  fi

  # ==========================================================
  # 单后端：退化为简单反向代理 + resolver 动态解析
  # ==========================================================
  if [ "$TOTAL" -eq 1 ]; then
    eval "url=\$LB_URL_1"
    eval "host=\$LB_HOST_1"

    echo "[entrypoint] Mode: single backend (resolver-enabled)"

    CHAIN_RESULT="
    # ============ 反向代理 - ${LOC_PATH} (单后端 + DNS 动态解析) ============
    location ${LOC_PATH} {
        set \$${PREFIX_NAME}_single_backend \"${url}\";
        rewrite ^${LOC_PATH}(.*)\$ /\$1 break;
        proxy_pass \$${PREFIX_NAME}_single_backend;

        # HTTPS 上游：启用 SNI
        proxy_ssl_server_name on;
        proxy_set_header Host ${host};
        proxy_set_header X-Forwarded-Host \$host;
        proxy_set_header X-Original-Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
${GEEK_BLOCK}
        # 超时配置
        proxy_connect_timeout 5s;
        proxy_read_timeout 120s;
        proxy_send_timeout 120s;
    }"
    return
  fi

  # ==========================================================
  # 多后端：split_clients 加权分流 + map 映射 + failover
  # ==========================================================
  echo "[entrypoint] Mode: load balancing ($TOTAL backends)"

  # --- 2. 计算权重 ---
  TOTAL_WEIGHT=0
  HAS_WEIGHT=0
  i=1
  while [ "$i" -le "$TOTAL" ]; do
    eval "w=\$LB_WEIGHT_${i}"
    if [ -n "$w" ]; then
      HAS_WEIGHT=1
      TOTAL_WEIGHT=$((TOTAL_WEIGHT + w))
    fi
    i=$((i + 1))
  done

  # 未指定权重时平均分配
  if [ "$HAS_WEIGHT" -eq 0 ]; then
    i=1
    while [ "$i" -le "$TOTAL" ]; do
      eval "LB_WEIGHT_${i}=1"
      i=$((i + 1))
    done
    TOTAL_WEIGHT=$TOTAL
  else
    # 为未指定权重的后端设置默认权重 1
    i=1
    while [ "$i" -le "$TOTAL" ]; do
      eval "w=\$LB_WEIGHT_${i}"
      if [ -z "$w" ]; then
        eval "LB_WEIGHT_${i}=1"
        TOTAL_WEIGHT=$((TOTAL_WEIGHT + 1))
      fi
      i=$((i + 1))
    done
  fi

  # --- 3. 生成 split_clients（加权分流）---
  SC="
# ---- ${LOC_PATH} 加权分流 ----
split_clients \"\$request_id\" \$${PREFIX_NAME}_pool {"
  i=1
  while [ "$i" -le "$TOTAL" ]; do
    eval "w=\$LB_WEIGHT_${i}"
    if [ "$i" -eq "$TOTAL" ]; then
      SC="${SC}
    * ${i};"
    else
      # 使用 awk 计算百分比（避免 shell 整除截断）
      pct=$(awk "BEGIN{printf \"%.1f\", ${w}/${TOTAL_WEIGHT}*100}")
      SC="${SC}
    ${pct}% ${i};"
    fi
    i=$((i + 1))
  done
  SC="${SC}
}"

  # --- 4. 生成 map（URL 和 Host 映射）---
  MAP_URL="
# ---- ${LOC_PATH} 后端 URL 映射 ----
map \$${PREFIX_NAME}_pool \$${PREFIX_NAME}_backend_url {"
  MAP_HOST="
# ---- ${LOC_PATH} 后端 Host 映射 ----
map \$${PREFIX_NAME}_pool \$${PREFIX_NAME}_backend_host {"

  i=1
  while [ "$i" -le "$TOTAL" ]; do
    eval "u=\$LB_URL_${i}"
    eval "h=\$LB_HOST_${i}"
    MAP_URL="${MAP_URL}
    ${i} \"${u}\";"
    MAP_HOST="${MAP_HOST}
    ${i} \"${h}\";"
    i=$((i + 1))
  done
  MAP_URL="${MAP_URL}
}"
  MAP_HOST="${MAP_HOST}
}"

  # --- 5. 生成 failover map（环形：N → (N%TOTAL)+1）---
  FB_MAP_URL="
# ---- ${LOC_PATH} Failover URL 映射（环形）----
map \$${PREFIX_NAME}_pool \$${PREFIX_NAME}_fb_url {"
  FB_MAP_HOST="
# ---- ${LOC_PATH} Failover Host 映射（环形）----
map \$${PREFIX_NAME}_pool \$${PREFIX_NAME}_fb_host {"

  i=1
  while [ "$i" -le "$TOTAL" ]; do
    fb_idx=$(( (i % TOTAL) + 1 ))
    eval "fu=\$LB_URL_${fb_idx}"
    eval "fh=\$LB_HOST_${fb_idx}"
    FB_MAP_URL="${FB_MAP_URL}
    ${i} \"${fu}\";"
    FB_MAP_HOST="${FB_MAP_HOST}
    ${i} \"${fh}\";"
    i=$((i + 1))
  done
  FB_MAP_URL="${FB_MAP_URL}
}"
  FB_MAP_HOST="${FB_MAP_HOST}
}"

  # 累积到 http 层级配置
  LB_HTTP_BLOCK="${LB_HTTP_BLOCK}${SC}${MAP_URL}${MAP_HOST}${FB_MAP_URL}${FB_MAP_HOST}"

  # 打印分流比例
  echo "[entrypoint] Traffic split (total weight: $TOTAL_WEIGHT):"
  i=1
  while [ "$i" -le "$TOTAL" ]; do
    eval "w=\$LB_WEIGHT_${i}"
    eval "u=\$LB_URL_${i}"
    pct=$(awk "BEGIN{printf \"%.1f\", ${w}/${TOTAL_WEIGHT}*100}")
    fb_idx=$(( (i % TOTAL) + 1 ))
    eval "fu=\$LB_URL_${fb_idx}"
    echo "[entrypoint]   Pool $i → $u (${pct}%), failover → $fu"
    i=$((i + 1))
  done

  # --- 6. 生成 location 块（server 层级）---
  CHAIN_RESULT="
    # ============ 反向代理 - ${LOC_PATH} (负载均衡 + Failover) ============
    location ${LOC_PATH} {
        rewrite ^${LOC_PATH}(.*)\$ /\$1 break;
        proxy_pass \$${PREFIX_NAME}_backend_url;

        # HTTPS 上游：启用 SNI
        proxy_ssl_server_name on;
        proxy_set_header Host \$${PREFIX_NAME}_backend_host;
        proxy_set_header X-Forwarded-Host \$host;
        proxy_set_header X-Original-Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
${GEEK_BLOCK}
        # 超时配置（快速失败以便切 failover）
        proxy_connect_timeout 5s;
        proxy_read_timeout 120s;
        proxy_send_timeout 120s;

        # Failover 到环形下一个后端
        proxy_intercept_errors on;
        error_page ${FAILOVER_STATUS_CODES} = @${PREFIX_NAME}_failover;
    }

    # ============ 反向代理 - ${LOC_PATH} Failover ============
    location @${PREFIX_NAME}_failover {
        rewrite ^${LOC_PATH}(.*)\$ /\$1 break;
        proxy_pass \$${PREFIX_NAME}_fb_url;

        # HTTPS 上游：启用 SNI
        proxy_ssl_server_name on;
        proxy_set_header Host \$${PREFIX_NAME}_fb_host;
        proxy_set_header X-Forwarded-Host \$host;
        proxy_set_header X-Original-Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
${GEEK_BLOCK}
        # 超时配置
        proxy_connect_timeout 5s;
        proxy_read_timeout 120s;
        proxy_send_timeout 120s;
    }"
}

inject_locations() {
  PLACEHOLDER="$1"
  CONTENT="$2"
  if [ -n "$CONTENT" ]; then
    LOC_FILE=$(mktemp)
    printf '%s' "$CONTENT" > "$LOC_FILE"
    awk -v file="$LOC_FILE" -v marker="$PLACEHOLDER" '
      $0 ~ marker {
        while ((getline line < file) > 0) print line
        close(file)
        next
      }
      { print }
    ' "$OUTPUT" > "${OUTPUT}.tmp"
    mv "${OUTPUT}.tmp" "$OUTPUT"
    rm -f "$LOC_FILE"
  fi
}

# JSON 编码函数（不依赖 Python）
# 如果输入为空，返回 null；否则返回 JSON 字符串
json_encode() {
  if [ -z "$1" ]; then
    echo "null"
  else
    # 简单的 JSON 字符串转义：替换 \ 为 \\，替换 " 为 \"
    echo "$1" | sed 's/\\/\\\\/g; s/"/\\"/g' | awk '{printf "\"%s\"", $0}'
  fi
}

configure_api_upstreams
configure_auth_upstreams

# --- 1. 生成 API 负载均衡配置 ---
generate_lb_config "APP_API" "/api/" "api" "yes"
API_LOCATIONS="$CHAIN_RESULT"

# --- 2. 生成统一认证 API 负载均衡配置 ---
generate_lb_config "APP_AUTH" "/api-auth/" "auth" "yes"
AUTH_LOCATIONS="$CHAIN_RESULT"

# --- 3. 生成 resolver 配置 ---
RESOLVER_SERVERS="${APP_RESOLVER:-8.8.8.8 223.5.5.5}"
RESOLVER_BLOCK="resolver ${RESOLVER_SERVERS} valid=30s ipv6=off;
resolver_timeout 5s;"
echo "[entrypoint] DNS resolver: ${RESOLVER_SERVERS} (valid=30s)"

# --- 4. 复制模板并注入动态配置 ---
cp "$TEMPLATE" "$OUTPUT"
inject_locations "# __RESOLVER__" "$RESOLVER_BLOCK"
inject_locations "# __LB_HTTP_BLOCK__" "$LB_HTTP_BLOCK"
inject_locations "# __API_LOCATIONS__" "$API_LOCATIONS"
inject_locations "# __AUTH_LOCATIONS__" "$AUTH_LOCATIONS"

echo "[entrypoint] Nginx config generated at $OUTPUT"

# --- 5. 容器启动时注入运行时配置（JSON 安全编码，防止注入）---
# BRAND_ID 不设默认值；为空时前端会根据访问域名选择品牌。
BRAND_ID="${BRAND_ID:-}"
WORDPRESS_API_URL="${WORDPRESS_API_URL:-}"
API_URL="${API_URL:-}"
BACKUP_API_URL="${BACKUP_API_URL:-}"
AUTH_API_URL="${AUTH_API_URL:-}"
AUTH_PROVIDER="${AUTH_PROVIDER:-}"

# 已配置 APP_API_N_URL 时，浏览器只访问同源 /api，由 Nginx 负责主备/分流/failover。
if [ -n "${APP_API_1_URL:-}" ]; then
  RUNTIME_API_URL="/api"
  RUNTIME_BACKUP_API_URL=""
else
  RUNTIME_API_URL="$API_URL"
  RUNTIME_BACKUP_API_URL="$BACKUP_API_URL"
fi

# 已配置 APP_AUTH_N_URL 时，浏览器只访问同源 /api-auth，由 Nginx 负责主备/分流/failover。
if [ -n "${APP_AUTH_1_URL:-}" ]; then
  RUNTIME_AUTH_API_URL="/api-auth"
else
  RUNTIME_AUTH_API_URL="$AUTH_API_URL"
fi

# 从构建产物中读取打包时间版本号（北京时间）
APP_VERSION=""
BUILD_TIME=""
if [ -f "/usr/share/nginx/html/health" ]; then
  APP_VERSION=$(sed -n 's/.*"version"[[:space:]]*:[[:space:]]*"\([^"]*\)".*/\1/p' /usr/share/nginx/html/health | head -1)
  BUILD_TIME=$(sed -n 's/.*"buildTime"[[:space:]]*:[[:space:]]*"\([^"]*\)".*/\1/p' /usr/share/nginx/html/health | head -1)
fi

if [ -z "$BUILD_TIME" ] && [ -d "/usr/share/nginx/html/assets" ]; then
  BUILD_TIME=$(grep -ho '20[0-9][0-9]-[0-9][0-9]-[0-9][0-9]T[0-9][0-9]:[0-9][0-9]:[0-9][0-9]+08:00' /usr/share/nginx/html/assets/*.js 2>/dev/null | head -1)
fi

if [ -z "$APP_VERSION" ] && [ -d "/usr/share/nginx/html/assets" ]; then
  APP_VERSION=$(grep -ho '20[0-9][0-9]-[0-9][0-9]-[0-9][0-9] [0-9][0-9]:[0-9][0-9]:[0-9][0-9] GMT+8' /usr/share/nginx/html/assets/*.js 2>/dev/null | head -1)
fi

if [ -z "$APP_VERSION" ]; then
  APP_VERSION="$BUILD_TIME"
fi

BRAND_ID_JSON=$(json_encode "$BRAND_ID")
WORDPRESS_API_URL_JSON=$(json_encode "$WORDPRESS_API_URL")
API_URL_JSON=$(json_encode "$RUNTIME_API_URL")
BACKUP_API_URL_JSON=$(json_encode "$RUNTIME_BACKUP_API_URL")
AUTH_API_URL_JSON=$(json_encode "$RUNTIME_AUTH_API_URL")
AUTH_PROVIDER_JSON=$(json_encode "$AUTH_PROVIDER")
APP_VERSION_JSON=$(json_encode "$APP_VERSION")
BUILD_TIME_JSON=$(json_encode "$BUILD_TIME")

echo "Injecting runtime config:"
echo "  BRAND_ID=${BRAND_ID_JSON}"
echo "  WORDPRESS_API_URL=${WORDPRESS_API_URL_JSON}"
echo "  API_URL=${API_URL_JSON}"
echo "  BACKUP_API_URL=${BACKUP_API_URL_JSON}"
echo "  AUTH_API_URL=${AUTH_API_URL_JSON}"
echo "  AUTH_PROVIDER=${AUTH_PROVIDER_JSON}"
echo "  APP_VERSION=${APP_VERSION_JSON}"
echo "  BUILD_TIME=${BUILD_TIME_JSON}"

sed -i "s|<head>|<head><script>window.__BRAND_ID__=${BRAND_ID_JSON};window.__WORDPRESS_API_URL__=${WORDPRESS_API_URL_JSON};window.__API_URL__=${API_URL_JSON};window.__BACKUP_API_URL__=${BACKUP_API_URL_JSON};window.__AUTH_API_URL__=${AUTH_API_URL_JSON};window.__AUTH_PROVIDER__=${AUTH_PROVIDER_JSON};window.__APP_VERSION__=${APP_VERSION_JSON};window.__BUILD_TIME__=${BUILD_TIME_JSON};</script>|" /usr/share/nginx/html/index.html

printf '{\n  "status": "healthy",\n  "version": %s,\n  "buildTime": %s\n}\n' "$APP_VERSION_JSON" "$BUILD_TIME_JSON" > /usr/share/nginx/html/health

# --- 6. 生成调试信息 ---
API_LIST=""
i=1
while true; do
  eval "url=\${APP_API_${i}_URL:-}"
  [ -z "$url" ] && break
  url_json=$(json_encode "$url")
  [ -n "$API_LIST" ] && API_LIST="${API_LIST},
  "
  API_LIST="${API_LIST}\"APP_API_${i}_URL\": ${url_json}"
  i=$((i + 1))
done

AUTH_LIST=""
i=1
while true; do
  eval "url=\${APP_AUTH_${i}_URL:-}"
  [ -z "$url" ] && break
  url_json=$(json_encode "$url")
  [ -n "$AUTH_LIST" ] && AUTH_LIST="${AUTH_LIST},
  "
  AUTH_LIST="${AUTH_LIST}\"APP_AUTH_${i}_URL\": ${url_json}"
  i=$((i + 1))
done

cat > /usr/share/nginx/html/debug-env.json <<EOF
{
  ${API_LIST}${API_LIST:+,}
  ${AUTH_LIST}${AUTH_LIST:+,}
  "runtimeApiUrl": ${API_URL_JSON},
  "runtimeAuthApiUrl": ${AUTH_API_URL_JSON},
  "authProvider": ${AUTH_PROVIDER_JSON},
  "legacyApiUrl": $(json_encode "$API_URL"),
  "legacyBackupApiUrl": $(json_encode "$BACKUP_API_URL"),
  "legacyAuthApiUrl": $(json_encode "$AUTH_API_URL"),
  "buildTime": "$(TZ='Asia/Shanghai' date '+%Y-%m-%d %H:%M:%S')",
  "hostname": "$(hostname)"
}
EOF

echo "Runtime config injected successfully"

exec "$@"
