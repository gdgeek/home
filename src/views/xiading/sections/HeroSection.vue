<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  navScrolled: boolean
  onOpenLogin: () => void
}>()

const menuOpen = ref(false)

const navItems = [
  { text: '功能', url: '#features' },
  { text: '場景', url: '#scenes' },
  { text: '案例', url: '#cases' },
  { text: '動態', url: '#news' }
]

const stats = [
  { number: '50+', label: '澳門學校' },
  { number: '1萬+', label: '師生用戶' },
  { number: '10萬+', label: 'AR作品' }
]
</script>

<template>
  <!-- 導航 -->
  <header class="xd-nav" :class="{ 'xd-nav--scrolled': navScrolled }">
    <div class="xd-nav__inner">
      <a href="#" class="xd-nav__logo">
        <img src="/logo/xiading/bar.webp" alt="夏鼎科技" width="120" height="26" />
      </a>
      <nav class="xd-nav__links" aria-label="主導航">
        <a v-for="item in navItems" :key="item.text" :href="item.url">{{ item.text }}</a>
      </nav>
      <div class="xd-nav__actions">
        <button class="xd-btn xd-btn--ghost" @click="onOpenLogin">登錄</button>
        <button class="xd-btn xd-btn--primary" @click="onOpenLogin">開始創作</button>
        <button
          class="xd-nav__hamburger"
          :aria-expanded="menuOpen"
          aria-label="打開菜單"
          @click="menuOpen = !menuOpen"
        >
          <span v-if="!menuOpen">☰</span>
          <span v-else>✕</span>
        </button>
      </div>
    </div>
    <div v-show="menuOpen" class="xd-nav__mobile-menu">
      <a
        v-for="item in navItems"
        :key="item.text"
        :href="item.url"
        class="xd-nav__mobile-link"
        @click="menuOpen = false"
      >{{ item.text }}</a>
    </div>
  </header>

  <!-- Hero：全寬圖片 + 居中文字 -->
  <section class="xd-hero">
    <div class="xd-hero__bg">
      <img
        src="/images/ar-platform/高中生操作AR内容，欢笑.webp"
        alt="科技教育背景"
        fetchpriority="high"
        width="1920"
        height="1080"
      />
      <div class="xd-hero__overlay"></div>
    </div>
    <div class="xd-hero__content reveal">
      <div class="xd-hero__badge">
        <span class="xd-hero__badge-dot"></span>
        澳門人工智能AR教育科技平台
      </div>
      <h1 class="xd-hero__title">
        <span class="xd-hero__title-line1">讓知識</span>
        <span class="xd-hero__title-accent">融入現實</span>
      </h1>
      <p class="xd-hero__desc">零門檻AI/AR創作工具，助力師生開啟沉浸式教學體驗</p>
      <div class="xd-hero__cta">
        <button class="xd-btn xd-btn--white xd-btn--lg" @click="onOpenLogin">
          免費試用
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </button>
        <button class="xd-btn xd-btn--ghost-light xd-btn--lg">觀看演示</button>
      </div>
      <div class="xd-hero__stats">
        <div v-for="s in stats" :key="s.label" class="xd-hero__stat">
          <span class="xd-hero__stat-num">{{ s.number }}</span>
          <span class="xd-hero__stat-label">{{ s.label }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/xiading/variables' as xd;

$steel: xd.$xiading-primary;
$steel-light: xd.$xiading-primary-light;
$steel-pale: xd.$xiading-primary-pale;
$steel-wash: xd.$xiading-primary-wash;
$accent: xd.$xiading-accent;
$bg: xd.$xiading-bg-primary;
$text-muted: xd.$xiading-text-muted;
$border: xd.$xiading-border-color;
$r: xd.$xiading-border-radius-lg;
$r-sm: xd.$xiading-border-radius-sm;
$max-w: xd.$xiading-container-max-width;
$ease: xd.$xiading-ease-out;

@keyframes softPulse {
  0%, 100% { opacity: 0.4; transform: scale(1); }
  50% { opacity: 0.7; transform: scale(1.08); }
}

.reveal {
  opacity: 0;
  transform: translateY(28px);
  transition: opacity 0.7s $ease, transform 0.7s $ease;
  &.revealed { opacity: 1; transform: translateY(0); }
}

// ═══════════════════════════════════════
// 導航
// ═══════════════════════════════════════
.xd-nav {
  position: fixed; top: 12px; left: 16px; right: 16px; z-index: 100;
  padding: 12px 0;
  background: rgba(255,255,255,0.6);
  backdrop-filter: blur(24px) saturate(140%);
  border: 1px solid rgba($steel, 0.08);
  border-radius: 14px;
  transition: all 0.3s $ease;

  &--scrolled {
    top: 8px;
    background: rgba(255,255,255,0.88);
    box-shadow: 0 4px 24px rgba($steel, 0.06);
  }

  &__inner { max-width: $max-w; margin: 0 auto; padding: 0 24px; display: flex; align-items: center; justify-content: space-between; }
  &__logo img { height: 26px; }

  &__links {
    display: flex; gap: 36px;
    a {
      color: $text-muted; text-decoration: none; font-size: 14px; font-weight: 500;
      transition: color 0.25s; position: relative;
      &::after { content: ''; position: absolute; bottom: -5px; left: 50%; width: 0; height: 2px; background: $steel; border-radius: 1px; transition: all 0.25s $ease; transform: translateX(-50%); }
      &:hover { color: $steel; &::after { width: 100%; } }
    }
    @media (max-width: 768px) { display: none; }
  }
  &__actions { display: flex; gap: 8px; }

  &__hamburger {
    display: none;
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
    color: $text-muted;
    padding: 4px 8px;
    min-height: 44px;
    min-width: 44px;
    align-items: center;
    justify-content: center;
    @media (max-width: 768px) { display: flex; }
  }

  &__mobile-menu {
    display: none;
    @media (max-width: 768px) {
      display: flex;
      flex-direction: column;
      padding: 8px 24px 16px;
      border-top: 1px solid rgba($steel, 0.1);
    }
  }

  &__mobile-link {
    padding: 12px 0;
    color: $text-muted;
    text-decoration: none;
    font-size: 14px;
    font-weight: 500;
    border-bottom: 1px solid rgba($steel, 0.06);
    transition: color 0.25s;
    &:hover { color: $steel; }
    &:last-child { border-bottom: none; }
  }
}

// ═══════════════════════════════════════
// 按鈕
// ═══════════════════════════════════════
.xd-btn {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 10px 22px; font-family: inherit; font-size: 14px; font-weight: 500;
  border-radius: $r-sm; border: none; cursor: pointer;
  transition: all 0.25s $ease;
  svg { width: 16px; height: 16px; }

  &--primary { background: $steel; color: white; box-shadow: 0 2px 14px rgba($steel, 0.25);
    &:hover { background: $steel-light; transform: translateY(-1px); box-shadow: 0 4px 22px rgba($steel, 0.3); } }
  &--ghost { background: transparent; color: $text-muted;
    &:hover { color: $steel; background: rgba($steel, 0.06); } }
  &--white { background: white; color: $steel; font-weight: 700; box-shadow: 0 4px 16px rgba(0,0,0,0.08);
    &:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(0,0,0,0.12); } }
  &--ghost-light { background: rgba(255,255,255,0.15); color: rgba(255,255,255,0.9); border: 1px solid rgba(255,255,255,0.3);
    &:hover { background: rgba(255,255,255,0.3); color: white; } }
  &--lg { padding: 14px 30px; font-size: 15px; border-radius: 12px; }
}

