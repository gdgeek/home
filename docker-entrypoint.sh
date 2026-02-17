#!/bin/sh
# 将环境变量注入到 index.html 中
# BRAND_ID: 品牌标识（默认 xingkou）
# WORDPRESS_API_URL: WordPress API 地址（运行时注入）

BRAND_ID="${BRAND_ID:-xingkou}"
WORDPRESS_API_URL="${WORDPRESS_API_URL:-}"

# 在 <head> 标签后注入运行时配置
sed -i "s|<head>|<head><script>window.__BRAND_ID__='${BRAND_ID}';window.__WORDPRESS_API_URL__='${WORDPRESS_API_URL}';</script>|" /usr/share/nginx/html/index.html

exec "$@"
