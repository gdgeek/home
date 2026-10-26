<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

defineProps<{ navScrolled: boolean }>()
const emit = defineEmits<{ 'open-login': [] }>()
const mobileMenuOpen = ref(false)
const header = ref<HTMLElement | null>(null)

function toggleMobileMenu() { mobileMenuOpen.value = !mobileMenuOpen.value }
function openLogin() {
  mobileMenuOpen.value = false
  emit('open-login')
}
function handleClickOutside(event: MouseEvent) {
  if (header.value && !event.composedPath().includes(header.value)) mobileMenuOpen.value = false
}
function handleEscape(event: KeyboardEvent) {
  if (event.key === 'Escape') mobileMenuOpen.value = false
}
onMounted(() => {
  window.addEventListener('click', handleClickOutside)
  window.addEventListener('keydown', handleEscape)
})
onUnmounted(() => {
  window.removeEventListener('click', handleClickOutside)
  window.removeEventListener('keydown', handleEscape)
})

const navItems = [
  { text: '功能', url: '#features' },
  { text: '場景', url: '#scenes' },
  { text: '合作', url: '#cases' }
]

const stats = [
  { number: '3+', label: '合作院校機構' },
  { number: '3所', label: '高校教研共創' },
  { number: '2026', label: '全澳AR創作比賽' }
]

// Hero 背景图片
const heroImages = [
  '/images/ar-platform/澳门AR.webp', // 澳門 AR 教育場景
]

</script>

<template>
    <!-- 導航 -->
    <header ref="header" class="xd-nav" :class="{ 'xd-nav--scrolled': navScrolled }">
      <div class="xd-nav__inner">
        <a href="#top" class="xd-nav__logo">
          <img src="/logo/xiading/bar.webp" alt="夏鼎科技" />
        </a>
        <nav class="xd-nav__links" aria-label="主導航">
          <a v-for="item in navItems" :key="item.text" :href="item.url">{{ item.text }}</a>
        </nav>
        <div class="xd-nav__actions">
          <button class="xd-btn xd-btn--primary" @click="openLogin">開始創作</button>
          <button class="xd-nav__hamburger" @click="toggleMobileMenu" aria-label="切換選單" :aria-expanded="mobileMenuOpen" aria-controls="xiading-legacy-menu">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
      <!-- 移動端選單 -->
      <Transition name="mobile-menu">
        <div v-if="mobileMenuOpen" id="xiading-legacy-menu" class="xd-nav__mobile">
          <nav class="xd-nav__mobile-links">
            <a v-for="item in navItems" :key="item.url" :href="item.url" @click="mobileMenuOpen = false">{{ item.text }}</a>
          </nav>
          <div class="xd-nav__mobile-actions">
            <button class="xd-btn xd-btn--primary xd-btn--block" @click="openLogin">開始創作</button>
          </div>
        </div>
      </Transition>
    </header>

    <!-- Hero：雙層圖片 + 居中文字 -->
    <section id="top" class="xd-hero">
      <div class="xd-hero__bg">
        <img :src="heroImages[0]" alt="澳門 AR 教育場景" />
        <div class="xd-hero__overlay"></div>
      </div>
      <div class="xd-hero__content reveal">
        <div class="xd-hero__badge">
          <span class="xd-hero__badge-dot"></span>
          澳門本土研發 · 低代碼/零代碼AI+AR創作平台
        </div>
        <h1 class="xd-hero__title">
          <span class="xd-hero__title-line1">讓知識</span>
          <span class="xd-hero__title-accent">融入現實</span>
        </h1>
        <p class="xd-hero__desc">澳門本土研發，低代碼/零代碼AI+AR創作平台，配套人工智能課程套件，助力師生開啟沉浸式教學體驗</p>
        <div class="xd-hero__cta">
          <button class="xd-btn xd-btn--white xd-btn--lg" @click="openLogin">
            免費試用
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
          <button class="xd-btn xd-btn--ghost-light xd-btn--lg">觀看演示</button>
        </div>
        <!-- 數據條內嵌 -->
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
$steel: #4A6FA5;
$steel-light: #6B8FC5;
$steel-pale: #9BB8D8;
$steel-wash: #D4E3F3;
$ice: #E8F1FA;
$accent: #3B5998;

$bg: #F6F9FD;
$bg-alt: #EDF2F9;
$card: #FFFFFF;

$text-dark: #1A2B42;
$text-body: #4A5E78;
$text-muted: #8298B2;
$text-faint: #B0C4D8;

$border: rgba(74, 111, 165, 0.1);
$border-hover: rgba(74, 111, 165, 0.25);
$shadow-s: 0 2px 12px rgba(74, 111, 165, 0.06);
$shadow-m: 0 4px 24px rgba(74, 111, 165, 0.08);
$shadow-l: 0 12px 40px rgba(74, 111, 165, 0.12);

