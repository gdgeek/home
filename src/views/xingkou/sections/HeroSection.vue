<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  onOpenLogin: () => void
}>()

const menuOpen = ref(false)

const navItems = [
  { text: '首页', url: '#' },
  { text: '功能介绍', url: '#feature' },
  { text: '应用场景', url: '#scene' },
  { text: '客户案例', url: '#case' },
  { text: '新闻动态', url: '#news' }
]
</script>

<template>
  <!-- Header -->
  <header class="header">
    <div class="header__container">
      <div class="header__logo">
        <img src="/logo/xingkou/LOGO.webp" alt="星扣AR创作平台" class="header__logo-img" width="120" height="42" />
      </div>
      <nav class="header__nav">
        <a v-for="(item, index) in navItems" :key="index" :href="item.url" class="header__nav-link">
          {{ item.text }}
        </a>
      </nav>
      <button class="header__login-btn" @click="onOpenLogin">登录</button>
      <button
        class="header__hamburger"
        :aria-expanded="menuOpen"
        aria-label="打开菜单"
        @click="menuOpen = !menuOpen"
      >
        <span v-if="!menuOpen">☰</span>
        <span v-else>✕</span>
      </button>
    </div>
    <div v-show="menuOpen" class="header__mobile-nav">
      <a
        v-for="(item, index) in navItems"
        :key="index"
        :href="item.url"
        class="header__mobile-nav-link"
        @click="menuOpen = false"
      >
        {{ item.text }}
      </a>
    </div>
  </header>

  <!-- Hero Section -->
  <section class="hero">
    <div class="hero__container">
      <div class="hero__content">
        <h1 class="hero__title">星扣AR创作平台</h1>
        <p class="hero__subtitle">让知识"立"起来</p>
        <p class="hero__desc">专为教育场景打造的轻量化、零门槛AR创作工具，助力师生开启沉浸式教学新体验</p>
        <div class="hero__highlights">
          <span class="hero__tag">课本变立体</span>
          <span class="hero__tag">实验零风险</span>
          <span class="hero__tag">创意可落地</span>
          <span class="hero__tag">知识可互动</span>
        </div>
        <div class="hero__actions">
          <button class="btn btn--primary" @click="onOpenLogin">立即开始创作</button>
          <button class="btn btn--secondary">查看教学案例</button>
        </div>
      </div>
      <div class="hero__visual">
        <img
          src="/images/ar-platform/高中生操作AR内容，欢笑.webp"
          alt="高中生操作AR内容"
          class="hero__image"
          fetchpriority="high"
          width="500"
          height="400"
        />
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/xingkou/variables' as xk;

$primary: xk.$xingkou-primary;
$primary-light: xk.$xingkou-primary-light;
$primary-dark: xk.$xingkou-primary-dark;
$accent: xk.$xingkou-secondary;
$bg-card: xk.$xingkou-bg-card;
$text-primary: xk.$xingkou-text-primary;
$text-secondary: xk.$xingkou-text-secondary;
$text-light: xk.$xingkou-text-light;
$border-color: xk.$xingkou-border-color;
$gradient-cta: xk.$xingkou-gradient-cta;
$spacing-xs: xk.$xingkou-spacing-xs;
$spacing-sm: xk.$xingkou-spacing-sm;
$spacing-md: xk.$xingkou-spacing-md;
$spacing-lg: xk.$xingkou-spacing-lg;
$spacing-xl: xk.$xingkou-spacing-xl;
$spacing-xxl: xk.$xingkou-spacing-xxl;
$spacing-xxxl: xk.$xingkou-spacing-xxxl;
$font-family: xk.$xingkou-font-family;
$font-size-xs: xk.$xingkou-font-size-xs;
$font-size-sm: xk.$xingkou-font-size-sm;
$font-size-base: xk.$xingkou-font-size-base;
$font-size-lg: xk.$xingkou-font-size-lg;
$font-size-xl: xk.$xingkou-font-size-xl;
$font-size-xxl: xk.$xingkou-font-size-xxl;
$font-size-xxxl: xk.$xingkou-font-size-xxxl;
$font-size-hero: xk.$xingkou-font-size-hero;
$font-weight-medium: xk.$xingkou-font-weight-medium;
$font-weight-semibold: xk.$xingkou-font-weight-semibold;
$font-weight-bold: xk.$xingkou-font-weight-bold;
$border-radius-md: xk.$xingkou-border-radius-md;
$border-radius-lg: xk.$xingkou-border-radius-lg;
$border-radius-xl: xk.$xingkou-border-radius-xl;
$border-radius-full: xk.$xingkou-border-radius-full;
$shadow-lg: xk.$xingkou-shadow-lg;
$transition-fast: xk.$xingkou-transition-fast;
$transition-base: xk.$xingkou-transition-base;
$breakpoint-mobile: xk.$xingkou-breakpoint-mobile;
$breakpoint-tablet: xk.$xingkou-breakpoint-tablet;
$container-max-width: xk.$xingkou-container-max-width;
$container-padding: xk.$xingkou-container-padding;
$touch-target-min: 44px;
$line-height-relaxed: 1.75;
$ease-out: cubic-bezier(0.16, 1, 0.3, 1);

