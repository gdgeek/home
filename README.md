# 星扣AR创作平台·教育版

基于 Vue 3 + TypeScript + Element Plus 构建的 AR 教育平台官网首页。

## 技术栈

- **框架**: Vue 3 (Composition API)
- **语言**: TypeScript
- **UI 组件**: Element Plus
- **构建工具**: Vite
- **样式**: SCSS
- **HTTP 客户端**: Axios

## 项目结构

```
src/
├── assets/           # 静态资源
│   ├── images/       # 图片资源
│   └── styles/       # 全局样式和变量
├── components/       # 组件
│   ├── common/       # 通用组件 (卡片、弹窗等)
│   └── sections/     # 页面区块组件
├── composables/      # 组合式函数
├── services/         # API 服务
├── types/            # TypeScript 类型定义
└── views/            # 页面视图
```

## 快速开始

### 环境要求

- Node.js >= 18
- npm >= 9

### 安装依赖

```bash
npm install
```

### 配置环境变量

```bash
cp .env.example .env
```

编辑 `.env` 文件，配置以下变量：

| 变量 | 说明 |
|------|------|
| `VITE_WORDPRESS_API_URL` | WordPress REST API 地址，用于获取新闻内容 |
| `VITE_BACKEND_API_URL` | 后端 API 地址，用于获取平台基础配置 |

Docker 运行时后端代理使用 `APP_API_N_URL`：

| 变量 | 说明 |
|------|------|
| `APP_API_1_URL` / `APP_API_N_URL` | 主后端 API 上游地址；容器内前端统一请求同源 `/api/`，由 Nginx 负责分流与 failover |
| `APP_API_1_WEIGHT` / `APP_API_N_WEIGHT` | 可选权重；未配置时平均分配 |
| `APP_AUTH_1_URL` / `APP_AUTH_N_URL` | 统一认证服务上游地址；容器内前端统一请求同源 `/api-auth/`，由 Nginx 负责分流与 failover |
| `APP_AUTH_1_WEIGHT` / `APP_AUTH_N_WEIGHT` | 可选权重；未配置时平均分配 |
| `AUTH_PROVIDER` | 登录服务选择；默认 `legacy` 继续走 `/api/`，设为 `identity` 后登录走 `/api-auth/` |
| `APP_RESOLVER` | 可选 DNS resolver；默认 `8.8.8.8 223.5.5.5` |
| `API_URL` | 兼容旧部署，等同于 `APP_API_1_URL` |
| `BACKUP_API_URL` | 兼容旧部署，等同于 `APP_API_2_URL` |
| `AUTH_API_URL` | 兼容旧部署，等同于 `APP_AUTH_1_URL` |

### 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:5173

### 构建生产版本

```bash
npm run build
```

构建产物输出到 `dist/` 目录。

### 预览生产构建

```bash
npm run preview
```

## Docker 部署

项目包含 Docker Compose 配置，可一键启动 WordPress + MySQL 作为内容管理后端。

```bash
# 启动服务
docker-compose up -d

# 停止服务
docker-compose down
```

WordPress 管理后台: http://localhost:8080/wp-admin

## 开发说明

### 路径别名

项目配置了 `@` 别名指向 `src/` 目录：

```typescript
import { useNews } from '@/composables/useNews'
```

### 组件自动导入

Element Plus 组件和 Vue API 已配置自动导入，无需手动 import：

```vue
<template>
  <el-button type="primary">按钮</el-button>
</template>
```

### SCSS 变量

全局 SCSS 变量在所有组件中自动可用：

```scss
.my-class {
  color: $primary-color;
}
```

## 开发环境说明

- **Node 版本**: 推荐使用 Node.js 18 LTS（例如 18.18+），避免使用过旧版本。
- **包管理器**: 默认使用 `npm`（项目基于 `package-lock.json` 锁定依赖，不建议混用 `pnpm` / `yarn` 安装）。
- **常用命令**:
  - 安装依赖：`npm install`
  - 本地开发：`npm run dev`
  - 生产构建：`npm run build`
  - 本地预览构建产物：`npm run preview`

## License

Private