$r: 18px;
$r-sm: 10px;
$max-w: 1200px;
$ease: cubic-bezier(0.22, 1, 0.36, 1);

.reveal {
  opacity: 0; transform: translateY(28px);
  transition: opacity 0.7s $ease, transform 0.7s $ease;
  &.revealed { opacity: 1; transform: translateY(0); }
}
@keyframes softPulse {
  0%, 100% { opacity: 0.4; transform: scale(1); }
  50% { opacity: 0.7; transform: scale(1.08); }
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
  &__actions { display: flex; gap: 8px; align-items: center; }

  &__hamburger {
    display: none; flex-direction: column; gap: 4px; padding: 8px; background: transparent; border: none; cursor: pointer;
    @media (max-width: 768px) { display: flex; }
    span { width: 20px; height: 2px; background: $text-dark; border-radius: 2px; transition: all 0.3s $ease; }
  }

  &__mobile {
    position: absolute; top: 100%; left: 0; right: 0; margin-top: 8px;
    background: rgba(255,255,255,0.95); backdrop-filter: blur(24px);
    border: 1px solid rgba($steel, 0.08); border-radius: 14px;
    padding: 16px; box-shadow: 0 8px 32px rgba($steel, 0.12);

    &-links {
      display: flex; flex-direction: column; gap: 4px; margin-bottom: 16px;
      a {
        display: block; padding: 12px 16px; color: $text-dark; text-decoration: none; font-size: 15px; font-weight: 500;
        border-radius: 8px; transition: all 0.2s;
        &:hover { background: rgba($steel, 0.08); color: $steel; }
      }
    }

    &-actions {
      display: flex; flex-direction: column; gap: 8px;
    }
  }
}

.mobile-menu-enter-active, .mobile-menu-leave-active {
  transition: all 0.3s $ease;
}
.mobile-menu-enter-from, .mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.xd-btn {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 10px 22px; font-family: inherit; font-size: 14px; font-weight: 500;
  border-radius: $r-sm; border: none; cursor: pointer;
  transition: all 0.25s $ease;
  svg { width: 16px; height: 16px; }

  &--primary { background: $steel; color: white; box-shadow: 0 2px 14px rgba($steel, 0.25);
    &:hover { background: $steel-light; transform: translateY(-1px); box-shadow: 0 6px 24px rgba($steel, 0.3); } }
  &--ghost { background: transparent; color: $text-muted;
    &:hover { color: $steel; background: rgba($steel, 0.06); } }
  &--outline { background: transparent; color: $text-body; border: 1.5px solid $border;
    &:hover { border-color: $steel; color: $steel; } }
  &--white { background: white; color: $steel; font-weight: 700; box-shadow: 0 4px 16px rgba(0,0,0,0.08);
    &:hover { transform: translateY(-2px); box-shadow: 0 8px 32px rgba(0,0,0,0.14); } }
  &--ghost-light { background: rgba(255,255,255,0.12); color: rgba(255,255,255,0.9); border: 1px solid rgba(255,255,255,0.25);
    &:hover { background: rgba(255,255,255,0.25); color: white; } }
  &--lg { padding: 14px 30px; font-size: 15px; border-radius: 12px; }
  &--block { width: 100%; justify-content: center; }
}

// ═══════════════════════════════════════
// Hero：全寬圖片 + 居中覆蓋
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
      linear-gradient(180deg, rgba(#0a1628, 0.1) 0%, rgba(#0a1628, 0.4) 35%, rgba(#0a1628, 0.68) 65%, rgba(#0a1628, 0.88) 100%);
  }

  &__content {
    position: relative; z-index: 2;
    padding: 140px 24px 56px;
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

  // 數據條：內嵌在content裡
  &__stats {
    position: relative; z-index: 2;
    display: flex; justify-content: center; gap: 1px;
    width: 100%; max-width: 520px;
    margin: 40px auto 0;
  }

  &__stat {
    flex: 1; text-align: center;
    padding: 18px 14px;
    background: rgba(255,255,255,0.06);
    backdrop-filter: blur(16px);
    border: 1px solid rgba(255,255,255,0.08);
    transition: background 0.3s $ease;
    &:first-child { border-radius: $r 0 0 $r; }
    &:last-child { border-radius: 0 $r $r 0; }
    &:hover { background: rgba(255,255,255,0.1); }
  }

  &__stat-num {
    display: block;
    font-family: 'Zen Kaku Gothic New', sans-serif;
    font-size: 28px; font-weight: 900; color: white;
    letter-spacing: -0.03em;
  }
  &__stat-label { font-size: 12px; color: rgba(255,255,255,0.5); font-weight: 300; margin-top: 4px; display: block; }
}

@media (prefers-reduced-motion: reduce) {
  .reveal { transition: none; transform: none; }
  .xd-hero__badge-dot { animation: none; }
}
</style>
