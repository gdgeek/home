# 多阶段构建 Dockerfile
# 支持通过 VITE_TARGET_DOMAIN 构建参数区分品牌

# 阶段1: 构建
FROM node:18-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# 构建参数 - 通过 --build-arg 传入目标域名
ARG VITE_TARGET_DOMAIN

ENV VITE_TARGET_DOMAIN=${VITE_TARGET_DOMAIN}

RUN npm run build

# 阶段2: 运行
FROM nginx:alpine

COPY --from=builder /app/dist/ /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
