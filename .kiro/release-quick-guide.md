# Release 分支快速使用指南

## 🚀 快速发布流程

### 1. 日常开发（develop 分支）
```bash
# 在 develop 分支上开发
git checkout develop
git pull origin develop

# 开发和测试
git add .
git commit -m "feat: 新功能"
git push origin develop
# CI/CD 自动构建 develop 标签
```

### 2. 合并到 main（稳定版本）
```bash
# 合并 develop 到 main
git checkout main
git pull origin main
git merge develop
git push origin main
# CI/CD 自动构建 main 标签
```

### 3. 发布到 release（生产环境）
```bash
# 合并 main 到 release
git checkout release
git pull origin release
git merge main
git push origin release
# CI/CD 自动构建 release 和 latest 标签
```

### 2. 部署到各环境
```bash
# 开发环境（develop）
docker-compose -f docker-compose.dev.yml pull
docker-compose -f docker-compose.dev.yml down
docker-compose -f docker-compose.dev.yml up -d

# 测试环境（main）
docker-compose -f docker-compose.prod.yml pull
docker-compose -f docker-compose.prod.yml down
docker-compose -f docker-compose.prod.yml up -d

# 生产环境（release）
docker-compose -f docker-compose.release.yml pull
docker-compose -f docker-compose.release.yml down
docker-compose -f docker-compose.release.yml up -d

# 查看日志确认
docker-compose -f docker-compose.release.yml logs -f frontend
```

## 📋 分支说明

| 分支 | 用途 | Docker 标签 | 部署配置 |
|------|------|-------------|----------|
| `develop` | 日常开发 | `develop` + `<短哈希>` | `docker-compose.dev.yml` |
| `main` | 稳定版本 | `main` + `<短哈希>` | `docker-compose.prod.yml` |
| `release` | 生产环境 | `latest` + `release` + `<短哈希>` | `docker-compose.release.yml` |

## 🔄 CI/CD 自动化

- **Push 到 develop**: 自动构建 `develop` 和 `<短哈希>` 标签
- **Push 到 main**: 自动构建 `main` 和 `<短哈希>` 标签
- **Push 到 release**: 自动构建 `latest`、`release` 和 `<短哈希>` 标签
- **Pull Request**: 仅运行测试

## 🛠️ 常用命令

### 查看构建状态
```bash
# GitHub Actions
https://github.com/gdgeek/home/actions
```

### 查看容器日志
```bash
# 所有日志
docker-compose -f docker-compose.release.yml logs -f

# 仅前端
docker-compose -f docker-compose.release.yml logs -f frontend

# 最近 100 行
docker-compose -f docker-compose.release.yml logs --tail=100 frontend
```

### 检查容器状态
```bash
docker-compose -f docker-compose.release.yml ps
docker stats
```

## 🔙 快速回滚

### 方法 1: 使用旧镜像标签
```bash
# 编辑 docker-compose.release.yml
# 修改 image 为旧版本标签，例如：
# image: hkccr.ccs.tencentyun.com/gdgeek/home:354e41b

docker-compose -f docker-compose.release.yml up -d
```

### 方法 2: Git 回滚
```bash
git checkout release
git reset --hard <previous-commit>
git push origin release --force  # 需要管理员权限
```

## 🚨 紧急热修复

```bash
# 1. 创建热修复分支
git checkout release
git checkout -b hotfix/bug-name

# 2. 修复并提交
git add .
git commit -m "fix: 修复紧急 bug"
git push origin hotfix/bug-name

# 3. 在 GitHub 创建 PR: hotfix/bug-name -> release

# 4. 合并后自动构建

# 5. 同步到 main 和 develop
git checkout main
git merge hotfix/bug-name
git push origin main

git checkout develop
git merge hotfix/bug-name
git push origin develop
```

## 📊 镜像标签说明

**develop 分支**构建生成 2 个标签：
- `<短哈希>`: 例如 `5f938a4`（7位）
- `develop`: 开发分支标签

**main 分支**构建生成 2 个标签：
- `<短哈希>`: 例如 `5f938a4`（7位）
- `main`: 主分支标签

**release 分支**构建生成 3 个标签：
- `<短哈希>`: 例如 `5f938a4`（7位）
- `release`: 发布标签
- `latest`: 最新稳定版标签

完整镜像地址：
```
hkccr.ccs.tencentyun.com/gdgeek/home:develop
hkccr.ccs.tencentyun.com/gdgeek/home:main
hkccr.ccs.tencentyun.com/gdgeek/home:latest
hkccr.ccs.tencentyun.com/gdgeek/home:release
hkccr.ccs.tencentyun.com/gdgeek/home:5f938a4
```

## ✅ 部署检查清单

部署后验证：
- [ ] 容器正常启动（`docker-compose ps`）
- [ ] 无 JavaScript 错误（浏览器 Console）
- [ ] 品牌显示正确（默认夏鼎）
- [ ] 环境变量正确注入（`window.__BRAND_ID__` 等）
- [ ] 登录功能正常
- [ ] 构建时间显示正确

## 📚 详细文档

- 完整分支策略: `.kiro/branch-strategy.md`
- 部署修复指南: `.kiro/deployment-fix-guide.md`
- 品牌锁定文档: `.kiro/brand-anchors/`

## 🔗 相关链接

- GitHub 仓库: https://github.com/gdgeek/home
- GitHub Actions: https://github.com/gdgeek/home/actions
- 腾讯云镜像仓库: https://console.cloud.tencent.com/tcr
