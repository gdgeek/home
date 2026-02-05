# Design Document: 夏鼎独立页面设计

## Overview

本设计文档定义夏鼎品牌独立首页的技术架构和视觉设计方案。夏鼎采用深色科技感主题，与星扣的明亮教育风格形成鲜明对比。

设计核心理念：
- **深色主题**: 深蓝/深灰背景，营造科技感氛围
- **数据可视化**: 几何图形、粒子动效、连接线等元素
- **现代布局**: Bento-grid、横向滚动、时间线等非传统布局
- **微动效**: 发光效果、渐变动画、悬停反馈

技术栈：Vue 3 + TypeScript + Element Plus + SCSS

## Architecture

```
src/
├── views/
│   └── xiading/
│       └── XiadingHomePage.vue          # 夏鼎独立首页视图
├── components/
│   └── xiading/
│       ├── XiadingHeroSection.vue       # Hero 区域
│       ├── XiadingValueSection.vue      # 价值主张区域
│       ├── XiadingFeatureSection.vue    # 功能特性区域
│       ├── XiadingSceneSection.vue      # 应用场景区域
│       ├── XiadingCaseSection.vue       # 用户案例区域
│       ├── XiadingCTASection.vue        # CTA 区域
│       ├── XiadingFooterSection.vue     # 页脚区域
│       └── common/
│           ├── XiadingValueCard.vue     # 价值卡片
│           ├── XiadingFeatureCard.vue   # 功能卡片
│           ├── XiadingSceneCard.vue     # 场景卡片
│           ├── XiadingCaseCard.vue      # 案例卡片
│           ├── GeometricBackground.vue  # 几何背景装饰
│           └── ParticleCanvas.vue       # 粒子动效画布
├── assets/
│   └── styles/
│       └── xiading/
│           ├── _variables.scss          # 夏鼎主题变量
│           ├── _animations.scss         # 动效定义
│           └── _mixins.scss             # 工具混入
└── router/
    └── index.ts                         # 品牌路由配置
```

### 品牌路由策略

```typescript
// router/index.ts - 品牌路由配置
import { getCurrentBrandId } from '@/config/brandProvider'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => {
      const brandId = getCurrentBrandId()
      if (brandId === 'xiading') {
        return import('@/views/xiading/XiadingHomePage.vue')
      }
      return import('@/views/HomePage.vue')
    }
  }
]
```

## Components and Interfaces

### XiadingHomePage 视图组件

```typescript
// views/xiading/XiadingHomePage.vue
interface XiadingHomePageProps {
  // 无外部 props，从 useBrand composable 获取配置
}

// 组件组合
// - XiadingHeroSection
// - XiadingValueSection
// - XiadingFeatureSection
// - XiadingSceneSection
// - XiadingCaseSection
// - XiadingCTASection
// - XiadingFooterSection
```

### XiadingHeroSection 组件

```typescript
interface XiadingHeroSectionProps {
  title: string
  subtitle: string
  primaryButtonText: string
  secondaryButtonText: string
  highlights: string[]
  loginUrl: string
}

interface XiadingHeroSectionEmits {
  (e: 'openLogin'): void
  (e: 'scrollToCase'): void
}
```

视觉设计：
- 全屏深色背景 (`#0F172A` 到 `#1E293B` 渐变)
- 左侧内容区 + 右侧 3D/科技视觉区
- 浮动几何图形装饰 (六边形、圆形、连接线)
- 发光文字效果 (`text-shadow` 蓝色光晕)
- 粒子动效背景 (Canvas 实现)

### XiadingValueSection 组件

```typescript
interface XiadingValueItem {
  icon: string
  title: string
  description: string
  accentColor: string
}

interface XiadingValueSectionProps {
  items: XiadingValueItem[]
}
```

视觉设计：
- 错位网格布局 (staggered grid)
- 玻璃拟态卡片 (`backdrop-filter: blur(12px)`)
- 渐变边框动效 (`border-image` 或伪元素)
- 图标渐变背景动画

### XiadingFeatureSection 组件

```typescript
interface XiadingFeatureItem {
  icon: string
  title: string
  description: string
  size: 'large' | 'medium' | 'small'
  gridArea?: string
}

interface XiadingFeatureSectionProps {
  items: XiadingFeatureItem[]
  featuredIndex: number
}
```

视觉设计：
- Bento-grid 布局 (CSS Grid with named areas)
- 深色卡片背景 (`#1E293B`)
- 悬停缩放 + 发光效果
- 脉冲图标动画

### XiadingSceneSection 组件

```typescript
interface XiadingSceneItem {
  image: string
  title: string
  description: string
  tag: string
}

interface XiadingSceneSectionProps {
  items: XiadingSceneItem[]
}

interface XiadingSceneSectionEmits {
  (e: 'sceneChange', index: number): void
}
```

视觉设计：
- 横向滚动容器 (`overflow-x: auto`, `scroll-snap-type: x mandatory`)
- 中心卡片高亮 (scale + brightness)
- 底部渐变遮罩 + 文字
- 导航指示器 (dots/progress bar)

