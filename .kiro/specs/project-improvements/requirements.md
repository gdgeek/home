# 需求文档：项目改进（Project Improvements）

## 简介

本文档基于设计文档，为教育AR创作平台（星扣、夏鼎、XRUGC 三品牌）的系统性改进工作定义正式需求。改进涵盖五大领域：代码架构优化、多品牌系统改进、性能优化、用户体验提升、开发体验改进。

---

## 词汇表

- **System**：教育AR创作平台前端应用整体
- **BrandRegistry**：品牌配置注册表模块（`brandRegistry.ts`）
- **BrandProvider**：品牌 ID 解析与配置提供模块（`brandProvider.ts`）
- **WordpressApi**：WordPress REST API 封装服务（`wordpressApi.ts`）
- **AuthApi**：认证 API 服务（`authApi.ts`）
- **ApiCache**：API 请求缓存与去重模块
- **UsePageCommon**：提取后的共享页面逻辑 Composable
- **UseScrollAnimation**：基于 IntersectionObserver 的滚动动画 Composable
- **UseLocaleRoute**：语言路由管理 Composable（`useLocaleRoute.ts`）
- **LoginModal**：登录弹窗组件（`LoginModal.vue`）
- **NewsModal**：新闻详情弹窗组件
- **XingkouHomePage**：星扣品牌首页组件
- **XiadingHomePage**：夏鼎品牌首页组件
- **XrugcHomePage**：XRUGC 品牌首页组件
- **RuntimeConfig**：运行时配置类型定义（`src/types/runtime.ts`）
- **DockerEntrypoint**：Docker 容器启动脚本（`docker-entrypoint.sh`）
- **BrandConfig**：品牌配置数据结构接口
- **NewsItem**：新闻条目数据结构
- **DOMPurify**：HTML 内容净化库

---

## 需求

### 需求 1：提取共享页面逻辑 Composable

**用户故事：** 作为开发者，我希望将三个品牌首页的重复逻辑提取到 UsePageCommon 中，以便减少代码重复、降低维护成本。

#### 验收标准

1. THE UsePageCommon SHALL 封装滚动检测（`handleScroll`）、新闻弹窗状态（`showNewsModal`、`selectedNews`）、登录弹窗状态（`showLoginModal`）、日期格式化（`formatDate`）、博客地址计算（`blogUrl`）、版本号读取（`version`、`buildTime`）逻辑。
2. WHEN XingkouHomePage、XiadingHomePage 或 XrugcHomePage 挂载时，THE UsePageCommon SHALL 自动注册 scroll 事件监听并触发初始视口检测。
3. WHEN 组件卸载时，THE UsePageCommon SHALL 自动移除 scroll 事件监听，防止内存泄漏。
4. THE UsePageCommon SHALL 返回类型完整的 `UsePageCommonReturn` 接口，不包含 `any` 类型。
5. WHEN 调用 `formatDate` 时传入有效的 ISO 日期字符串，THE UsePageCommon SHALL 返回符合指定 locale 格式的日期字符串。
6. IF 调用 `formatDate` 时传入无效日期字符串，THEN THE UsePageCommon SHALL 返回原始字符串而非抛出异常。

---

### 需求 2：修复运行时配置类型安全

**用户故事：** 作为开发者，我希望消除代码中的 `any` 类型强转，以便获得完整的 TypeScript 类型检查保护。

#### 验收标准

1. THE RuntimeConfig SHALL 定义包含 `__BRAND_ID__`、`__WORDPRESS_API_URL__`、`__API_URL__`、`__BACKUP_API_URL__`、`__WORKBENCH_URL__`、`__APP_VERSION__`、`__BUILD_TIME__` 字段的全局 Window 接口扩展。
2. THE System SHALL 通过 `getRuntimeConfig()` 函数访问所有运行时配置，不得在业务代码中直接使用 `(window as any)` 强转。
3. WHEN 读取 `window.__APP_VERSION__` 时，THE System SHALL 通过 RuntimeConfig 类型安全地访问，并在值为 `undefined` 时返回默认值 `'1.0.0'`。

---

### 需求 3：修复 useLocaleRoute defaultLocale 类型不匹配

**用户故事：** 作为开发者，我希望修复 `useLocaleRoute` 的 `defaultLocale` 参数类型错误，以便消除 XrugcHomePage 中 60+ 个 i18n 键的误报。

#### 验收标准

