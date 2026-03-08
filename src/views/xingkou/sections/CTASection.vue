<script setup lang="ts">
defineProps<{
  onOpenLogin: () => void
}>()
</script>

<template>
  <section class="cta animate-on-scroll">
    <div class="section-container">
      <h2 class="cta__title">即刻上手，开启AR教育创作之旅</h2>
      <p class="cta__subtitle">教师、学生、校园用户通用，登录后匹配对应功能与素材权益</p>
      <div class="cta__tags">
        <span class="cta__tag">无广告</span>
        <span class="cta__tag">免费试用</span>
        <span class="cta__tag">专属客服指导</span>
      </div>
      <button class="btn btn--primary btn--large" @click="onOpenLogin">立即登录</button>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/xingkou/variables' as xk;

$primary: xk.$xingkou-primary;
$primary-dark: xk.$xingkou-primary-dark;
$bg-card: xk.$xingkou-bg-card;
$text-primary: xk.$xingkou-text-primary;
$text-light: xk.$xingkou-text-light;
$gradient-cta: xk.$xingkou-gradient-cta;
$spacing-xs: xk.$xingkou-spacing-xs;
$spacing-md: xk.$xingkou-spacing-md;
$spacing-lg: xk.$xingkou-spacing-lg;
$spacing-xl: xk.$xingkou-spacing-xl;
$spacing-xxl: xk.$xingkou-spacing-xxl;
$font-size-sm: xk.$xingkou-font-size-sm;
$font-size-lg: xk.$xingkou-font-size-lg;
$font-size-xxl: xk.$xingkou-font-size-xxl;
$font-size-xxxl: xk.$xingkou-font-size-xxxl;
$font-weight-medium: xk.$xingkou-font-weight-medium;
$font-weight-bold: xk.$xingkou-font-weight-bold;
$border-radius-md: xk.$xingkou-border-radius-md;
$border-radius-full: xk.$xingkou-border-radius-full;
$transition-base: xk.$xingkou-transition-base;
$breakpoint-mobile: xk.$xingkou-breakpoint-mobile;
$container-max-width: xk.$xingkou-container-max-width;
$container-padding: xk.$xingkou-container-padding;
$section-padding-y: xk.$xingkou-section-padding-y;
$touch-target-min: 44px;
$ease-out: cubic-bezier(0.16, 1, 0.3, 1);

.section-container {
  max-width: $container-max-width;
  margin: 0 auto;
  padding: 0 $container-padding;
}

.cta {
  padding: $section-padding-y 0;
  background: $gradient-cta;
  text-align: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 60%);
    animation: rotate 30s linear infinite;
  }

  &__title {
    font-size: $font-size-xxxl;
    font-weight: $font-weight-bold;
    color: $text-light;
    margin-bottom: $spacing-md;
    position: relative;
    z-index: 1;

    @media (max-width: $breakpoint-mobile) { font-size: $font-size-xxl; }
  }

  &__subtitle {
    font-size: $font-size-lg;
    color: rgba(255, 255, 255, 0.9);
    margin-bottom: $spacing-xl;
    position: relative;
    z-index: 1;
  }

  &__tags {
    display: flex;
    justify-content: center;
    gap: $spacing-md;
    margin-bottom: $spacing-xl;
    flex-wrap: wrap;
    position: relative;
    z-index: 1;
  }

  &__tag {
    padding: $spacing-xs $spacing-md;
    background: rgba(255, 255, 255, 0.2);
    color: $text-light;
    border-radius: $border-radius-full;
    font-size: $font-size-sm;
    border: 1px solid rgba(255, 255, 255, 0.3);
    backdrop-filter: blur(10px);
    transition: all 0.3s ease;

    &:hover {
      background: rgba(255, 255, 255, 0.3);
      transform: translateY(-2px);
    }
  }

  .btn--primary {
    background: $bg-card;
    color: $primary-dark;
    position: relative;
    z-index: 1;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);

    &:hover {
      background: white;
      transform: translateY(-4px);
      box-shadow: 0 12px 40px rgba(0, 0, 0, 0.25);
    }
  }
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: $spacing-md $spacing-xl;
  font-size: $font-size-lg;
  font-weight: $font-weight-medium;
  border-radius: $border-radius-md;
  border: none;
  cursor: pointer;
  transition: all $transition-base $ease-out;
  min-height: $touch-target-min;
  position: relative;
  overflow: hidden;

  &--large {
    padding: $spacing-lg $spacing-xxl;
    font-size: $font-size-lg;
  }
}

.animate-on-scroll {
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.8s ease-out, transform 0.8s ease-out;

  &.animated { opacity: 1; transform: translateY(0); }
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style>