### XiadingCaseSection 组件

```typescript
interface XiadingCaseItem {
  logo: string
  company: string
  quote: string
  author: string
  role: string
  metrics: { label: string; value: string }[]
  year: string
}

interface XiadingCaseSectionProps {
  items: XiadingCaseItem[]
}
```

视觉设计：
- 垂直时间线布局
- 左右交替卡片位置
- 连接线绘制动画 (SVG path animation)
- 年份标记节点

### XiadingCTASection 组件

```typescript
interface XiadingCTASectionProps {
  title: string
  subtitle: string
  primaryButtonText: string
  loginUrl: string
}

interface XiadingCTASectionEmits {
  (e: 'openLogin'): void
}
```

视觉设计：
- 渐变背景 (`#0EA5E9` 到 `#10B981`)
- 粒子动效背景
- 发光边框按钮
- 浮动装饰元素

### XiadingFooterSection 组件

```typescript
interface XiadingFooterSectionProps {
  navigation: { title: string; links: { text: string; url: string }[] }[]
  copyright: string
  contactInfo: { phone?: string; email?: string; wechat?: string }
}
```

视觉设计：
- 深色背景 (`#0F172A`)
- 顶部渐变分隔线
- 悬停下划线滑动动效
- 几何装饰背景

## Data Models

### 夏鼎主题变量

```scss
// assets/styles/xiading/_variables.scss

// 颜色系统
$xiading-bg-primary: #0F172A;      // 主背景色
$xiading-bg-secondary: #1E293B;   // 次背景色
$xiading-bg-card: #334155;        // 卡片背景
$xiading-bg-card-hover: #475569;  // 卡片悬停

$xiading-primary: #0EA5E9;        // 主色 (天蓝)
$xiading-secondary: #06B6D4;      // 辅助色 (青色)
$xiading-accent: #10B981;         // 强调色 (绿色)
$xiading-warning: #F59E0B;        // 警告色 (琥珀)

$xiading-text-primary: #F8FAFC;   // 主文字
$xiading-text-secondary: #94A3B8; // 次文字
$xiading-text-muted: #64748B;     // 弱化文字

// 发光效果
$xiading-glow-primary: 0 0 20px rgba($xiading-primary, 0.5);
$xiading-glow-accent: 0 0 20px rgba($xiading-accent, 0.5);

// 渐变
$xiading-gradient-hero: linear-gradient(135deg, $xiading-bg-primary 0%, $xiading-bg-secondary 100%);
$xiading-gradient-cta: linear-gradient(135deg, $xiading-primary 0%, $xiading-accent 100%);
$xiading-gradient-border: linear-gradient(90deg, $xiading-primary, $xiading-secondary, $xiading-accent);

// 玻璃效果
$xiading-glass-bg: rgba($xiading-bg-secondary, 0.7);
$xiading-glass-border: rgba($xiading-primary, 0.2);
$xiading-glass-blur: 12px;

// 动画时长
$xiading-transition-fast: 150ms;
$xiading-transition-base: 300ms;
$xiading-transition-slow: 500ms;

// 断点
$xiading-breakpoint-mobile: 768px;
$xiading-breakpoint-tablet: 1024px;
$xiading-breakpoint-desktop: 1440px;
```

### 动效定义

```scss
// assets/styles/xiading/_animations.scss

// 发光脉冲
@keyframes xiading-glow-pulse {
  0%, 100% { box-shadow: $xiading-glow-primary; }
  50% { box-shadow: 0 0 30px rgba($xiading-primary, 0.8); }
}

// 浮动
@keyframes xiading-float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

// 渐变边框旋转
@keyframes xiading-border-rotate {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

// 粒子闪烁
@keyframes xiading-particle-blink {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 1; }
}

// 扫描线
@keyframes xiading-scanline {
  0% { transform: translateY(-100%); }
  100% { transform: translateY(100vh); }
}

// 淡入上移
@keyframes xiading-fade-in-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

// 淡入左移
@keyframes xiading-fade-in-left {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

// 淡入右移
@keyframes xiading-fade-in-right {
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
```

### 组件数据结构

```typescript
// types/xiading.ts

export interface XiadingValueItem {
  icon: string
  title: string
  description: string
  accentColor: string
}

export interface XiadingFeatureItem {
  icon: string
  title: string
  description: string
  size: 'large' | 'medium' | 'small'
  gridArea?: string
}

export interface XiadingSceneItem {
  image: string
  title: string
  description: string
  tag: string
}

export interface XiadingCaseItem {
  logo: string
  company: string
  quote: string
  author: string
  role: string
  metrics: { label: string; value: string }[]
  year: string
}

export interface XiadingPageData {
  values: XiadingValueItem[]
  features: XiadingFeatureItem[]
  scenes: XiadingSceneItem[]
  cases: XiadingCaseItem[]
}
```



## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Brand-based Routing

*For any* brand ID value, when the application loads with `VITE_BRAND_ID='xiading'`, the router SHALL render `XiadingHomePage` component; for any other brand ID, the router SHALL render the default `HomePage` component.

