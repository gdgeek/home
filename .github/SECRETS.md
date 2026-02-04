# GitHub Secrets 配置说明

在 GitHub 仓库的 Settings > Secrets and variables > Actions 中添加以下 secrets:

## 腾讯云容器镜像服务 (TCR)

| Secret 名称 | 说明 | 示例值 |
|------------|------|--------|
| `TCR_NAMESPACE` | 腾讯云 TCR 命名空间 | `your-namespace` |
| `TCR_USERNAME` | 腾讯云 TCR 用户名 | `100000000000` (腾讯云账号ID) |
| `TCR_PASSWORD` | 腾讯云 TCR 密码/Token | `your-password` |

## 应用环境变量

| Secret 名称 | 说明 | 示例值 |
|------------|------|--------|
| `VITE_WORDPRESS_API_URL` | WordPress API 地址 | `https://your-site.com/wp-json/wp/v2` |
| `VITE_BACKEND_API_URL` | 后端 API 地址 | `https://api.your-site.com/api` |

## 获取腾讯云 TCR 凭证

1. 登录 [腾讯云控制台](https://console.cloud.tencent.com/)
2. 进入 容器镜像服务 > 实例管理
3. 创建或选择实例，获取访问凭证
4. 用户名通常是腾讯云账号 ID
5. 密码可以在 访问凭证 中生成

## CI/CD 流程

```
push to main
    │
    ▼
┌─────────┐
│  Test   │ ← 类型检查、Lint、单元测试
└────┬────┘
     │
     ▼
┌─────────┐
│  Build  │ ← npm run build
└────┬────┘
     │
     ▼
┌─────────┐
│ Deploy  │ ← 构建 Docker 镜像，推送到腾讯云 TCR
└─────────┘
```
