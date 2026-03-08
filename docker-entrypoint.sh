#!/bin/sh
# 容器启动时注入运行时配置（JSON 安全编码，防止注入）
BRAND_ID="${BRAND_ID:-xingkou}"
WORDPRESS_API_URL="${WORDPRESS_API_URL:-}"
API_URL="${API_URL:-}"
BACKUP_API_URL="${BACKUP_API_URL:-}"
WORKBENCH_URL="${WORKBENCH_URL:-}"

# 使用 python3 对每个值进行 JSON 序列化，防止特殊字符注入
# 如果输入为空，返回 null 而不是空字符串
json_encode() {
  if [ -z "$1" ]; then
    echo "null"
  else
    printf '%s' "$1" | python3 -c "import json,sys; print(json.dumps(sys.stdin.read()), end='')"
  fi
}

BRAND_ID_JSON=$(json_encode "$BRAND_ID")
WORDPRESS_API_URL_JSON=$(json_encode "$WORDPRESS_API_URL")
API_URL_JSON=$(json_encode "$API_URL")
BACKUP_API_URL_JSON=$(json_encode "$BACKUP_API_URL")
WORKBENCH_URL_JSON=$(json_encode "$WORKBENCH_URL")

sed -i "s|<head>|<head><script>window.__BRAND_ID__=${BRAND_ID_JSON};window.__WORDPRESS_API_URL__=${WORDPRESS_API_URL_JSON};window.__API_URL__=${API_URL_JSON};window.__BACKUP_API_URL__=${BACKUP_API_URL_JSON};window.__WORKBENCH_URL__=${WORKBENCH_URL_JSON};</script>|" /usr/share/nginx/html/index.html

exec "$@"
