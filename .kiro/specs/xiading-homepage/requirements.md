# Requirements Document

## Introduction

夏鼎品牌需要一套完全独立的首页设计，与星扣品牌在视觉风格、布局结构和交互动效上形成明显差异。夏鼎定位为科技感、数据驱动、智能化的品牌形象，采用深色主题配合蓝色科技感设计语言。

页面保持与星扣相同的内容结构（Hero、价值主张、功能特性、应用场景、用户案例、CTA、页脚），但通过完全不同的视觉设计、组件布局和动效实现品牌差异化。

## Glossary

- **Xiading_Homepage**: 夏鼎品牌独立首页视图组件
- **Xiading_Hero_Section**: 夏鼎首屏展示区域，采用全屏深色背景配合数据可视化元素
- **Xiading_Value_Section**: 夏鼎价值主张区域，采用卡片式布局配合几何图形装饰
- **Xiading_Feature_Section**: 夏鼎功能特性区域，采用不对称网格布局
- **Xiading_Scene_Section**: 夏鼎应用场景区域，采用横向滚动卡片设计
- **Xiading_Case_Section**: 夏鼎用户案例区域，采用瀑布流或时间线布局
- **Xiading_CTA_Section**: 夏鼎行动召唤区域，采用渐变背景配合粒子动效
- **Xiading_Footer_Section**: 夏鼎页脚区域，采用深色主题配合科技感装饰
- **Brand_Router**: 品牌路由系统，根据 VITE_BRAND_ID 加载对应品牌的视图组件
- **Dark_Theme**: 深色主题设计，以深蓝/深灰为主背景色
- **Tech_Aesthetic**: 科技感美学，包含数据可视化元素、几何图形、渐变效果、微动效

## Requirements

### Requirement 1: 夏鼎独立视图架构

**User Story:** As a developer, I want Xiading brand to have completely independent view components, so that the brand can have a unique visual identity without sharing components with Xingkou.

#### Acceptance Criteria

1. WHEN the application loads with VITE_BRAND_ID='xiading', THE Brand_Router SHALL render Xiading_Homepage instead of the shared HomePage
2. THE Xiading_Homepage SHALL be located at `src/views/xiading/XiadingHomePage.vue` as a separate view file
3. THE Xiading_Homepage SHALL import and compose all Xiading-specific section components
4. WHEN navigating to the root path with xiading brand, THE system SHALL display the Xiading_Homepage view
5. THE Xiading section components SHALL be located under `src/components/xiading/` directory

### Requirement 2: 夏鼎 Hero 区域设计

**User Story:** As a visitor, I want to see a visually striking hero section with tech aesthetic, so that I immediately understand Xiading's technology-focused brand positioning.

#### Acceptance Criteria

