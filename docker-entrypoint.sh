#!/bin/sh
set -e

BRAND=${BRAND:-xingkou}
HTML_DIR=/usr/share/nginx/html

if [ "$BRAND" = "xiading" ]; then
    echo "Setting up XIADING brand..."
    # 替换 xiading 相关内容
    sed -i 's/星扣AR创作平台·教育版/夏鼎/g' "$HTML_DIR/index.html"
    sed -i 's/星扣AR创作平台 — 让知识"立"起来，让创意"活"起来/夏鼎 — 数字科技，赋能未来/g' "$HTML_DIR/index.html"
    sed -i 's/专为教育场景打造的AR内容创作平台，让教师轻松制作沉浸式教学内容/专注于前沿数字技术应用，为企业提供智能化解决方案/g' "$HTML_DIR/index.html"
    sed -i 's/星扣/夏鼎/g' "$HTML_DIR/index.html"
    sed -i 's/xingkou/xiading/g' "$HTML_DIR/index.html"
else
    echo "Setting up XINGKOU brand..."
fi

echo "Starting nginx..."
exec "$@"