.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid $border-color;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.05);
  transition: all $transition-base;

  &:hover { box-shadow: 0 4px 30px rgba(0, 0, 0, 0.08); }

  &__container {
    max-width: $container-max-width;
    margin: 0 auto;
    padding: $spacing-md $container-padding;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__logo {
    display: flex;
    align-items: center;
    transition: transform $transition-fast;
    &:hover { transform: scale(1.02); }
  }

  &__logo-img {
    height: 42px;
    width: auto;
    object-fit: contain;
  }

  &__nav {
    display: flex;
    gap: $spacing-xl;
    @media (max-width: $breakpoint-tablet) { display: none; }
  }

  &__nav-link {
    font-size: $font-size-base;
    color: $text-secondary;
    text-decoration: none;
    transition: all $transition-fast;
    position: relative;
    padding: 4px 0;

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 0;
      height: 2px;
      background: $primary;
      transition: width $transition-base;
    }

    &:hover {
      color: $primary;
      &::after { width: 100%; }
    }
  }

  &__hamburger {
    display: none;
    background: none;
    border: none;
    font-size: 22px;
    cursor: pointer;
    color: $text-primary;
    padding: 4px 8px;
    min-height: $touch-target-min;
    min-width: $touch-target-min;
    align-items: center;
    justify-content: center;
    @media (max-width: $breakpoint-tablet) { display: flex; }
  }

  &__mobile-nav {
    display: none;
    @media (max-width: $breakpoint-tablet) {
      display: flex;
      flex-direction: column;
      background: rgba(255, 255, 255, 0.98);
      border-top: 1px solid $border-color;
      padding: $spacing-sm 0;
    }
  }

  &__mobile-nav-link {
    padding: $spacing-md $container-padding;
    font-size: $font-size-base;
    color: $text-secondary;
    text-decoration: none;
    transition: all $transition-fast;
    &:hover { color: $primary; background: rgba($primary, 0.05); }
  }

  &__login-btn {
    padding: $spacing-sm $spacing-lg;
    background: $gradient-cta;
    color: $text-light;
    border: none;
    border-radius: $border-radius-md;
    font-size: $font-size-sm;
    cursor: pointer;
    transition: all $transition-fast;
    box-shadow: 0 4px 15px rgba($primary, 0.3);
    position: relative;
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
      transition: left 0.5s;
    }

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 25px rgba($primary, 0.4);
      &::before { left: 100%; }
    }

    &:active { transform: translateY(0); }
  }
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: $spacing-md $spacing-xl;
  font-size: $font-size-base;
  font-weight: $font-weight-medium;
  border-radius: $border-radius-md;
  border: none;
  cursor: pointer;
  transition: all $transition-base $ease-out;
  min-height: $touch-target-min;
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.2);
    transform: translate(-50%, -50%);
    transition: width 0.6s, height 0.6s;
  }

  &:active::after { width: 300px; height: 300px; }

  &--primary {
    background: $gradient-cta;
    color: $text-light;
    box-shadow: 0 4px 20px rgba($primary, 0.3);

    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 8px 30px rgba($primary, 0.4);
    }

    &:active { transform: translateY(-1px); }
  }

  &--secondary {
    background: $bg-card;
    color: $primary;
    border: 2px solid $primary;
    position: relative;
    z-index: 1;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 0;
      height: 100%;
      background: $gradient-cta;
      transition: width 0.3s ease;
      z-index: -1;
    }

    &:hover {
      color: $text-light;
      &::before { width: 100%; }
      transform: translateY(-2px);
      box-shadow: 0 4px 15px rgba($primary, 0.2);
    }
  }
}