1. THE Xiading_Hero_Section SHALL display a full-viewport dark background with animated gradient effects
2. WHEN the hero section loads, THE system SHALL render floating geometric shapes (hexagons, circles, lines) as decorative elements
3. THE Xiading_Hero_Section SHALL display the brand title with a glowing text effect using CSS text-shadow
4. THE Xiading_Hero_Section SHALL include animated data visualization elements (particle dots, connection lines) in the background
5. WHEN hovering over the primary CTA button, THE system SHALL display a ripple glow animation effect
6. THE Xiading_Hero_Section SHALL use a split-screen layout with content on left and 3D/tech visual on right
7. THE hero section background SHALL use colors from the xiading theme (primaryColor: #0EA5E9, backgroundColor derived from dark palette)

### Requirement 3: 夏鼎价值主张区域设计

**User Story:** As a visitor, I want to understand Xiading's core value propositions through visually distinct cards, so that I can quickly grasp the brand's key benefits.

#### Acceptance Criteria

1. THE Xiading_Value_Section SHALL display value cards in a staggered/offset grid layout (not aligned grid like Xingkou)
2. WHEN a value card enters the viewport, THE system SHALL trigger a slide-in animation from alternating directions
3. THE Xiading_Value_Section SHALL use glassmorphism card style with blur backdrop and subtle border glow
4. WHEN hovering over a value card, THE system SHALL display a border gradient animation effect
5. THE Xiading_Value_Section SHALL include geometric accent shapes (triangles, lines) as section decorations
6. THE value cards SHALL display icons with animated gradient backgrounds

### Requirement 4: 夏鼎功能特性区域设计

**User Story:** As a visitor, I want to explore Xiading's features through an engaging asymmetric layout, so that the presentation feels modern and dynamic.

#### Acceptance Criteria

1. THE Xiading_Feature_Section SHALL use a bento-grid layout with varying card sizes (large, medium, small)
2. WHEN the feature section loads, THE system SHALL render cards with staggered fade-in animations
3. THE Xiading_Feature_Section SHALL include one featured/hero card that spans multiple grid cells
4. WHEN hovering over a feature card, THE system SHALL display a subtle scale transform with glow effect
5. THE feature cards SHALL use dark card backgrounds with light text for contrast
6. THE Xiading_Feature_Section SHALL include animated icon containers with pulse effects

### Requirement 5: 夏鼎应用场景区域设计

**User Story:** As a visitor, I want to browse application scenarios through a horizontal scrolling interface, so that I can explore use cases in an interactive way.

#### Acceptance Criteria

1. THE Xiading_Scene_Section SHALL implement horizontal scroll navigation with snap points
2. WHEN scrolling horizontally, THE system SHALL display smooth scroll-snap behavior to each scene card
3. THE Xiading_Scene_Section SHALL include navigation indicators (dots or progress bar) showing current position
4. WHEN a scene card is in the center viewport, THE system SHALL highlight it with increased scale and brightness
5. THE scene cards SHALL use full-height images with gradient overlay and text at bottom
6. THE Xiading_Scene_Section SHALL support both mouse drag and touch swipe for navigation

### Requirement 6: 夏鼎用户案例区域设计

**User Story:** As a visitor, I want to see customer success stories in a timeline or masonry layout, so that the presentation feels different from standard card grids.

#### Acceptance Criteria

1. THE Xiading_Case_Section SHALL use a vertical timeline layout with alternating left/right card positions
2. WHEN scrolling through the timeline, THE system SHALL animate the connecting line drawing effect
3. THE case cards SHALL include company logo, quote text, and metrics/results data
4. WHEN a case card enters the viewport, THE system SHALL trigger a fade-slide animation from its side
5. THE timeline connector SHALL use animated gradient or glow effect
6. THE Xiading_Case_Section SHALL display year/date markers along the timeline

### Requirement 7: 夏鼎 CTA 区域设计

**User Story:** As a visitor, I want to see a compelling call-to-action section with dynamic effects, so that I feel motivated to take action.

#### Acceptance Criteria

1. THE Xiading_CTA_Section SHALL display a full-width section with animated gradient background
2. WHEN the CTA section loads, THE system SHALL render subtle particle animation in the background
3. THE primary CTA button SHALL use a glowing border animation effect
4. WHEN hovering over the CTA button, THE system SHALL intensify the glow and display a pulse effect
5. THE Xiading_CTA_Section SHALL include floating tech-themed decorative elements
6. THE CTA section SHALL use the brand's ctaColor (#10B981) with gradient variations

### Requirement 8: 夏鼎页脚区域设计

**User Story:** As a visitor, I want to see a footer that maintains the dark tech aesthetic, so that the brand experience is consistent throughout the page.

#### Acceptance Criteria

1. THE Xiading_Footer_Section SHALL use a dark background consistent with the overall theme
2. THE footer navigation links SHALL display subtle hover animations (underline slide or glow)
3. THE Xiading_Footer_Section SHALL include geometric decorative elements in the background
4. WHEN hovering over social media icons, THE system SHALL display a scale and glow effect
5. THE footer SHALL maintain clear visual hierarchy with proper spacing and typography
6. THE Xiading_Footer_Section SHALL include a subtle animated border or divider at the top

### Requirement 9: 响应式设计

**User Story:** As a visitor on any device, I want the Xiading homepage to adapt beautifully to my screen size, so that I have a great experience regardless of device.

#### Acceptance Criteria

1. WHEN viewport width is below 768px, THE Xiading_Hero_Section SHALL stack content vertically and simplify animations
2. WHEN viewport width is below 768px, THE horizontal scroll scene section SHALL convert to vertical card stack
3. WHEN viewport width is below 1024px, THE bento-grid feature section SHALL convert to standard 2-column grid
4. WHEN viewport width is below 768px, THE timeline case section SHALL convert to single-column layout
5. THE system SHALL reduce animation complexity on mobile devices for performance
6. ALL touch interactions SHALL have appropriate touch target sizes (minimum 44px)

### Requirement 10: 动效与性能

**User Story:** As a visitor, I want smooth animations that enhance the experience without impacting performance, so that the page feels polished and responsive.

#### Acceptance Criteria

1. THE system SHALL use CSS transforms and opacity for all animations (GPU-accelerated)
2. WHEN the user has prefers-reduced-motion enabled, THE system SHALL disable or simplify all animations
3. THE particle and geometric animations SHALL use requestAnimationFrame for smooth rendering
4. THE system SHALL lazy-load below-fold section components for faster initial load
5. WHEN animations are running, THE system SHALL maintain 60fps performance target
6. THE system SHALL use Intersection Observer for scroll-triggered animations
