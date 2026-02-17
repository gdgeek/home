#!/bin/sh
# 将环境变量 BRAND_ID 注入到 index.html 中
# 如果未设置 BRAND_ID，默认为 xingkou

BRAND_ID="${BRAND_ID:-xingkou}"

# 在 <head> 标签后注入品牌配置脚本
sed -i "s|<head>|<head><script>window.__BRAND_ID__='${BRAND_ID}';</script>|" /usr/share/nginx/html/index.html

exec "$@"
