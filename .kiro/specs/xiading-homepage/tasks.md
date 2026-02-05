# Implementation Plan: 夏鼎独立页面设计

## Overview

本任务列表将夏鼎独立页面设计分解为可执行的开发任务。采用增量开发方式，从基础架构开始，逐步实现各个 Section 组件，最后进行集成和测试。

技术栈：Vue 3 + TypeScript + Element Plus + SCSS

## Tasks

- [x] 1. 搭建夏鼎独立架构基础
  - [x] 1.1 创建夏鼎主题变量文件 `src/assets/styles/xiading/_variables.scss`
    - 定义颜色系统、发光效果、渐变、玻璃效果变量
    - _Requirements: 2.7, 7.6, 8.1_
  - [x] 1.2 创建夏鼎动效定义文件 `src/assets/styles/xiading/_animations.scss`
    - 定义发光脉冲、浮动、渐变边框、淡入动画
    - _Requirements: 2.1, 3.2, 10.1_
  - [x] 1.3 创建夏鼎类型定义文件 `src/types/xiading.ts`
    - 定义 XiadingValueItem, XiadingFeatureItem, XiadingSceneItem, XiadingCaseItem 接口
    - _Requirements: 3.1, 4.1, 5.1, 6.1_
  - [x] 1.4 更新路由配置支持品牌动态加载
    - 修改 `src/router/index.ts` 根据 brand ID 加载对应视图
    - _Requirements: 1.1, 1.4_

- [x] 2. 实现夏鼎 Hero 区域
  - [x] 2.1 创建几何背景装饰组件 `src/components/xiading/common/GeometricBackground.vue`
    - 实现浮动六边形、圆形、连接线 SVG 元素
    - 添加浮动动画效果
    - _Requirements: 2.2_
  - [x] 2.2 创建粒子动效画布组件 `src/components/xiading/common/ParticleCanvas.vue`
    - 使用 Canvas API 实现粒子系统
    - 使用 requestAnimationFrame 进行动画渲染
    - _Requirements: 2.4, 10.3_
  - [x] 2.3 创建 XiadingHeroSection 组件 `src/components/xiading/XiadingHeroSection.vue`
    - 实现全屏深色渐变背景
    - 集成几何背景和粒子动效
    - 实现发光文字效果和分屏布局
    - 实现 CTA 按钮发光悬停效果
    - _Requirements: 2.1, 2.3, 2.5, 2.6, 2.7_
  - [ ]* 2.4 编写 XiadingHeroSection 单元测试
    - 测试组件渲染、props 传递、事件触发
    - _Requirements: 2.1-2.7_

- [x] 3. Checkpoint - Hero 区域验收
  - 确保 Hero 区域正确渲染，动效流畅
  - 如有问题请提出

- [x] 4. 实现夏鼎价值主张区域
  - [x] 4.1 创建 XiadingValueCard 组件 `src/components/xiading/common/XiadingValueCard.vue`
    - 实现玻璃拟态卡片样式
    - 实现渐变边框悬停动效
    - 实现图标渐变背景动画
    - _Requirements: 3.3, 3.4, 3.6_
  - [x] 4.2 创建 XiadingValueSection 组件 `src/components/xiading/XiadingValueSection.vue`
    - 实现错位网格布局
    - 集成 Intersection Observer 实现滚动触发动画
    - 添加几何装饰元素
    - _Requirements: 3.1, 3.2, 3.5_
  - [ ]* 4.3 编写 XiadingValueSection 属性测试
    - **Property 2: Scroll-triggered Animation Activation**
    - **Validates: Requirements 3.2**

- [x] 5. 实现夏鼎功能特性区域
  - [x] 5.1 创建 XiadingFeatureCard 组件 `src/components/xiading/common/XiadingFeatureCard.vue`
    - 实现深色卡片背景
    - 实现悬停缩放和发光效果
    - 实现脉冲图标动画
    - _Requirements: 4.4, 4.5, 4.6_
  - [x] 5.2 创建 XiadingFeatureSection 组件 `src/components/xiading/XiadingFeatureSection.vue`
    - 实现 Bento-grid 布局 (CSS Grid with named areas)
    - 实现 featured card 跨多格布局
    - 实现交错淡入动画
    - _Requirements: 4.1, 4.2, 4.3_
  - [ ]* 5.3 编写 XiadingFeatureSection 单元测试
    - 测试 grid 布局、card 尺寸、动画延迟
    - _Requirements: 4.1-4.6_

- [x] 6. Checkpoint - 价值和功能区域验收
  - 确保价值主张和功能特性区域正确渲染
  - 如有问题请提出

