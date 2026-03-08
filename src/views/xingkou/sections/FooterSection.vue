<script setup lang="ts">
defineProps<{
  copyright: string
  version: string
  buildTime: string
}>()

const footerNavigation = [
  { title: '平台服务', links: [{ text: '创作指南', url: '#' }, { text: '帮助中心', url: '#' }, { text: '素材库', url: '#' }] },
  { title: '关于我们', links: [{ text: '公司介绍', url: '#' }, { text: '联系我们', url: '#' }, { text: '合作伙伴', url: '#' }] }
]
</script>

<template>
  <footer class="footer">
    <div class="section-container">
      <div class="footer__grid">
        <div class="footer__brand">
          <h3 class="footer__logo">星扣AR创作平台</h3>
          <p class="footer__desc">专为教育场景打造的AR创作工具</p>
          <div class="footer__contact">
            <p>电话：400-888-8888</p>
            <p>邮箱：contact@xingkou.com</p>
          </div>
        </div>
        <div v-for="(nav, index) in footerNavigation" :key="index" class="footer__nav">
          <h4 class="footer__nav-title">{{ nav.title }}</h4>
          <ul class="footer__nav-list">
            <li v-for="(link, linkIndex) in nav.links" :key="linkIndex">
              <a :href="link.url">{{ link.text }}</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="footer__bottom">
        <p>{{ copyright || '© 2025 星扣科技. 保留所有权利.' }}</p>
        <p style="font-size: 12px; opacity: 0.6; margin-top: 8px;">v{{ version }} ({{ buildTime }})</p>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/xingkou/variables' as xk;

$primary: xk.$xingkou-primary;
$bg-dark: xk.$xingkou-bg-dark;
$text-light: xk.$xingkou-text-light;
$gradient-cta: xk.$xingkou-gradient-cta;
$spacing-xs: xk.$xingkou-spacing-xs;
$spacing-sm: xk.$xingkou-spacing-sm;
$spacing-md: xk.$xingkou-spacing-md;
$spacing-lg: xk.$xingkou-spacing-lg;
$spacing-xl: xk.$xingkou-spacing-xl;
$spacing-xxl: xk.$xingkou-spacing-xxl;
$font-size-sm: xk.$xingkou-font-size-sm;
$font-size-base: xk.$xingkou-font-size-base;
$font-size-xl: xk.$xingkou-font-size-xl;
$font-weight-semibold: xk.$xingkou-font-weight-semibold;
$font-weight-bold: xk.$xingkou-font-weight-bold;
$transition-fast: xk.$xingkou-transition-fast;
$breakpoint-tablet: xk.$xingkou-breakpoint-tablet;
$container-max-width: xk.$xingkou-container-max-width;
$container-padding: xk.$xingkou-container-padding;

.section-container {
  max-width: $container-max-width;
  margin: 0 auto;
  padding: 0 $container-padding;
}

.footer {
  padding: $spacing-xxl 0 $spacing-xl;
  background: $bg-dark;
  color: $text-light;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: $gradient-cta;
  }

  &__grid {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
    gap: $spacing-xxl;
    margin-bottom: $spacing-xxl;

    @media (max-width: $breakpoint-tablet) {
      grid-template-columns: 1fr;
      text-align: center;
    }
  }

  &__logo {
    font-size: $font-size-xl;
    font-weight: $font-weight-bold;
    margin-bottom: $spacing-md;
    background: $gradient-cta;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    display: inline-block;
  }

  &__desc {
    color: rgba(255, 255, 255, 0.7);
    margin-bottom: $spacing-lg;
  }

  &__contact {
    color: rgba(255, 255, 255, 0.7);
    font-size: $font-size-sm;

    p { margin-bottom: $spacing-xs; }
  }

  &__nav-title {
    font-size: $font-size-base;
    font-weight: $font-weight-semibold;
    margin-bottom: $spacing-md;
  }

  &__nav-list {
    list-style: none;
    padding: 0;
    margin: 0;

    li { margin-bottom: $spacing-sm; }

    a {
      color: rgba(255, 255, 255, 0.7);
      text-decoration: none;
      font-size: $font-size-sm;
      transition: all $transition-fast;
      position: relative;
      padding-left: 0;

      &:hover {
        color: $text-light;
        padding-left: 8px;
      }

      &::before {
        content: '→';
        position: absolute;
        left: -12px;
        opacity: 0;
        transition: all 0.3s ease;
      }

      &:hover::before {
        left: 0;
        opacity: 1;
      }
    }
  }

  &__bottom {
    text-align: center;
    padding-top: $spacing-xl;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    color: rgba(255, 255, 255, 0.5);
    font-size: $font-size-sm;
  }
}
</style>
