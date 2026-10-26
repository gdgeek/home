<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { useBrand } from '@/composables/useBrand'
import XiadingBrandLockup from '../components/XiadingBrandLockup.vue'

defineProps<{ navScrolled: boolean }>()
const emit = defineEmits<{ 'open-login': [] }>()
const { hero } = useBrand()
const menuOpen = ref(false)
const header = ref<HTMLElement | null>(null)
const menuToggle = ref<HTMLButtonElement | null>(null)

const navItems = [
  { text: '聯合品牌', url: '#partnership' },
  { text: '功能', url: '#features' },
  { text: '場景', url: '#scenes' },
  { text: '教育實踐', url: '#cases' },
]
const stats = [
  { number: '3+', label: '合作院校機構' },
  { number: '3所', label: '高校教研共創' },
  { number: '2026', label: '全澳AR創作比賽' },
]

function openLogin() {
  menuOpen.value = false
  emit('open-login')
}
function handleOutsideClick(event: MouseEvent) {
  if (header.value && !event.composedPath().includes(header.value)) menuOpen.value = false
}
function handleEscape(event: KeyboardEvent) {
  if (event.key === 'Escape' && menuOpen.value) {
    menuOpen.value = false
    menuToggle.value?.focus()
  }
}
onMounted(() => {
  window.addEventListener('click', handleOutsideClick)
  window.addEventListener('keydown', handleEscape)
})
onUnmounted(() => {
  window.removeEventListener('click', handleOutsideClick)
  window.removeEventListener('keydown', handleEscape)
})
</script>

<template>
  <header ref="header" class="xd-nav" :class="{ 'xd-nav--scrolled': navScrolled }">
    <div class="xd-nav__inner">
      <a href="#top" class="xd-nav__logo" aria-label="夏鼎 × Rokid 首頁">
        <XiadingBrandLockup />
      </a>
      <nav class="xd-nav__links" aria-label="主導航">
        <a v-for="item in navItems" :key="item.url" :href="item.url">{{ item.text }}</a>
      </nav>
      <div class="xd-nav__actions">
        <button class="xd-nav__start" @click="openLogin">{{ hero.primaryButtonText }}</button>
        <button
          ref="menuToggle"
          class="xd-nav__hamburger"
          aria-controls="xiading-mobile-menu"
          :aria-expanded="menuOpen"
          :aria-label="menuOpen ? '關閉選單' : '開啟選單'"
          @click="menuOpen = !menuOpen"
        >
          <svg v-if="menuOpen" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="m6 6 12 12M6 18 18 6" /></svg>
          <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16" /></svg>
        </button>
      </div>
    </div>
    <nav v-if="menuOpen" id="xiading-mobile-menu" class="xd-nav__mobile" aria-label="行動版導航">
      <a v-for="item in navItems" :key="item.url" :href="item.url" @click="menuOpen = false">{{ item.text }}</a>
      <button class="xd-nav__start" @click="openLogin">{{ hero.primaryButtonText }}</button>
    </nav>
  </header>

  <section id="top" class="xd-hero" aria-labelledby="xiading-hero-title">
    <div class="xd-hero__bg" aria-hidden="true">
      <img src="/images/ar-platform/澳门AR.webp" alt="" fetchpriority="high" />
    </div>
    <div class="xd-hero__inner">
      <div class="xd-hero__content">
        <div class="xd-hero__identity">
          <XiadingBrandLockup size="large" inverse />
          <span>AI/AR 教育聯合品牌</span>
        </div>
        <p class="xd-hero__eyebrow">澳門教育場景 · AI + AR</p>
        <h1 id="xiading-hero-title" class="xd-hero__title">
          <span>讓知識</span>
          <strong>融入現實。</strong>
        </h1>
        <p class="xd-hero__desc">{{ hero.subtitle }}</p>
        <div class="xd-hero__actions">
          <button class="xd-hero__primary" @click="openLogin">
            {{ hero.primaryButtonText }}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6" /></svg>
          </button>
          <a class="xd-hero__secondary" href="#partnership">{{ hero.secondaryButtonText }} <span aria-hidden="true">↗</span></a>
        </div>
        <dl class="xd-hero__stats">
          <div v-for="stat in stats" :key="stat.label">
            <dt>{{ stat.label }}</dt>
            <dd>{{ stat.number }}</dd>
          </div>
        </dl>
      </div>
    </div>
    <a class="xd-hero__scroll" href="#partnership">探索聯合品牌 <span aria-hidden="true">↓</span></a>
  </section>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/xiading/variables' as xd;