**Validates: Requirements 1.1, 1.4**

### Property 2: Scroll-triggered Animation Activation

*For any* section component with scroll-triggered animations (Value cards, Case cards, Timeline), when the element enters the viewport (Intersection Observer callback fires with `isIntersecting: true`), the system SHALL add the appropriate animation class to trigger the entrance animation.

**Validates: Requirements 3.2, 6.2, 6.4**

### Property 3: Responsive Layout Adaptation

*For any* viewport width:
- Below 768px: Hero section stacks vertically, Scene section converts to vertical stack, Timeline converts to single-column
- Below 1024px: Feature section converts to 2-column grid
- Above 1024px: All sections use their desktop layouts

**Validates: Requirements 9.1, 9.2, 9.3, 9.4**

### Property 4: Horizontal Scroll Behavior

*For any* scroll position in the Scene section:
- Scroll-snap SHALL align cards to snap points
- The card closest to center viewport SHALL have increased scale and brightness
- Both mouse drag and touch swipe SHALL update scroll position

**Validates: Requirements 5.2, 5.4, 5.6**

### Property 5: Timeline Alternating Layout

*For any* list of case items with length N, the rendered timeline SHALL:
- Position odd-indexed cards (1, 3, 5...) on the left side
- Position even-indexed cards (2, 4, 6...) on the right side
- Each card SHALL contain company logo, quote text, and metrics data

**Validates: Requirements 6.1, 6.3**

### Property 6: Touch Target Minimum Size

*For any* interactive element (buttons, links, cards), the computed dimensions SHALL be at least 44px × 44px to meet touch accessibility standards.

**Validates: Requirements 9.6**

### Property 7: GPU-accelerated Animations

*For any* animation in the system, the animated properties SHALL be limited to `transform` and `opacity` to ensure GPU acceleration and avoid layout thrashing.

**Validates: Requirements 10.1**

### Property 8: Reduced Motion Support

*For any* user with `prefers-reduced-motion: reduce` media query active, all animations SHALL either be disabled or simplified to instant transitions.

**Validates: Requirements 10.2**

### Property 9: Lazy Loading Below-fold Sections

*For any* section component below the initial viewport fold, the component SHALL be dynamically imported (lazy-loaded) rather than included in the initial bundle.

**Validates: Requirements 10.4**

## Error Handling

### Component Loading Errors

```typescript
// 组件加载失败处理
const XiadingHomePage = defineAsyncComponent({
  loader: () => import('@/views/xiading/XiadingHomePage.vue'),
  loadingComponent: LoadingSpinner,
  errorComponent: ErrorFallback,
  delay: 200,
  timeout: 10000
})
```

### Animation Fallbacks

```scss
// 动画降级处理
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Image Loading Errors

```vue
<template>
  <img 
    :src="imageSrc" 
    :alt="imageAlt"
    @error="handleImageError"
    loading="lazy"
  />
</template>

<script setup>
const handleImageError = (e: Event) => {
  const img = e.target as HTMLImageElement
  img.src = '/images/placeholder.svg'
}
</script>
```

### Intersection Observer Fallback

```typescript
// 不支持 IntersectionObserver 的浏览器降级
const useScrollAnimation = () => {
  if (!('IntersectionObserver' in window)) {
    // 直接显示所有元素，不使用动画
    return { observe: () => {}, disconnect: () => {} }
  }
  
  return new IntersectionObserver(callback, options)
}
```

## Testing Strategy

### Unit Tests

使用 Vitest + Vue Test Utils 进行组件单元测试：

1. **组件渲染测试**: 验证各 Section 组件正确渲染
2. **Props 传递测试**: 验证 props 正确传递到子组件
3. **事件触发测试**: 验证 emit 事件正确触发
4. **CSS 类应用测试**: 验证条件 CSS 类正确应用

### Property-Based Tests

使用 fast-check 进行属性测试，最少 100 次迭代：

1. **Property 1 测试**: 生成随机 brand ID，验证路由行为
2. **Property 3 测试**: 生成随机 viewport 宽度，验证布局适配
3. **Property 5 测试**: 生成随机长度的 case 列表，验证交替布局
4. **Property 6 测试**: 遍历所有交互元素，验证最小尺寸

### Integration Tests

1. **品牌切换测试**: 验证切换 brand ID 后页面正确更新
2. **滚动交互测试**: 验证滚动触发动画正确执行
3. **响应式测试**: 验证不同断点下布局正确切换

### Visual Regression Tests

使用 Playwright 进行视觉回归测试：

1. **全页面截图**: 各断点下的完整页面截图对比
2. **组件截图**: 各 Section 组件的独立截图对比
3. **动画状态截图**: 悬停、激活等状态的截图对比

### Accessibility Tests

1. **颜色对比度**: 验证文字与背景对比度 ≥ 4.5:1
2. **键盘导航**: 验证所有交互元素可通过键盘访问
3. **屏幕阅读器**: 验证 ARIA 标签正确设置
4. **触控目标**: 验证交互元素尺寸 ≥ 44px
