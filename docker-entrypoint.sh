#!/bin/sh
# 容器启动时注入运行时配置（JSON 安全编码，防止注入）
BRAND_ID="${BRAND_ID:-xiading}"
WORDPRESS_API_URL="${WORDPRESS_API_URL:-}"
API_URL="${API_URL:-}"
BACKUP_API_URL="${BACKUP_API_URL:-}"
WORKBENCH_URL="${WORKBENCH_URL:-}"

# 从构建的 JS 文件中提取 __BUILD_TIME__（如果存在）
BUILD_TIME=""
if [ -d "/usr/share/nginx/html/assets" ]; then
  # 查找包含 __BUILD_TIME__ 的 JS 文件并提取时间戳
  BUILD_TIME=$(grep -oP '"__BUILD_TIME__":"[^"]*"' /usr/share/nginx/html/assets/*.js 2>/dev/null | head -1 | sed 's/"__BUILD_TIME__":"\([^"]*\)"/\1/')
fi

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

BRAND_ID_JSON=$(json_encode "$BRAND_ID")
WORDPRESS_API_URL_JSON=$(json_encode "$WORDPRESS_API_URL")
API_URL_JSON=$(json_encode "$API_URL")
BACKUP_API_URL_JSON=$(json_encode "$BACKUP_API_URL")
WORKBENCH_URL_JSON=$(json_encode "$WORKBENCH_URL")
BUILD_TIME_JSON=$(json_encode "$BUILD_TIME")

echo "Injecting runtime config:"
echo "  BRAND_ID=${BRAND_ID_JSON}"
echo "  WORDPRESS_API_URL=${WORDPRESS_API_URL_JSON}"
echo "  API_URL=${API_URL_JSON}"
echo "  BACKUP_API_URL=${BACKUP_API_URL_JSON}"
echo "  WORKBENCH_URL=${WORKBENCH_URL_JSON}"
echo "  BUILD_TIME=${BUILD_TIME_JSON}"

sed -i "s|<head>|<head><script>window.__BRAND_ID__=${BRAND_ID_JSON};window.__WORDPRESS_API_URL__=${WORDPRESS_API_URL_JSON};window.__API_URL__=${API_URL_JSON};window.__BACKUP_API_URL__=${BACKUP_API_URL_JSON};window.__WORKBENCH_URL__=${WORKBENCH_URL_JSON};window.__BUILD_TIME__=${BUILD_TIME_JSON};</script>|" /usr/share/nginx/html/index.html

echo "Runtime config injected successfully"

exec "$@"