.xd-nav {
  position: fixed; top: 16px; left: 24px; right: 24px; z-index: 100;
  padding: 14px 0; border: 1px solid rgba(255, 255, 255, 0.5); border-radius: 14px;
  background: rgba(255, 255, 255, 0.94); backdrop-filter: blur(20px);
  transition: box-shadow 0.25s, background 0.25s;
  &--scrolled { background: rgba(255, 255, 255, 0.98); box-shadow: xd.$xiading-shadow-card; }
  &__inner {
    max-width: xd.$xiading-container-max-width; margin: auto; padding: 0 24px;
    display: flex; align-items: center; justify-content: space-between; gap: 24px;
  }
  &__logo { display: inline-flex; text-decoration: none; }
  &__links { display: flex; align-items: center; gap: 28px; }
  a { color: xd.$xiading-text-secondary; text-decoration: none; }
  &__links a { font-size: 14px; font-weight: 500; transition: color 0.2s; }
  &__links a:hover { color: xd.$xiading-primary; }
  &__actions { display: flex; align-items: center; gap: 8px; }
  &__start {
    border: 0; border-radius: 8px; padding: 12px 20px;
    background: xd.$xiading-primary; color: white;
    font-family: inherit; font-size: 14px; font-weight: 500; line-height: 1.4; cursor: pointer; white-space: nowrap;
    &:hover { background: xd.$xiading-accent; }
  }
  &__hamburger {
    display: none; width: 44px; height: 44px; align-items: center; justify-content: center;
    border: 0; border-radius: 8px; color: xd.$xiading-text-primary; background: transparent; cursor: pointer;
    svg { width: 24px; height: 24px; }
  }
  &__mobile { display: none; }
  :is(a, button):focus-visible { outline: 3px solid xd.$xiading-primary; outline-offset: 4px; }

  @media (max-width: 960px) {
    &__links { display: none; }
    &__hamburger { display: inline-flex; }
    &__mobile {
      display: flex; flex-direction: column; gap: 4px; padding: 16px 24px 4px;
      a { padding: 12px; border-radius: 8px; }
      a:hover { background: xd.$xiading-bg-secondary; }
    }
  }
  @media (max-width: 640px) {
    &__actions > .xd-nav__start { display: none; }
  }
  @media (max-width: 480px) {
    top: 10px; left: 12px; right: 12px; padding: 8px 0;
    &__inner { padding: 0 12px; gap: 8px; }
    &__mobile { padding: 12px; }
  }
}

.xd-hero {
  position: relative; z-index: 1; min-height: 780px; color: white;
  background: #101e30; isolation: isolate; scroll-margin-top: 100px;
  &__bg {
    position: absolute; inset: 0; z-index: -1; overflow: hidden;
    img { width: 100%; height: 100%; object-fit: cover; object-position: 60% center; }
    &::after {
      content: ''; position: absolute; inset: 0;
      background: linear-gradient(90deg, rgba(10, 24, 43, 0.94) 0%, rgba(10, 24, 43, 0.8) 36%, rgba(10, 24, 43, 0.2) 75%), linear-gradient(0deg, rgba(10, 24, 43, 0.65), transparent 45%);
    }
  }
  &__inner { max-width: xd.$xiading-container-max-width; margin: auto; padding: 136px 24px 72px; }
  &__content { max-width: 610px; }
  &__identity {
    display: inline-flex; flex-direction: column; align-items: flex-start; gap: 14px;
    max-width: 100%; padding: 4px 0 24px;
    border-bottom: 1px solid rgba(197, 218, 243, 0.2);
    > span:last-child { color: #c5d4e6; font-size: 12px; letter-spacing: 0.12em; }
  }
  &__eyebrow { margin: 28px 0 12px; font-size: 13px; font-weight: 500; letter-spacing: 0.16em; color: #c5daf3; }
  &__title {
    margin: 0; color: white; font-family: xd.$xiading-font-family-display; font-size: 46px; font-weight: 400; line-height: 1.18; letter-spacing: -0.04em;
    span, strong { display: block; }
    strong { font-size: 68px; font-weight: 900; }
  }
  &__desc { margin: 20px 0 0; max-width: 520px; font-size: 15px; color: #d6e1ef; line-height: 1.9; font-weight: 400; }
  &__actions { display: flex; align-items: center; gap: 28px; flex-wrap: wrap; margin-top: 28px; }
  &__primary {
    display: inline-flex; align-items: center; gap: 22px; padding: 15px 24px; border: 0; border-radius: 9px;
    background: white; color: xd.$xiading-accent; font-family: inherit; font-size: 15px; font-weight: 700; cursor: pointer;
    svg { width: 20px; height: 20px; }
    &:hover { background: xd.$xiading-ice-blue; }
  }
  &__secondary { color: white; font-size: 14px; text-decoration: none; padding: 12px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.6); span { margin-left: 12px; } }
  &__stats {
    display: flex; gap: 32px; margin: 36px 0 0; padding-top: 24px; border-top: 1px solid rgba(255, 255, 255, 0.25);
    > div { display: flex; flex-direction: column-reverse; gap: 4px; }
    dt { color: #c5d4e6; font-size: 12px; }
    dd { margin: 0; font: 700 26px/1.3 xd.$xiading-font-family-display; }
  }
  &__scroll { position: absolute; right: max(24px, calc((100vw - 1152px) / 2)); bottom: 34px; display: flex; gap: 28px; color: white; font-size: 12px; text-decoration: none; }
  :is(a, button):focus-visible { outline: 3px solid #b9d7ff; outline-offset: 5px; }

  @media (max-width: 768px) {
    min-height: auto;
    &__inner { padding: 130px 24px 72px; }
    &__bg::after { background: linear-gradient(90deg, rgba(10, 24, 43, 0.91), rgba(10, 24, 43, 0.65)); }
    &__title { font-size: 46px; strong { font-size: 62px; } }
    &__scroll { display: none; }
  }
  @media (max-width: 480px) {
    &__inner { padding: 108px 20px 48px; }
    &__identity { gap: 12px; padding-bottom: 20px; }
    &__eyebrow { margin-top: 28px; }
    &__title { font-size: 38px; strong { font-size: 50px; } }
    &__desc { font-size: 14px; }
    &__actions { gap: 20px; }
    &__stats { gap: 0; justify-content: space-between; dt { font-size: 11px; } dd { font-size: 24px; } }
  }
}
</style>
