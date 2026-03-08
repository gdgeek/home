# 任务列表：项目改进（Project Improvements）

## 任务概览

基于设计文档和需求文档，将改进工作分为五个阶段执行。优先处理基础架构（类型安全、共享 Composable），再拆分大文件，然后补充测试，最后处理安全和体验改进。

---

## 阶段一：代码架构优化

- [x] 1.1 创建 `src/types/runtime.ts`，定义 RuntimeConfig 接口并扩展全局 Window 类型
  - 包含 `__BRAND_ID__`、`__WORDPRESS_API_URL__`、`__API_URL__`、`__BACKUP_API_URL__`、`__WORKBENCH_URL__`、`__APP_VERSION__`、`__BUILD_TIME__` 字段
  - 导出 `getRuntimeConfig()` 类型安全访问函数
  - **验证：需求 2.1、2.2、2.3**

- [x] 1.2 修复 `useLocaleRoute.ts` 的 `defaultLocale` 参数类型
  - 将类型定义为与 vue-i18n 兼容的语言代码联合类型，包含 `'en'`
  - 确保 XrugcHomePage 中的调用不产生 TypeScript 类型错误
  - **验证：需求 3.1、3.2**

- [x] 1.3 重构 `authApi.ts`，移除直接 i18n 实例导入
  - 将本地化错误消息处理改为接受翻译函数参数或返回错误码
  - **验证：需求 4.1、4.2**

- [x] 1.4 创建 `src/composables/usePageCommon.ts`
  - 封装：`showLoginModal`、`showNewsModal`、`selectedNews`、`navScrolled`、`animatedSections`
  - 封装：`blogUrl`（computed）、`version`（computed）、`buildTime`（computed）
  - 封装：`handleOpenLogin`、`handleOpenNewsDetail`、`handleScroll`、`formatDate`
  - 在 `onMounted` 中注册 scroll 监听，在 `onUnmounted` 中移除
  - 所有返回类型使用 `UsePageCommonReturn` 接口，无 `any` 类型
  - **验证：需求 1.1、1.2、1.3、1.4、1.5、1.6**

- [x] 1.5 创建 `src/composables/useScrollAnimation.ts`
  - 使用 `IntersectionObserver` 替代 scroll 事件
  - 元素进入视口时添加 `animated` 类并调用 `unobserve`
  - `onUnmounted` 时调用 `disconnect`
  - 支持 `prefers-reduced-motion` 媒体查询跳过动画
  - **验证：需求 13.1、13.2、13.3、13.4、13.5**

---

## 阶段二：拆分大型首页组件

- [x] 2.1 拆分 `XingkouHomePage.vue`（当前 1788 行）
  - 创建 `src/views/xingkou/sections/HeroSection.vue`
  - 创建 `src/views/xingkou/sections/FeaturesSection.vue`
  - 创建 `src/views/xingkou/sections/ScenesSection.vue`
  - 创建 `src/views/xingkou/sections/NewsSection.vue`
  - 创建 `src/views/xingkou/sections/CTASection.vue`
  - 创建 `src/views/xingkou/sections/FooterSection.vue`
  - 主文件引入 `usePageCommon` 和 `useScrollAnimation`，行数控制在 300 行以内
  - 通过 `@use '@/assets/styles/xingkou/variables'` 引入品牌变量，移除组件内重复变量定义
  - **验证：需求 5.1、5.4、5.5、20.1**

- [x] 2.2 拆分 `XiadingHomePage.vue`（当前 1022 行）
  - 创建 `src/views/xiading/sections/HeroSection.vue`
  - 创建 `src/views/xiading/sections/FeaturesSection.vue`
  - 创建 `src/views/xiading/sections/ScenesSection.vue`
  - 创建 `src/views/xiading/sections/NewsSection.vue`
  - 创建 `src/views/xiading/sections/CTASection.vue`
  - 创建 `src/views/xiading/sections/FooterSection.vue`
  - 替换所有 `images.unsplash.com` 图片为 `/images/ar-platform/` 本地图片
  - 移除 `<style>` 块中的 `@import url(...)` Google Fonts 导入
  - 通过 `@use '@/assets/styles/xiading/variables'` 引入品牌变量
  - 主文件行数控制在 300 行以内
  - **验证：需求 5.2、5.4、5.5、6.1、6.2、9.3、20.2**