1. WHEN XrugcHomePage 调用 `useLocaleRoute` 时，THE UseLocaleRoute SHALL 接受 `'en'` 作为有效的 `defaultLocale` 参数，不产生 TypeScript 类型错误。
2. THE UseLocaleRoute SHALL 将 `defaultLocale` 参数类型定义为与 vue-i18n 支持的语言代码兼容的类型，包含 `'en'`、`'zh-CN'`、`'zh-TW'` 等值。

---

### 需求 4：规范 authApi 的 i18n 使用方式

**用户故事：** 作为开发者，我希望 authApi 通过标准方式使用 i18n，以便避免绕过 Composition API 的不规范导入。

#### 验收标准

1. THE AuthApi SHALL 不直接导入 i18n 实例（`import i18n from "@/i18n"`）来调用翻译函数。
2. WHEN AuthApi 需要返回本地化错误消息时，THE AuthApi SHALL 接受翻译函数作为参数，或返回错误码由调用方处理本地化。

---

### 需求 5：拆分大型首页组件

**用户故事：** 作为开发者，我希望将超过 500 行的首页组件拆分为独立的 Section 子组件，以便提升代码可读性和可维护性。

#### 验收标准

1. THE XingkouHomePage SHALL 被拆分为不超过 6 个独立 Section 组件（HeroSection、FeaturesSection、ScenesSection、NewsSection、CTASection、FooterSection）。
2. THE XiadingHomePage SHALL 被拆分为对应的独立 Section 组件。
3. THE XrugcHomePage SHALL 被拆分为对应的独立 Section 组件。
4. WHEN 拆分完成后，THE XingkouHomePage、XiadingHomePage、XrugcHomePage 各自的主文件行数 SHALL 不超过 300 行。
5. THE System SHALL 在拆分后保持与拆分前完全相同的页面渲染结果和交互行为。

---

### 需求 6：替换夏鼎品牌外部图片资源

**用户故事：** 作为运维人员，我希望夏鼎品牌首页使用本地图片资源，以便消除对 Unsplash 外部服务的依赖，提升加载稳定性。

#### 验收标准

1. THE XiadingHomePage SHALL 不包含任何指向 `images.unsplash.com` 域名的图片 URL。
2. THE XiadingHomePage SHALL 使用 `/images/ar-platform/` 路径下的本地 `.webp` 图片作为 Hero 区域背景图。
3. WHEN 网络无法访问外部服务时，THE XiadingHomePage SHALL 正常显示 Hero 区域图片。

---

### 需求 7：实现 API 请求去重与 TTL 缓存

**用户故事：** 作为用户，我希望页面加载时不发起重复的 API 请求，以便减少服务器压力并加快页面响应速度。

#### 验收标准

1. THE ApiCache SHALL 对相同 URL 的并发请求进行去重，确保同一时刻只有一个实际网络请求在进行。
2. THE ApiCache SHALL 为每个缓存条目维护 TTL（存活时间），默认值为 300,000 毫秒（5 分钟）。
3. WHEN 缓存条目的存活时间超过 TTL 时，THE ApiCache SHALL 在下次请求时重新发起网络请求。
4. WHEN 多个组件同时挂载并请求相同的 WordPress 分类数据时，THE WordpressApi SHALL 只发起一次实际网络请求。
5. IF 网络请求失败，THEN THE ApiCache SHALL 不缓存失败结果，允许下次请求重试。

---

### 需求 8：优化图片加载

**用户故事：** 作为用户，我希望页面图片按需加载，以便减少首屏加载时间和带宽消耗。

#### 验收标准

1. THE System SHALL 为所有非首屏图片元素添加 `loading="lazy"` 属性。
2. THE System SHALL 为 Hero 区域首屏图片设置 `fetchpriority="high"` 属性。
3. THE System SHALL 为所有 `<img>` 元素提供明确的 `width` 和 `height` 属性，以防止累积布局偏移（CLS）。
4. THE System SHALL 为所有 `<img>` 元素提供有意义的 `alt` 文本描述。

---

### 需求 9：优化字体加载

**用户故事：** 作为用户，我希望 Google Fonts 不阻塞页面渲染，以便加快首屏显示速度。

#### 验收标准

1. THE System SHALL 在 `index.html` 的 `<head>` 中添加 `<link rel="preconnect" href="https://fonts.googleapis.com">` 预连接声明。
2. THE System SHALL 在 `index.html` 的 `<head>` 中添加 `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>` 预连接声明。
3. THE XiadingHomePage 和 XrugcHomePage SHALL 不在组件 `<style>` 块中使用 `@import url(...)` 加载 Google Fonts，改为在 `index.html` 中统一预加载。

---

### 需求 10：实现移动端汉堡菜单

**用户故事：** 作为移动端用户，我希望在小屏幕设备上能通过汉堡菜单访问导航链接，以便在移动端正常使用网站导航。

