#!/bin/sh
# 容器启动时注入运行时配置（JSON 安全编码，防止注入）
BRAND_ID="${BRAND_ID:-xingkou}"
WORDPRESS_API_URL="${WORDPRESS_API_URL:-}"
API_URL="${API_URL:-}"
BACKUP_API_URL="${BACKUP_API_URL:-}"
WORKBENCH_URL="${WORKBENCH_URL:-}"

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

echo "Injecting runtime config:"
echo "  BRAND_ID=${BRAND_ID_JSON}"
echo "  WORDPRESS_API_URL=${WORDPRESS_API_URL_JSON}"
echo "  API_URL=${API_URL_JSON}"
echo "  BACKUP_API_URL=${BACKUP_API_URL_JSON}"
echo "  WORKBENCH_URL=${WORKBENCH_URL_JSON}"

sed -i "s|<head>|<head><script>window.__BRAND_ID__=${BRAND_ID_JSON};window.__WORDPRESS_API_URL__=${WORDPRESS_API_URL_JSON};window.__API_URL__=${API_URL_JSON};window.__BACKUP_API_URL__=${BACKUP_API_URL_JSON};window.__WORKBENCH_URL__=${WORKBENCH_URL_JSON};</script>|" /usr/share/nginx/html/index.html

echo "Runtime config injected successfully"

exec "$@"
