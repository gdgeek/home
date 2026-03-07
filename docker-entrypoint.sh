#!/bin/sh
# 容器启动时注入运行时配置
# BRAND_ID: 品牌标识（默认 xingkou）
# WORDPRESS_API_URL: WordPress API 地址（直接注入前端）
# API_URL: 主登录API地址
# BACKUP_API_URL: 备用登录API地址
# WORKBENCH_URL: 工作台工具地址

# Valid brands: xingkou, xiading, mrugc
BRAND_ID="${BRAND_ID:-xingkou}"
WORDPRESS_API_URL="${WORDPRESS_API_URL:-}"
API_URL="${API_URL:-}"
BACKUP_API_URL="${BACKUP_API_URL:-}"
WORKBENCH_URL="${WORKBENCH_URL:-}"

# 在 <head> 标签后注入运行时配置（前端JS可读取）
sed -i "s|<head>|<head><script>window.__BRAND_ID__='${BRAND_ID}';window.__WORDPRESS_API_URL__='${WORDPRESS_API_URL}';window.__API_URL__='${API_URL}';window.__BACKUP_API_URL__='${BACKUP_API_URL}';window.__WORKBENCH_URL__='${WORKBENCH_URL}';</script>|" /usr/share/nginx/html/index.html

exec "$@"