#### 验收标准

1. WHEN 视口宽度小于 768px 时，THE System SHALL 在导航栏显示汉堡菜单图标，隐藏水平导航链接列表。
2. WHEN 用户点击汉堡菜单图标时，THE System SHALL 展开移动端导航菜单，显示所有导航链接。
3. WHEN 移动端导航菜单展开后用户点击任意导航链接时，THE System SHALL 收起菜单并平滑滚动到目标区域。
4. WHEN 移动端导航菜单展开时，THE System SHALL 为汉堡图标添加 `aria-expanded="true"` 属性。
5. WHEN 移动端导航菜单收起时，THE System SHALL 为汉堡图标设置 `aria-expanded="false"` 属性。
6. THE System SHALL 在星扣、夏鼎、XRUGC 三个品牌首页均实现移动端汉堡菜单功能。

---

### 需求 11：新闻弹窗无障碍支持

**用户故事：** 作为使用辅助技术的用户，我希望新闻弹窗符合 ARIA 规范，以便屏幕阅读器能正确识别和操作弹窗。

#### 验收标准

1. THE NewsModal SHALL 在根元素上设置 `role="dialog"` 和 `aria-modal="true"` 属性。
2. THE NewsModal SHALL 通过 `aria-labelledby` 属性关联弹窗标题元素。
3. WHEN NewsModal 打开时，THE NewsModal SHALL 将焦点移动到弹窗内部的第一个可聚焦元素。
4. WHEN 用户按下 ESC 键时，THE NewsModal SHALL 关闭弹窗并将焦点返回到触发元素。
5. WHILE NewsModal 处于打开状态，THE NewsModal SHALL 将键盘焦点限制在弹窗内部（焦点陷阱）。

---

### 需求 12：登录弹窗移动端全屏适配

**用户故事：** 作为移动端用户，我希望登录弹窗在手机上全屏显示，以便获得更好的输入体验。

#### 验收标准

1. WHEN 视口宽度小于或等于 768px 时，THE LoginModal SHALL 以全屏模式显示，宽度和高度均为 100vw × 100vh。
2. WHEN 视口宽度小于或等于 768px 时，THE LoginModal SHALL 移除圆角样式（`border-radius: 0`）。
3. WHEN 视口宽度大于 768px 时，THE LoginModal SHALL 保持原有的居中弹窗样式（宽度 420px）。

---

### 需求 13：使用 IntersectionObserver 替代 scroll 事件

**用户故事：** 作为用户，我希望页面滚动动画在低性能设备上也能流畅运行，以便获得一致的视觉体验。

#### 验收标准

1. THE UseScrollAnimation SHALL 使用 `IntersectionObserver` API 检测元素进入视口，不使用 `scroll` 事件监听 + `getBoundingClientRect()`。
2. WHEN 被观察元素进入视口时，THE UseScrollAnimation SHALL 为该元素添加 `animated` CSS 类。
3. WHEN 元素已触发动画后，THE UseScrollAnimation SHALL 停止观察该元素（调用 `unobserve`）。
4. WHEN 组件卸载时，THE UseScrollAnimation SHALL 断开所有 IntersectionObserver 连接（调用 `disconnect`）。
5. WHERE 用户系统启用了 `prefers-reduced-motion` 媒体查询，THE System SHALL 在星扣和夏鼎首页跳过滚动动画效果。

---

### 需求 14：接入 Vitest 测试框架

**用户故事：** 作为开发者，我希望项目配置 Vitest 测试框架，以便能够编写和运行自动化测试。

#### 验收标准

1. THE System SHALL 包含 `vitest.config.ts` 配置文件，配置 jsdom 测试环境和全局测试 API。
2. THE System SHALL 在 `package.json` 中配置 `test` 脚本为 `vitest --run`（单次执行模式）。
3. THE System SHALL 配置测试覆盖率报告，使用 v8 provider 生成 text 和 lcov 格式报告。
4. THE System SHALL 包含 `@vue/test-utils` 依赖用于 Vue 组件测试。

---

### 需求 15：编写核心模块单元测试

**用户故事：** 作为开发者，我希望核心模块有单元测试覆盖，以便在重构时快速发现回归问题。

#### 验收标准

