---
inclusion: fileMatch
fileMatchPattern: "**/*.vue,**/*.scss,**/*.css,**/*.ts"
---

# Frontend Aesthetics — 反 AI 审美收敛指南

当生成或修改前端 UI 代码时，遵循以下原则。目标：产出有设计感、有品牌辨识度的界面，而非千篇一律的 AI 默认风格。

---

## 核心问题

AI 生成前端时倾向于统计学上的"安全选择"——Inter 字体、紫色渐变、白色背景、圆角卡片。这种分布收敛（distributional convergence）让所有 AI 生成的页面看起来一模一样。以下规则用于打破这种收敛。

---

## 四个设计维度

### 1. 字体（Typography）

字体是品质信号。避免无聊的通用字体。

**禁用字体：** Inter, Roboto, Open Sans, Lato, Arial, 系统默认字体

**推荐方向：**
- 代码感：JetBrains Mono, Fira Code, Space Grotesk
- 编辑感：Playfair Display, Crimson Pro, Newsreader
- 技术感：IBM Plex 系列, Source Sans 3
- 独特感：Bricolage Grotesque, Noto Serif JP, Exo 2
- 中文搭配：Noto Sans TC/SC, LXGW WenKai（霞鹜文楷）

**配对原则：** 高对比 = 有趣。展示字体 + 等宽，衬线 + 几何无衬线。
**字重极端化：** 用 100/200 vs 800/900，不要 400 vs 600。字号跳跃 3x+，不要 1.5x。
**执行：** 选一个有辨识度的字体，果断使用。从 Google Fonts 加载。

### 2. 色彩与主题（Color & Theme）

承诺一个连贯的美学方向。用 CSS 变量保持一致性。

**禁止：**
- 紫色渐变 + 白色背景（AI 最常见的默认组合）
- 平均分配的怯懦配色

**要求：**
- 主色占主导地位，搭配锐利的强调色
- 从 IDE 主题、文化美学中汲取灵感
- 每个品牌必须有独立的色彩系统
- 使用 SCSS 变量或 CSS custom properties 管理

### 3. 动效（Motion）

用动画增加打磨感和微交互。

**优先 CSS-only 方案**（本项目是 Vue + SCSS，不用 React 动画库）。
**聚焦高影响力时刻：** 一个精心编排的页面加载（staggered reveals + animation-delay）比零散的微交互更有效。
**过渡时间：** 150-300ms，使用 cubic-bezier(0.22, 1, 0.36, 1) 或类似的 ease-out 曲线。
**必须尊重 `prefers-reduced-motion`。**

### 4. 背景（Background）

营造氛围和深度，不要默认纯色。

**手法：**
- 叠加 CSS 渐变（radial-gradient 光斑）
- 几何图案（网格线、点阵）
- 与整体美学匹配的上下文效果（光晕、柔和模糊）
- 用 mask-image 控制图案的可见范围

---

## 禁止清单（Anti-patterns）

- Inter / Roboto / Arial / 系统字体
- 紫色渐变 + 白色背景
- 可预测的布局和组件模式
- 缺乏上下文特色的模板化设计
- Emoji 作为图标（用 SVG：Heroicons / Lucide）
- 没有 cursor:pointer 的可点击元素
- 导致布局偏移的 hover scale
- 即时状态变化（必须有 transition）
- 不可见的 focus 状态

---

## 变化性要求

即使有了上述指导，AI 仍然会收敛到新的局部最优（比如总是选 Space Grotesk）。
**每次生成 UI 时，必须在字体、配色、美学方向上做出不同于上次的选择。**
创造性地解读需求，做出让人感觉"确实是为这个场景设计的"意外选择。
在浅色和深色主题之间变化，在不同字体、不同美学之间变化。

---

## 本项目技术栈适配

- **框架：** Vue 3 + TypeScript
- **样式：** SCSS scoped styles（不用 Tailwind）
- **组件库：** Element Plus（按需使用）
- **字体加载：** Google Fonts `@import url()` 在 `<style>` 顶部
- **图标：** 内联 SVG 或 Element Plus Icons
- **响应式：** 375px / 768px / 1024px / 1440px 四档
- **动画：** 纯 CSS + Vue Transition，不引入额外动画库

---

## 品牌主题锁定

本项目有多个品牌，每个品牌有独立的设计方向：

### 星扣（Xingkou）— 大陆教育市场
- 风格：专业蓝色主题，简洁教育风
- 字体：PingFang SC / Noto Sans SC
- 配色：蓝色系（#1E40AF 主色）

### 夏鼎（Xiading）— 澳门教育市场
- 风格：日系淺色清爽 + 科技感點綴，冰白底帶藍調
- 字体：Zen Kaku Gothic New（标题/数字）+ Noto Sans TC（正文）
- 配色：Logo鋼藍（#4A6FA5 主色），冰白底（#F6F9FD），淡鋼藍光暈
- 卡片：白底 + 鋼藍柔和陰影 + 圓角（18px）
- 背景：淺色細線網格 + 鋼藍光暈，科技感但不壓迫
- 字重對比：300 thin vs 900 black，日系留白感

**生成 UI 时，先确认目标品牌，再应用对应的设计系统。**

---

## 交付前检查

- [ ] 没有使用禁用字体
- [ ] 没有紫色渐变 + 白色背景的默认组合
- [ ] 所有图标使用 SVG，不是 emoji
- [ ] 所有可点击元素有 cursor: pointer
- [ ] Hover 状态有 150-300ms 过渡
- [ ] 浅色模式文字对比度 4.5:1 以上
- [ ] Focus 状态可见（键盘导航）
- [ ] `prefers-reduced-motion` 已处理
- [ ] 响应式：375px / 768px / 1024px / 1440px
- [ ] 没有内容被固定导航栏遮挡
- [ ] 移动端没有水平滚动