- [x] 2.3 拆分 `XrugcHomePage.vue`
  - 创建 `src/views/xrugc/sections/HeroSection.vue`
  - 创建 `src/views/xrugc/sections/FeaturesSection.vue`
  - 创建 `src/views/xrugc/sections/ScenesSection.vue`
  - 创建 `src/views/xrugc/sections/NewsSection.vue`
  - 创建 `src/views/xrugc/sections/CTASection.vue`
  - 创建 `src/views/xrugc/sections/FooterSection.vue`
  - 移除 `<style>` 块中的 `@import url(...)` Google Fonts 导入
  - 通过对应品牌变量文件引入 SCSS 变量
  - 主文件行数控制在 300 行以内
  - **验证：需求 5.3、5.4、5.5、9.3、20.3**

---

## 阶段三：性能与多品牌改进

- [x] 3.1 实现 `ApiCache` 类（`src/services/apiCache.ts`）
  - 实现请求去重（`pending` Map）
  - 实现 TTL 缓存（默认 300,000ms）
  - 失败请求不缓存
  - 集成到 `wordpressApi.ts` 替换现有简单缓存
  - **验证：需求 7.1、7.2、7.3、7.4、7.5**

- [x] 3.2 优化图片属性
  - 为所有非首屏 `<img>` 添加 `loading="lazy"`
  - 为 Hero 区域首屏图片添加 `fetchpriority="high"`
  - 为所有 `<img>` 补充 `width`、`height`、`alt` 属性
  - **验证：需求 8.1、8.2、8.3、8.4**

- [x] 3.3 优化 `index.html` 字体加载
  - 添加 `<link rel="preconnect" href="https://fonts.googleapis.com">`
  - 添加 `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>`
  - **验证：需求 9.1、9.2**

---

## 阶段四：用户体验与安全改进

- [x] 4.1 实现移动端汉堡菜单
  - 在三个品牌首页的导航栏组件中添加汉堡菜单图标（视口 < 768px 时显示）
  - 实现展开/收起状态管理
  - 点击导航链接后自动收起菜单
  - 正确设置 `aria-expanded` 属性
  - **验证：需求 10.1、10.2、10.3、10.4、10.5、10.6**

- [x] 4.2 改进 `NewsModal` 无障碍支持
  - 添加 `role="dialog"`、`aria-modal="true"`、`aria-labelledby` 属性
  - 实现打开时焦点移入弹窗
  - 实现 ESC 键关闭并返回焦点
  - 实现焦点陷阱（Tab 键循环）
  - **验证：需求 11.1、11.2、11.3、11.4、11.5**

- [x] 4.3 适配 `LoginModal.vue` 移动端全屏
  - 添加媒体查询：视口 ≤ 768px 时设置 `width: 100%`、`height: 100vh`、`border-radius: 0`、`margin: 0`
  - **验证：需求 12.1、12.2、12.3**

- [x] 4.4 修复 `docker-entrypoint.sh` 注入安全漏洞
  - 使用 JSON 序列化（`python3 -c "import json,sys; print(json.dumps(sys.stdin.read()))"` 或等效方式）替换直接字符串插值
  - 对所有注入变量（`BRAND_ID`、`WORDPRESS_API_URL`、`API_URL`、`BACKUP_API_URL`、`WORKBENCH_URL`）应用安全注入
  - **验证：需求 18.1、18.2、18.3**

- [x] 4.5 修复新闻内容 XSS 漏洞
  - 安装 `dompurify` 和 `@types/dompurify`
  - 在 `NewsModal` 中使用 `DOMPurify.sanitize()` 净化内容后再传给 `v-html`
  - **验证：需求 19.1、19.2、19.3**

---

## 阶段五：开发体验改进与测试