1. THE System SHALL 包含 `brandRegistry` 的测试，验证所有品牌配置字段的完整性。
2. THE System SHALL 包含 `brandProvider` 的测试，验证品牌 ID 解析的优先级逻辑（`window.__BRAND_ID__` > `VITE_BRAND_ID` > 默认值）。
3. THE System SHALL 包含 `wordpressApi` 的 `transformPost` 函数测试，验证数据转换的正确性。
4. THE System SHALL 包含 `authApi` 健康检查与故障转移逻辑的测试。
5. THE System SHALL 包含 `useLocaleRoute` URL 参数同步行为的测试。
6. THE System SHALL 包含 `ApiCache` 请求去重和 TTL 过期逻辑的测试。

---

### 需求 16：编写属性测试（Property-Based Testing）

**用户故事：** 作为开发者，我希望通过属性测试验证系统的不变量，以便发现边界条件下的潜在 bug。

#### 验收标准

1. THE System SHALL 使用 `fast-check` 库编写属性测试。
2. THE System SHALL 包含 `brandRegistry` 的属性测试，验证对任意有效品牌 ID，`getBrandConfig` 返回非空配置且 `theme.primaryColor` 以 `#` 开头。
3. THE System SHALL 包含 `wordpressApi` 的属性测试，验证对任意有效 WordPress API 响应，`transformPost` 返回包含必要字段的 `NewsItem` 对象。
4. THE System SHALL 包含 `ApiCache` 的属性测试，验证对任意键值对，缓存的存取具有幂等性（在 TTL 内多次读取返回相同结果）。
5. THE System SHALL 包含 `formatDate` 的属性测试，验证对任意有效 ISO 日期字符串，格式化结果为非空字符串。
6. WHEN 属性测试运行时，THE System SHALL 每个属性至少执行 100 次随机输入迭代。

---

### 需求 17：配置 ESLint

**用户故事：** 作为开发者，我希望项目配置 ESLint，以便在开发时自动检测代码规范问题。

#### 验收标准

1. THE System SHALL 包含 `eslint.config.js`（flat config 格式）配置文件，继承 `@vue/eslint-config-typescript`。
2. THE System SHALL 在 ESLint 配置中将 `@typescript-eslint/no-explicit-any` 规则设置为 `warn` 级别。
3. THE System SHALL 在 `package.json` 中配置 `lint` 脚本，不使用 `|| true` 忽略错误。
4. THE System SHALL 在 CI/CD 流程中执行 lint 检查，lint 失败时构建流程应中止。

---

### 需求 18：修复 docker-entrypoint.sh 注入安全漏洞

**用户故事：** 作为运维人员，我希望 Docker 启动脚本安全地注入环境变量，以便防止特殊字符导致的 XSS 或 JS 语法破坏。

#### 验收标准

1. THE DockerEntrypoint SHALL 使用 JSON 序列化方式注入环境变量到 `window` 对象，不使用直接字符串插值。
2. WHEN 环境变量值包含单引号、双引号或 `</script>` 等特殊字符时，THE DockerEntrypoint SHALL 正确转义这些字符，不破坏注入的 JavaScript 语法。
3. THE DockerEntrypoint SHALL 对所有注入的环境变量（`BRAND_ID`、`WORDPRESS_API_URL`、`API_URL`、`BACKUP_API_URL`、`WORKBENCH_URL`）均应用安全注入方式。

---

### 需求 19：修复新闻内容 XSS 漏洞

**用户故事：** 作为用户，我希望新闻内容在渲染前经过净化处理，以便防止 WordPress 返回的恶意 HTML 执行 XSS 攻击。

#### 验收标准

1. THE System SHALL 安装 `dompurify` 和 `@types/dompurify` 依赖。
2. WHEN 渲染 WordPress 新闻内容时，THE NewsModal SHALL 使用 `DOMPurify.sanitize()` 净化 HTML 内容后再通过 `v-html` 渲染。
3. THE System SHALL 不直接将 WordPress API 返回的原始 HTML 字符串传递给 `v-html` 指令。

---

### 需求 20：统一 SCSS 变量引用

**用户故事：** 作为开发者，我希望品牌首页组件通过 `@use` 引入品牌变量文件，以便消除重复的变量定义，保持样式一致性。

#### 验收标准

1. THE XingkouHomePage SHALL 通过 `@use '@/assets/styles/xingkou/variables'` 引入品牌变量，不在组件内重复定义 `$primary`、`$spacing-*` 等变量。
2. THE XiadingHomePage SHALL 通过 `@use '@/assets/styles/xiading/variables'` 引入品牌变量，不在组件内重复定义品牌变量。
3. THE XrugcHomePage SHALL 通过对应的品牌变量文件引入 SCSS 变量，不在组件内重复定义。
4. WHEN 品牌主色调在变量文件中更新时，THE System SHALL 在所有引用该变量的组件中自动生效，无需逐一修改组件内联样式。
