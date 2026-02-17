# 多阶段构建 Dockerfile
# 支持通过运行时环境变量 BRAND 区分品牌

# 阶段1: 构建
FROM node:18-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

RUN npm run build

# 阶段2: 运行
FROM nginx:alpine

COPY --from=builder /app/dist/ /usr/share/nginx/html/

# 复制启动脚本
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
