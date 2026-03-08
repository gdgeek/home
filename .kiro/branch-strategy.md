# 分支策略和部署流程

## 📋 分支说明

### main 分支
- **用途**: 开发分支，用于日常开发和测试
- **Docker 标签**: `main` + `<短哈希>`
- **自动部署**: 是
- **部署配置**: `docker-compose.prod.yml`
- **保护**: 建议设置为受保护分支

### release 分支
- **用途**: 发布分支，用于生产环境部署
- **Docker 标签**: `latest` + `release` + `<短哈希>`
- **自动部署**: 是
- **部署配置**: `docker-compose.release.yml`
- **保护**: 强烈建议设置为受保护分支

## CI/CD 流程

### 触发条件
- **Push 到 main**: 构建并推送 `main` 和 `<短哈希>` 标签
- **Push 到 release**: 构建并推送 `latest`、`release` 和 `<短哈希>` 标签
- **Pull Request**: 仅运行测试，不部署

### 构建产物
每次构建会生成以下 Docker 镜像标签：

**main 分支**:
- `<短哈希>`: Git 提交的短 SHA 值（7位）
- `main`: 分支标签

**release 分支**:
- `<短哈希>`: Git 提交的短 SHA 值（7位）
- `release`: 发布标签
- `latest`: 最新稳定版标签

### 镜像仓库
- **仓库**: `hkccr.ccs.tencentyun.com/gdgeek/home`
- **标签示例**:
  - `hkccr.ccs.tencentyun.com/gdgeek/home:main` (main 分支)
  - `hkccr.ccs.tencentyun.com/gdgeek/home:latest` (release 分支)
  - `hkccr.ccs.tencentyun.com/gdgeek/home:release` (release 分支)
  - `hkccr.ccs.tencentyun.com/gdgeek/home:2bae4e2` (短哈希)

## 发布流程

### 1. 开发阶段 (main 分支)
```bash
# 在 main 分支上开发
git checkout main
git pull origin main

# 进行开发和测试
# ... 修改代码 ...

# 提交更改
git add .
git commit -m "feat: 新功能"
git push origin main

# CI/CD 自动构建并推送 latest 标签
```

### 2. 发布到 release 分支
```bash
# 确保 main 分支是最新的
git checkout main
git pull origin main

# 切换到 release 分支
git checkout release
git pull origin release

# 合并 main 分支的更改
git merge main

# 推送到远程
git push origin release

# CI/CD 自动构建并推送 release 标签
```

### 3. 部署到生产环境

#### 使用 release 标签部署
```bash
# 在生产服务器上
cd /path/to/project

# 拉取最新的 release 镜像
docker-compose -f docker-compose.release.yml pull

# 重启服务
docker-compose -f docker-compose.release.yml down
docker-compose -f docker-compose.release.yml up -d

# 查看日志
docker-compose -f docker-compose.release.yml logs -f frontend
```

#### 使用特定版本部署（推荐）
```bash
# 修改 docker-compose.release.yml 中的镜像标签
# 例如使用短哈希标签：
# image: hkccr.ccs.tencentyun.com/gdgeek/home:2bae4e2

# 然后部署
docker-compose -f docker-compose.release.yml up -d
```

## 回滚流程

### 方法 1: 使用之前的镜像标签
```bash
# 查看可用的镜像标签
# 在腾讯云容器镜像服务控制台查看

# 修改 docker-compose.release.yml 使用旧版本
# image: hkccr.ccs.tencentyun.com/gdgeek/home:354e41b

# 重新部署
docker-compose -f docker-compose.release.yml up -d
```

### 方法 2: 回滚 Git 提交
```bash
# 在 release 分支上
git checkout release

# 回滚到之前的提交
git reset --hard <commit-sha>

# 强制推送（需要管理员权限）
git push origin release --force

# CI/CD 会自动构建旧版本
```

## 热修复流程

如果生产环境发现紧急 bug：

```bash
# 1. 在 release 分支上创建热修复分支
git checkout release
git checkout -b hotfix/critical-bug

# 2. 修复 bug
# ... 修改代码 ...

# 3. 提交并推送
git add .
git commit -m "fix: 修复紧急 bug"
git push origin hotfix/critical-bug

# 4. 创建 PR 到 release 分支
# 在 GitHub 上创建 Pull Request: hotfix/critical-bug -> release

# 5. 审核并合并 PR
# 合并后 CI/CD 自动构建 release 标签

# 6. 将热修复合并回 main
git checkout main
git merge hotfix/critical-bug
git push origin main

# 7. 删除热修复分支
git branch -d hotfix/critical-bug
git push origin --delete hotfix/critical-bug
```

## 分支保护规则建议

### main 分支
- ✅ 要求 Pull Request 审核
- ✅ 要求状态检查通过（CI 测试）
- ✅ 要求分支是最新的
- ❌ 不允许强制推送

### release 分支
- ✅ 要求 Pull Request 审核（至少 2 人）
- ✅ 要求状态检查通过（CI 测试）
- ✅ 要求分支是最新的
- ❌ 不允许强制推送
- ✅ 限制谁可以推送（仅管理员）

## 环境变量配置

### main 环境 (docker-compose.prod.yml)
```yaml
environment:
  - BRAND_ID=xiading
  - WORKBENCH_URL=https://d.xiading.hxgxonline.com/
```

### release 环境 (docker-compose.release.yml)
```yaml
environment:
  - BRAND_ID=xiading
  - WORKBENCH_URL=https://d.xiading.hxgxonline.com/
```

根据实际需求调整环境变量。

## 监控和日志

### 查看构建状态
- GitHub Actions: https://github.com/gdgeek/home/actions
- 查看最近的 workflow 运行状态

### 查看容器日志
```bash
# 查看所有服务日志
docker-compose -f docker-compose.release.yml logs -f

# 仅查看前端日志
docker-compose -f docker-compose.release.yml logs -f frontend

# 查看最近 100 行日志
docker-compose -f docker-compose.release.yml logs --tail=100 frontend
```

### 检查容器状态
```bash
# 查看运行中的容器
docker-compose -f docker-compose.release.yml ps

# 查看容器资源使用
docker stats
```

## 故障排查

### 问题 1: CI/CD 构建失败
1. 检查 GitHub Actions 日志
2. 确认所有测试通过
3. 检查 Docker 构建日志

### 问题 2: 镜像拉取失败
1. 检查镜像仓库凭证
2. 确认镜像标签存在
3. 检查网络连接

### 问题 3: 容器启动失败
1. 查看容器日志：`docker-compose logs frontend`
2. 检查环境变量配置
3. 验证 docker-entrypoint.sh 执行

## 最佳实践

1. **频繁提交到 main**: 保持小而频繁的提交
2. **定期发布到 release**: 每周或每两周发布一次
3. **使用 Pull Request**: 所有更改通过 PR 审核
4. **编写测试**: 确保 CI 测试覆盖关键功能
5. **记录变更**: 在 PR 中详细描述更改内容
6. **监控生产环境**: 部署后密切关注日志和错误
7. **保留旧版本**: 不要删除旧的镜像标签，便于回滚

## 相关文件

- `.github/workflows/ci-cd.yml`: CI/CD 配置
- `docker-compose.prod.yml`: main 分支部署配置
- `docker-compose.release.yml`: release 分支部署配置
- `Dockerfile`: Docker 镜像构建配置
- `docker-entrypoint.sh`: 容器启动脚本
