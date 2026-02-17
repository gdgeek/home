#!/bin/sh
# 容器启动时注入运行时配置
# BRAND_ID: 品牌标识（默认 xingkou）
# WORDPRESS_API_URL: WordPress API 地址（Nginx反向代理 + 前端window注入）

BRAND_ID="${BRAND_ID:-xingkou}"
WORDPRESS_API_URL="${WORDPRESS_API_URL:-}"

# 在 <head> 标签后注入运行时配置（前端JS可读取）
sed -i "s|<head>|<head><script>window.__BRAND_ID__='${BRAND_ID}';window.__WORDPRESS_API_URL__='/wp-api';</script>|" /usr/share/nginx/html/index.html

# 替换 nginx.conf 中的 WordPress API URL 占位符（反向代理）
if [ -n "${WORDPRESS_API_URL}" ]; then
  sed -i "s|__WORDPRESS_API_URL__|${WORDPRESS_API_URL}|g" /etc/nginx/conf.d/default.conf
fi

exec "$@"
