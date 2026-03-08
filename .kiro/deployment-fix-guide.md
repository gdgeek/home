# 生产环境部署修复指南

## 问题总结

根据用户反馈，生产环境存在以下问题：

1. **JavaScript 语法错误**: `Uncaught SyntaxError: Unexpected token ';'`
   - 原因：环境变量为空时，`json_encode` 返回空字符串导致 `window.__VAR__=;`
   - 已修复：空值返回 `null` 而不是空字符串

2. **Docker Compose 参数未传入**: 所有环境变量似乎都没有正确注入
   - 原因：Alpine Linux nginx 镜像没有 Python，导致 Python 脚本失败
   - 已修复：移除 Python 依赖，使用纯 shell 脚本

3. **默认品牌错误**: 默认显示星扣而不是夏鼎
   - 已修复：`brandProvider.ts` 中 `DEFAULT_BRAND_ID` 改为 `'xiading'`

4. **登录后未跳转**: 登录成功但没有跳转到工作台
   - 已添加：详细的控制台调试日志
   - 需要：用户测试并提供控制台输出

## 已完成的修复

### 1. 修复 docker-entrypoint.sh
- ✅ 移除 Python 依赖，使用纯 shell 脚本（`sed` 和 `awk`）
- ✅ 空值返回 `null` 而不是空字符串，避免语法错误
- ✅ 添加调试日志输出，便于排查问题
- ✅ 从构建文件中提取并注入 `BUILD_TIME`

### 2. 修复默认品牌
- ✅ `src/config/brandProvider.ts`: `DEFAULT_BRAND_ID = 'xiading'`

### 3. 添加 TypeScript 类型声明
- ✅ `src/vite-env.d.ts`: 添加 `Window` 接口声明
- ✅ 移除所有 `as any` 类型断言，使用正确的类型

### 4. 优化构建时间显示
- ✅ 优先使用 `window.__BUILD_TIME__`（Docker 注入）
- ✅ 回退到 `__BUILD_TIME__`（Vite 构建时注入）
- ✅ 最后回退到当前时间

## 需要用户执行的操作

### 步骤 1: 重新部署容器

生产环境需要重新构建并部署容器以应用最新的 `docker-entrypoint.sh` 修复：

```bash
# 1. 拉取最新代码
git pull origin main

# 2. 重新构建镜像（如果使用本地构建）
docker build -t your-image-name:latest .

# 或者等待 CI/CD 自动构建并推送到镜像仓库

# 3. 停止并删除旧容器
docker-compose -f docker-compose.prod.yml down

# 4. 拉取最新镜像（如果使用远程镜像）
docker-compose -f docker-compose.prod.yml pull

# 5. 启动新容器
docker-compose -f docker-compose.prod.yml up -d
```

### 步骤 2: 检查容器日志

启动容器后，检查日志确认环境变量是否正确注入：

```bash
# 查看容器日志
docker logs <container_id>

# 应该看到类似输出：
# Injecting runtime config:
#   BRAND_ID="xiading"
#   WORDPRESS_API_URL=null
#   API_URL=null
#   BACKUP_API_URL=null
#   WORKBENCH_URL="https://d.xiading.hxgxonline.com/"
#   BUILD_TIME="2025-03-08T06:30:00.000Z"
# Runtime config injected successfully
```

### 步骤 3: 验证网页

1. 打开浏览器访问 https://xiading.hxgxonline.com/
2. 打开浏览器开发者工具（F12）
3. 切换到 Console 标签
4. 检查是否有 JavaScript 错误
5. 在 Console 中输入以下命令检查环境变量：

```javascript
console.log('BRAND_ID:', window.__BRAND_ID__)
console.log('WORKBENCH_URL:', window.__WORKBENCH_URL__)
console.log('BUILD_TIME:', window.__BUILD_TIME__)
```

### 步骤 4: 测试登录跳转

1. 点击"登录"按钮
2. 输入用户名和密码
3. 点击"登录"
4. 查看 Console 输出，应该看到：
   ```
   Workbench URL from window: https://d.xiading.hxgxonline.com/
   Workbench URL from env: https://d.xiading.hxgxonline.com/
   Final workbenchUrl: https://d.xiading.hxgxonline.com/
   Redirecting to Workbench SSO: https://d.xiading.hxgxonline.com/sso?refreshToken=...
   ```
5. 如果看到 "Workbench URL not configured"，说明环境变量未正确注入

## 可能的问题和解决方案

### 问题 1: 环境变量仍未注入

**症状**: 
- Console 中 `window.__BRAND_ID__` 等为 `undefined`
- 页面显示错误的品牌或布局

**解决方案**:
1. 检查 `docker-compose.prod.yml` 中的环境变量配置
2. 确认容器启动时 `docker-entrypoint.sh` 被正确执行
3. 检查 `/usr/share/nginx/html/index.html` 是否包含注入的脚本：
   ```bash
   docker exec <container_id> cat /usr/share/nginx/html/index.html | grep "window.__BRAND_ID__"
   ```

### 问题 2: 登录后仍未跳转

**症状**:
- 登录成功但停留在当前页面
- Console 显示 "Workbench URL not configured"

**可能原因**:
1. `WORKBENCH_URL` 环境变量未在 `docker-compose.prod.yml` 中设置
2. 环境变量注入失败

**解决方案**:
1. 确认 `docker-compose.prod.yml` 中有：
   ```yaml
   environment:
     - WORKBENCH_URL=https://d.xiading.hxgxonline.com/
   ```
2. 重新部署容器
3. 检查容器日志确认 `WORKBENCH_URL` 被正确注入

### 问题 3: 构建时间显示错误

**症状**:
- 页面底部显示当前时间而不是构建时间

**原因**:
- `window.__BUILD_TIME__` 未正确注入
- 从构建文件中提取 `BUILD_TIME` 失败

**解决方案**:
1. 检查容器日志中的 `BUILD_TIME` 值
2. 如果为 `null`，说明提取失败，但不影响功能（会显示当前时间）

## 验证清单

部署完成后，请验证以下内容：

- [ ] 页面无 JavaScript 语法错误
- [ ] 默认显示夏鼎品牌（繁体中文，日系淡蓝风格）
- [ ] `window.__BRAND_ID__` 为 `"xiading"`
- [ ] `window.__WORKBENCH_URL__` 为 `"https://d.xiading.hxgxonline.com/"`
- [ ] 登录成功后自动跳转到工作台
- [ ] 页面底部显示构建时间（格式：2025-03-08 14:30）
- [ ] URL 参数 `?brand=xingkou` 可以切换到星扣品牌
- [ ] URL 参数 `?brand=xrugc` 可以切换到 XRUGC 品牌

## 联系支持

如果问题仍然存在，请提供以下信息：

1. 容器日志（`docker logs <container_id>`）
2. 浏览器 Console 输出（包括所有错误和调试信息）
3. `window.__BRAND_ID__` 等环境变量的值
4. 登录时的 Console 输出

## 相关文件

- `docker-entrypoint.sh`: Docker 容器启动脚本
- `src/config/brandProvider.ts`: 品牌切换逻辑
- `src/components/common/LoginModal.vue`: 登录组件
- `src/vite-env.d.ts`: TypeScript 类型声明
- `.kiro/brand-anchors/`: 品牌锁定文档
