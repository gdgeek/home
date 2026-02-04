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

## License

Private