// ═══════════════════════════════════════
// Hero
// ═══════════════════════════════════════
.xd-hero {
  position: relative; z-index: 1;
  min-height: 92vh;
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  text-align: center;
  overflow: hidden;

  &__bg {
    position: absolute; inset: 0;
    img { width: 100%; height: 100%; object-fit: cover; }
    &::after {
      content: ''; position: absolute; bottom: 0; left: 0; right: 0;
      height: 120px;
      background: linear-gradient(to bottom, transparent, $bg);
    }
  }

  &__overlay {
    position: absolute; inset: 0;
    background:
      linear-gradient(180deg, rgba(#0a1628, 0.15) 0%, rgba(#0a1628, 0.45) 40%, rgba(#0a1628, 0.7) 70%, rgba(#0a1628, 0.88) 100%);
  }

  &__content {
    position: relative; z-index: 2;
    padding: 120px 24px 48px;
    max-width: 680px;
  }

  &__badge {
    display: inline-flex; align-items: center; gap: 10px;
    padding: 6px 16px; background: rgba(255,255,255,0.1);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255,255,255,0.2);
    border-radius: 100px; font-size: 12px; font-weight: 500; color: rgba(255,255,255,0.85);
    margin-bottom: 24px;
  }
  &__badge-dot { width: 7px; height: 7px; background: $steel-pale; border-radius: 50%; box-shadow: 0 0 8px rgba($steel-pale, 0.6); animation: softPulse 2.5s infinite; }

  &__title { margin-bottom: 18px; }
  &__title-line1 {
    display: block;
    font-family: 'Zen Kaku Gothic New', sans-serif;
    font-size: clamp(14px, 2vw, 18px); font-weight: 300;
    color: rgba(255,255,255,0.5); letter-spacing: 0.25em;
  }
  &__title-accent {
    display: block;
    font-family: 'Zen Kaku Gothic New', sans-serif;
    font-size: clamp(52px, 11vw, 96px); font-weight: 900;
    letter-spacing: -0.05em; line-height: 1;
    color: white;
    text-shadow: 0 4px 40px rgba($steel, 0.3);
  }

  &__desc {
    font-size: 16px; font-weight: 300; color: rgba(255,255,255,0.6);
    line-height: 1.8; margin-bottom: 28px;
  }

  &__cta {
    display: flex; gap: 14px; justify-content: center;
    @media (max-width: 480px) { flex-direction: column; align-items: center; }
  }

  &__stats {
    position: relative; z-index: 2;
    display: flex; justify-content: center; gap: 1px;
    width: 100%; max-width: 480px;
    margin: 32px auto 0;
  }

  &__stat {
    flex: 1; text-align: center;
    padding: 16px 12px;
    background: rgba(255,255,255,0.08);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255,255,255,0.1);
    &:first-child { border-radius: $r 0 0 $r; }
    &:last-child { border-radius: 0 $r $r 0; }
  }

  &__stat-num {
    display: block;
    font-family: 'Zen Kaku Gothic New', sans-serif;
    font-size: 26px; font-weight: 900; color: white;
    letter-spacing: -0.03em;
  }
  &__stat-label { font-size: 11px; color: rgba(255,255,255,0.45); font-weight: 300; margin-top: 2px; }
}

@media (prefers-reduced-motion: reduce) {
  .reveal { transition: opacity 0.3s ease; transform: none; }
  .reveal.revealed { transform: none; }
}
</style>
