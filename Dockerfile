# 多阶段构建 Dockerfile
# 通过环境变量 BRAND_ID 指定品牌

# 阶段1: 构建
FROM node:18-alpine AS builder

# 启用 corepack 以使用 pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .

ARG VITE_BACKEND_API_URL

ENV VITE_BACKEND_API_URL=${VITE_BACKEND_API_URL}

RUN pnpm run build

# 阶段2: 运行
FROM nginx:alpine

COPY --from=builder /app/dist/ /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://127.0.0.1/ || exit 1

ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
