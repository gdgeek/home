# XRUGC 品牌样式锁定文档

**品牌**: XR UGC (国际版)  
**目标市场**: 全球市场  
**语言**: 英语为主，支持多语言（简中、繁中、日语、泰语）  
**锁定时间**: 2025-03-08  
**锁定版本**: f0b4056

## 设计风格

- **主题**: 深色科技风 + 赛博朋克
- **字体**: Inter (无衬线，现代科技感)
- **配色**: 深色青蓝 #0EA5E9 + 深色背景
- **布局**: 现代化网格布局，强调科技感

## 核心配色方案

```scss
// 主色调
$v: #0EA5E9;        // 主色 - 青蓝色
$vl: #38BDF8;       // 主色浅色
$o: #1B2E5A;        // 辅助色 - 深蓝
$ol: #2A4175;       // 辅助色浅色

// 背景色
$bg: #0A0F1A;       // 主背景 - 深色
$bg2: #111827;      // 次背景
$bgc: #152033;      // 卡片背景
$bge: #1A2744;      // 强调背景

// 文字色
$t1: #F8FAFC;       // 主文字 - 白色
$t2: #CBD5E1;       // 次文字
$tm: #94A3B8;       // 中性文字
$tf: #64748B;       // 淡文字

// 边框与阴影
$bd: rgba(14,165,233,0.12);   // 边框
$bdh: rgba(14,165,233,0.3);   // 边框悬停
$sl: 0 12px 40px rgba(14,165,233,0.15);  // 阴影

// 圆角与尺寸
$r: 16px;           // 圆角
$rs: 8px;           // 小圆角
$mw: 1200px;        // 最大宽度
$e: cubic-bezier(0.22,1,0.36,1);  // 缓动函数
```

## 组件结构

XRUGC 品牌采用组件化架构：

```
src/views/xrugc/
├── XrugcHomePage.vue          # 主页面（容器）
└── sections/
    ├── HeroSection.vue        # 英雄区 + 导航
    ├── FeaturesSection.vue    # 功能展示
    ├── ScenesSection.vue      # 应用场景
    ├── CasesSection.vue       # 案例展示
    ├── NewsSection.vue        # 新闻动态
    ├── CTASection.vue         # 行动号召
    └── FooterSection.vue      # 页脚
```

## 关键特性

1. **深色主题**: 深色背景 + 青蓝色强调
2. **科技感**: 网格背景动画 + 光晕效果
3. **国际化**: 支持5种语言切换
4. **响应式**: 完整的移动端适配
5. **动画**: 滚动触发的渐入动画

## 文件位置

- 样式变量: `src/assets/styles/xrugc/_variables.scss`
- 主页面: `src/views/xrugc/XrugcHomePage.vue`
- 组件: `src/views/xrugc/sections/*.vue`
- Logo: `/logo/XRUGC/xrugc_logo.png`

## Git 恢复命令

如果样式被意外修改，使用以下命令恢复：

```bash
# 恢复 XRUGC 样式文件
git checkout f0b4056 -- src/assets/styles/xrugc/

# 恢复 XRUGC 视图文件
git checkout f0b4056 -- src/views/xrugc/

# 或者恢复整个 XRUGC 品牌
git checkout f0b4056 -- src/assets/styles/xrugc/ src/views/xrugc/
```

## 注意事项

⚠️ **品牌隔离**: XRUGC 的样式完全独立，不应影响其他品牌（星扣、夏鼎）
⚠️ **组件化**: 主页面只是容器，所有内容在 sections 组件中
⚠️ **深色主题**: 所有颜色都基于深色背景设计，不要使用浅色背景
⚠️ **国际化**: 所有文本通过 i18n 系统管理，不要硬编码文本

## 最后修复

**日期**: 2025-03-08  
**问题**: XrugcHomePage.vue 文件结构错误（`<style>` 在 `<script>` 内部）  
**解决**: 重构为正确的 Vue 3 组件结构，使用 sections 组件化架构  
**状态**: ✅ 已修复，无诊断错误
