<script setup lang="ts">
withDefaults(defineProps<{
  size?: 'compact' | 'large'
  inverse?: boolean
}>(), {
  size: 'compact',
  inverse: false,
})
</script>

<template>
  <span
    class="xd-brand"
    :class="[`xd-brand--${size}`, { 'xd-brand--inverse': inverse }]"
    role="img"
    aria-label="夏鼎科技 × Rokid 聯合品牌"
  >
    <span class="xd-brand__xiading">
      <img src="/logo/xiading/bar.webp" alt="" width="1024" height="274" />
      <img v-if="inverse" class="xd-brand__xiading-wordmark" src="/logo/xiading/bar.webp" alt="" width="1024" height="274" />
    </span>
    <span class="xd-brand__join" aria-hidden="true">×</span>
    <img class="xd-brand__rokid" src="/images/rokid/rokid-logo-white.webp" alt="" width="400" height="122" />
  </span>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/xiading/variables' as xd;

.xd-brand {
  display: inline-flex;
  align-items: center;
  gap: 14px;
  flex-shrink: 0;
  vertical-align: middle;

  img { display: block; object-fit: contain; }
  &__xiading {
    position: relative; display: block; width: 112px; height: 30px;
    img { width: 100%; height: 100%; }
  }
  &__xiading-wordmark { position: absolute; inset: 0; filter: brightness(0) invert(1); clip-path: inset(0 0 0 32%); }
  &__rokid { width: 78px; height: auto; filter: brightness(0); }
  &__join { color: xd.$xiading-primary; font: 300 22px/1 sans-serif; }

  &--large {
    gap: 20px;
    .xd-brand__xiading { width: 164px; height: 44px; }
    .xd-brand__rokid { width: 108px; }
    .xd-brand__join { font-size: 28px; }
  }

  &--inverse {
    .xd-brand__rokid { filter: none; }
    .xd-brand__join { color: #c5daf3; opacity: 0.55; }
  }

  @media (max-width: 480px) {
    gap: 8px;
    &__xiading { width: 90px; height: 25px; }
    &__rokid { width: 62px; }
    &__join { font-size: 18px; }

    &--large {
      gap: 14px;
      .xd-brand__xiading { width: 134px; height: 36px; }
      .xd-brand__rokid { width: 90px; }
      .xd-brand__join { font-size: 24px; }
    }
  }
  @media (max-width: 360px) {
    &--large {
      gap: 12px;
      .xd-brand__xiading { width: 112px; height: 30px; }
      .xd-brand__rokid { width: 76px; }
      .xd-brand__join { font-size: 22px; }
    }
  }
}
</style>
