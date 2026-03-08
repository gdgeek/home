# 星扣品牌样式锚点

**创建时间**: 2026-03-08  
**Git提交**: 0adb94b (fix: migrate CI/CD and Dockerfile from npm to pnpm)  
**状态**: 🔒 已锁定 - 与线上版本一致

## 概述

此文档记录星扣品牌的官方样式配置，作为样式恢复的锚点。星扣品牌采用专业蓝色风格，源自旧版夏鼎的配色方案。

## 核心配色方案

### 主色调 - 专业蓝色系
```scss
$xingkou-primary: #4A6FA5;        // 鋼藍主色
$xingkou-primary-light: #6B8FC5;  // 亮鋼藍
$xingkou-primary-dark: #3B5998;   // 深藍
$xingkou-secondary: #9BB8D8;      // 淡鋼藍
$xingkou-accent: #D4E3F3;         // 極淡鋼藍
```

### 背景色 - 浅色冰白系
```scss
$xingkou-bg-primary: #F6F9FD;     // 主背景（帶藍調冰白）
$xingkou-bg-secondary: #EDF2F9;   // 次背景
$xingkou-bg-card: #FFFFFF;        // 卡片白
$xingkou-bg-dark: #4A6FA5;        // 深色背景（footer）
```

### 文字颜色
```scss
$xingkou-text-primary: #1A2B42;   // 主文字
$xingkou-text-secondary: #4A5E78; // 次文字
$xingkou-text-muted: #8298B2;     // 輔助文字
$xingkou-text-light: #FFFFFF;     // 浅色文字
```

### 渐变
```scss
$xingkou-gradient-hero: linear-gradient(180deg, #F6F9FD 0%, #FFFFFF 100%);
$xingkou-gradient-cta: linear-gradient(135deg, #4A6FA5 0%, #6B8FC5 50%, #9BB8D8 100%);
$xingkou-gradient-card: linear-gradient(135deg, #FFFFFF 0%, #F6F9FD 100%);
```

### 阴影
```scss
$xingkou-shadow-sm: 0 2px 12px rgba(74, 111, 165, 0.06);
$xingkou-shadow-md: 0 4px 20px rgba(74, 111, 165, 0.08);
$xingkou-shadow-lg: 0 8px 32px rgba(74, 111, 165, 0.12);
```

### 边框
```scss
$xingkou-border-color: rgba(74, 111, 165, 0.1);
```

## 布局参数

```scss
$xingkou-container-max-width: 1200px;  // 容器最大宽度
$xingkou-container-padding: 20px;      // 容器内边距
```

## 关键文件列表

### 样式文件
- `src/assets/styles/xingkou/_variables.scss` - 品牌变量定义

### 视图组件
- `src/views/xingkou/XingkouHomePage.vue` - 主页面
- `src/views/xingkou/sections/HeroSection.vue` - Hero区域
- `src/views/xingkou/sections/FeaturesSection.vue` - 功能介绍
- `src/views/xingkou/sections/ScenesSection.vue` - 应用场景
- `src/views/xingkou/sections/NewsSection.vue` - 新闻动态
- `src/views/xingkou/sections/CTASection.vue` - CTA区域
- `src/views/xingkou/sections/FooterSection.vue` - 页脚

## 恢复方法

如果星扣样式被意外修改，使用以下命令恢复到此锚点版本：

```bash
# 恢复所有星扣相关文件到锚点版本
git checkout 0adb94b -- src/assets/styles/xingkou/ src/views/xingkou/
```

或者手动恢复关键配色变量（参考上方"核心配色方案"部分）。

## 设计理念

星扣品牌定位为教育AR创作平台，面向大陆市场：
- **专业感**: 使用深蓝色系传达专业、可信赖的形象
- **简洁性**: 清爽的白色背景，避免过度装饰
- **稳重感**: 相比浅蓝色系更加沉稳，适合教育场景

## 品牌隔离

星扣品牌与其他品牌完全隔离：
- **夏鼎 (xiading)**: 日系淡蓝风格，面向澳门市场
- **XR UGC (xrugc)**: 深色青蓝风格，面向国际市场

修改星扣样式不会影响其他品牌。

## 变更历史

| 日期 | 提交 | 说明 |
|------|------|------|
| 2026-03-08 | 0adb94b | 锁定当前版本作为官方样式 |
| 2026-02-05 | ffd9c33 | 创建星扣品牌，采用旧版夏鼎风格 |

## 注意事项

⚠️ **重要**: 
1. 星扣品牌样式已与线上版本对齐，请勿随意修改
2. 如需更新样式，请先在此文档中记录变更原因
3. 更新后需同步更新此锚点文档的版本信息
4. 保持与其他品牌（夏鼎、XR UGC）的样式隔离

---

**最后更新**: 2026-03-08  
**维护者**: 开发团队