- [x] 5.1 接入 Vitest 测试框架
  - 安装 `vitest`、`@vue/test-utils`、`@vitest/coverage-v8`、`jsdom`
  - 创建 `vitest.config.ts`（jsdom 环境、globals: true、v8 覆盖率）
  - 更新 `package.json` 的 `test` 脚本为 `vitest --run`
  - **验证：需求 14.1、14.2、14.3、14.4**

- [x] 5.2 安装 `fast-check` 并配置属性测试
  - 安装 `fast-check` 依赖
  - **验证：需求 16.1**

- [x] 5.3 编写 `brandRegistry` 测试（`src/services/__tests__/brandRegistry.test.ts`）
  - 属性测试：对任意有效品牌 ID，`getBrandConfig` 返回非空配置，`primaryColor` 以 `#` 开头
  - 单元测试：验证三个品牌的配置字段完整性
  - **验证：需求 15.1、16.2**

- [x] 5.4 编写 `brandProvider` 测试（`src/services/__tests__/brandProvider.test.ts`）
  - 属性测试：验证 `window.__BRAND_ID__` > `VITE_BRAND_ID` > 默认值的优先级
  - **验证：需求 15.2**

- [x] 5.5 编写 `wordpressApi` 测试（`src/services/__tests__/wordpressApi.test.ts`）
  - 属性测试：对任意有效 WordPress 文章响应，`transformPost` 返回包含必要字段的 `NewsItem`
  - **验证：需求 15.3、16.3**

- [x] 5.6 编写 `authApi` 测试（`src/services/__tests__/authApi.test.ts`）
  - 单元测试：健康检查成功时使用主 API
  - 单元测试：健康检查失败时故障转移到备用 API
  - **验证：需求 15.4**

- [x] 5.7 编写 `useLocaleRoute` 测试（`src/composables/__tests__/useLocaleRoute.test.ts`）
  - 属性测试：对任意有效语言代码，设置语言后 URL `?lang=` 参数与当前语言一致
  - **验证：需求 15.5**

- [x] 5.8 编写 `ApiCache` 测试（`src/services/__tests__/apiCache.test.ts`）
  - 属性测试：TTL 内多次读取返回相同结果（幂等性）
  - 属性测试：并发请求去重，只发起一次网络请求
  - 边界测试：TTL 过期后重新请求
  - 边界测试：失败请求不缓存
  - **验证：需求 7.1、7.2、7.3、7.5、15.6、16.4**

- [x] 5.9 编写 `usePageCommon` 测试（`src/composables/__tests__/usePageCommon.test.ts`）
  - 属性测试：对任意有效 ISO 日期字符串，`formatDate` 返回非空字符串
  - 边界测试：无效日期字符串返回原始字符串
  - 单元测试：挂载时注册 scroll 监听，卸载时移除
  - **验证：需求 1.2、1.3、1.5、1.6**

- [x] 5.10 编写 `useScrollAnimation` 测试（`src/composables/__tests__/useScrollAnimation.test.ts`）
  - 属性测试：元素进入视口时添加 `animated` 类并调用 `unobserve`
  - 单元测试：卸载时调用 `disconnect`
  - 单元测试：`prefers-reduced-motion` 时跳过动画
  - **验证：需求 13.2、13.3、13.4、13.5**

- [x] 5.11 编写 `DOMPurify` 净化属性测试（`src/components/__tests__/newsModal.test.ts`）
  - 属性测试：对任意包含 `<script>` 或事件属性的 HTML 字符串，净化后不包含可执行脚本
  - **验证：需求 19.2**

- [x] 5.12 编写 `docker-entrypoint.sh` 安全注入测试
  - 属性测试：对任意包含特殊字符的环境变量值，注入后生成的 JS 语法合法
  - **验证：需求 18.1、18.2**

- [x] 5.13 配置 ESLint
  - 安装 `eslint`、`@vue/eslint-config-typescript`
  - 创建 `eslint.config.js`（flat config），配置 `no-explicit-any: warn`
  - 更新 `package.json` 的 `lint` 脚本，移除 `|| true`
  - 更新 CI/CD（`.github/workflows/ci-cd.yml`）中的 lint 步骤，移除 `|| true`
  - **验证：需求 17.1、17.2、17.3、17.4**