.hero {
  padding: calc($spacing-xxxl + 80px) 0 $spacing-xxxl;
  background: linear-gradient(180deg, #F8FAFC 0%, #E0F2FE 40%, #DBEAFE 100%);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba($primary, 0.05) 0%, transparent 70%);
    animation: float 20s ease-in-out infinite;
  }

  &__container {
    max-width: $container-max-width;
    margin: 0 auto;
    padding: 0 $container-padding;
    display: flex;
    align-items: center;
    gap: $spacing-xxxl;
    position: relative;
    z-index: 1;

    @media (max-width: $breakpoint-tablet) {
      flex-direction: column;
      text-align: center;
    }
  }

  &__content {
    flex: 1;
    animation: slideInLeft 0.8s ease-out;
  }

  &__title {
    font-size: $font-size-hero;
    font-weight: $font-weight-bold;
    color: $text-primary;  // 使用深蓝色而不是渐变
    margin-bottom: $spacing-sm;
    line-height: 1.2;

    @media (max-width: $breakpoint-mobile) { font-size: $font-size-xxxl; }
  }

  &__subtitle {
    font-size: $font-size-xxl;
    color: $text-primary;
    margin-bottom: $spacing-lg;
    font-weight: $font-weight-semibold;
  }

  &__desc {
    font-size: $font-size-lg;
    color: $text-secondary;
    line-height: $line-height-relaxed;
    margin-bottom: $spacing-xl;
  }

  &__highlights {
    display: flex;
    flex-wrap: wrap;
    gap: $spacing-sm;
    margin-bottom: $spacing-xl;

    @media (max-width: $breakpoint-tablet) { justify-content: center; }
  }

  &__tag {
    padding: $spacing-xs $spacing-md;
    background: rgba($primary, 0.08);
    color: $primary-dark;
    border-radius: $border-radius-full;
    font-size: $font-size-sm;
    border: 1px solid rgba($primary, 0.2);
    transition: all $transition-fast;

    &:hover {
      background: rgba($primary, 0.15);
      transform: translateY(-2px);
      box-shadow: 0 2px 8px rgba($primary, 0.15);
    }
  }

  &__actions {
    display: flex;
    gap: $spacing-md;

    @media (max-width: $breakpoint-tablet) { justify-content: center; }
    @media (max-width: $breakpoint-mobile) { flex-direction: column; }
  }

  &__visual {
    flex: 1;
    max-width: 500px;
    animation: slideInRight 0.8s ease-out 0.2s both;
    position: relative;
  }

  &__image {
    width: 100%;
    border-radius: $border-radius-xl;
    box-shadow: $shadow-lg;
    transition: all $transition-base;
    position: relative;
    z-index: 2;

    &:hover {
      transform: scale(1.02) rotate(1deg);
      box-shadow: 0 20px 50px rgba($primary, 0.2);
    }
  }

  &__visual::before {
    content: '';
    position: absolute;
    top: -20px;
    right: -20px;
    width: 100%;
    height: 100%;
    background: $gradient-cta;
    border-radius: $border-radius-xl;
    z-index: 1;
    opacity: 0.3;
    filter: blur(30px);
  }
}

@keyframes float {
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  25% { transform: translate(2%, 2%) rotate(1deg); }
  50% { transform: translate(0, 4%) rotate(0deg); }
  75% { transform: translate(-2%, 2%) rotate(-1deg); }
}

@keyframes slideInLeft {
  from { opacity: 0; transform: translateX(-50px); }
  to { opacity: 1; transform: translateX(0); }
}

@keyframes slideInRight {
  from { opacity: 0; transform: translateX(50px); }
  to { opacity: 1; transform: translateX(0); }
}
</style>