- [x] 7. 实现夏鼎应用场景区域
  - [x] 7.1 创建 XiadingSceneCard 组件 `src/components/xiading/common/XiadingSceneCard.vue`
    - 实现全高图片卡片
    - 实现底部渐变遮罩和文字
    - 实现中心高亮效果 (scale + brightness)
    - _Requirements: 5.4, 5.5_
  - [x] 7.2 创建 XiadingSceneSection 组件 `src/components/xiading/XiadingSceneSection.vue`
    - 实现横向滚动容器 (scroll-snap)
    - 实现导航指示器
    - 实现鼠标拖拽和触摸滑动支持
    - _Requirements: 5.1, 5.2, 5.3, 5.6_
  - [ ]* 7.3 编写 XiadingSceneSection 属性测试
    - **Property 4: Horizontal Scroll Behavior**
    - **Validates: Requirements 5.2, 5.4, 5.6**

- [x] 8. 实现夏鼎用户案例区域
  - [x] 8.1 创建 XiadingCaseCard 组件 `src/components/xiading/common/XiadingCaseCard.vue`
    - 实现案例卡片布局 (logo, quote, metrics)
    - 实现左右交替定位样式
    - 实现淡入滑动动画
    - _Requirements: 6.3, 6.4_
  - [x] 8.2 创建 XiadingCaseSection 组件 `src/components/xiading/XiadingCaseSection.vue`
    - 实现垂直时间线布局
    - 实现连接线绘制动画 (SVG path)
    - 实现年份标记节点
    - _Requirements: 6.1, 6.2, 6.5, 6.6_
  - [ ]* 8.3 编写 XiadingCaseSection 属性测试
    - **Property 5: Timeline Alternating Layout**
    - **Validates: Requirements 6.1, 6.3**

- [x] 9. Checkpoint - 场景和案例区域验收
  - 确保应用场景和用户案例区域正确渲染
  - 如有问题请提出

- [x] 10. 实现夏鼎 CTA 和页脚区域
  - [x] 10.1 创建 XiadingCTASection 组件 `src/components/xiading/XiadingCTASection.vue`
    - 实现渐变背景
    - 集成粒子动效背景
    - 实现发光边框按钮和悬停效果
    - 添加浮动装饰元素
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5, 7.6_
  - [x] 10.2 创建 XiadingFooterSection 组件 `src/components/xiading/XiadingFooterSection.vue`
    - 实现深色背景和顶部渐变分隔线
    - 实现导航链接悬停动效
    - 添加几何装饰背景
    - 实现社交图标悬停效果
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.6_
  - [ ]* 10.3 编写 CTA 和 Footer 单元测试
    - 测试组件渲染、样式应用、事件触发
    - _Requirements: 7.1-7.6, 8.1-8.6_

- [x] 11. 创建夏鼎首页视图并集成所有组件
  - [x] 11.1 创建 XiadingHomePage 视图 `src/views/xiading/XiadingHomePage.vue`
    - 导入并组合所有 Section 组件
    - 集成 useBrand composable 获取品牌配置
    - 实现懒加载 below-fold 组件
    - _Requirements: 1.2, 1.3, 10.4_
  - [ ]* 11.2 编写品牌路由属性测试
    - **Property 1: Brand-based Routing**
    - **Validates: Requirements 1.1, 1.4**
  - [ ]* 11.3 编写懒加载属性测试
    - **Property 9: Lazy Loading Below-fold Sections**
    - **Validates: Requirements 10.4**

- [x] 12. 实现响应式设计和动效优化
  - [x] 12.1 添加响应式样式
    - Hero 区域移动端垂直堆叠
    - Scene 区域移动端转为垂直卡片
    - Feature 区域平板转为 2 列
    - Case 区域移动端单列布局
    - _Requirements: 9.1, 9.2, 9.3, 9.4_
  - [x] 12.2 实现 prefers-reduced-motion 支持
    - 添加媒体查询禁用/简化动画
    - _Requirements: 10.2_
  - [x] 12.3 验证触控目标尺寸
    - 确保所有交互元素 ≥ 44px
    - _Requirements: 9.6_
  - [ ]* 12.4 编写响应式布局属性测试
    - **Property 3: Responsive Layout Adaptation**
    - **Validates: Requirements 9.1, 9.2, 9.3, 9.4**
  - [ ]* 12.5 编写触控目标属性测试
    - **Property 6: Touch Target Minimum Size**
    - **Validates: Requirements 9.6**
  - [ ]* 12.6 编写减少动画属性测试
    - **Property 8: Reduced Motion Support**
    - **Validates: Requirements 10.2**

- [x] 13. Final Checkpoint - 完整页面验收
  - 确保所有组件正确集成
  - 验证响应式布局在各断点正常工作
  - 验证动效流畅且支持减少动画偏好
  - 如有问题请提出

## Notes

- 任务标记 `*` 为可选测试任务，可跳过以加快 MVP 开发
- 每个任务引用具体需求以确保可追溯性
- Checkpoint 任务用于阶段性验收，确保增量进度
- 属性测试验证通用正确性属性，单元测试验证具体示例和边界情况
