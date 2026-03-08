<script setup lang="ts">
defineProps<{
  onOpenLogin: () => void
}>()
</script>

<template>
  <section class="xd-cta reveal">
    <img
      class="xd-cta__bg"
      src="/images/ar-platform/本课程操作AR内容.webp"
      alt=""
      aria-hidden="true"
      loading="lazy"
      width="1200"
      height="400"
    />
    <div class="xd-cta__inner">
      <h2>開啟AI/AR教育之旅</h2>
      <p>教師、學生、校園用戶通用</p>
      <div class="xd-cta__actions">
        <button class="xd-btn xd-btn--white xd-btn--lg" @click="onOpenLogin">立即免費試用</button>
        <button class="xd-btn xd-btn--ghost-light xd-btn--lg">聯繫我們</button>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/xiading/variables' as xd;

$steel: xd.$xiading-primary;
$steel-light: xd.$xiading-primary-light;
$accent: xd.$xiading-accent;
$r: xd.$xiading-border-radius-lg;
$r-sm: xd.$xiading-border-radius-sm;
$max-w: xd.$xiading-container-max-width;
$ease: xd.$xiading-ease-out;

.reveal {
  opacity: 0;
  transform: translateY(28px);
  transition: opacity 0.7s $ease, transform 0.7s $ease;
  &.revealed { opacity: 1; transform: translateY(0); }
}

.xd-btn {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 10px 22px; font-family: inherit; font-size: 14px; font-weight: 500;
  border-radius: $r-sm; border: none; cursor: pointer;
  transition: all 0.25s $ease;

  &--white { background: white; color: $steel; font-weight: 700; box-shadow: 0 4px 16px rgba(0,0,0,0.08);
    &:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(0,0,0,0.12); } }
  &--ghost-light { background: rgba(255,255,255,0.15); color: rgba(255,255,255,0.9); border: 1px solid rgba(255,255,255,0.3);
    &:hover { background: rgba(255,255,255,0.3); color: white; } }
  &--lg { padding: 14px 30px; font-size: 15px; border-radius: 12px; }
}

// ═══════════════════════════════════════
// CTA
// ═══════════════════════════════════════
.xd-cta {
  position: relative; z-index: 1;
  margin: 0 24px; border-radius: 24px; overflow: hidden;
  max-width: $max-w; margin-left: auto; margin-right: auto;

  &__bg {
    position: absolute; inset: 0; width: 100%; height: 100%;
    object-fit: cover; z-index: 0;
  }

  &::after {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(135deg, rgba($accent, 0.88) 0%, rgba($steel, 0.82) 50%, rgba($steel-light, 0.78) 100%);
    z-index: 1;
  }

  &__inner {
    position: relative; z-index: 2;
    text-align: center; padding: 56px 24px;
    h2 { font-family: 'Zen Kaku Gothic New', sans-serif; font-size: clamp(24px, 4vw, 36px); font-weight: 700; color: white; margin-bottom: 10px; }
    p { font-size: 15px; color: rgba(255,255,255,0.7); margin-bottom: 24px; font-weight: 300; }
  }
  &__actions {
    display: flex; gap: 12px; justify-content: center;
    @media (max-width: 480px) { flex-direction: column; align-items: center; }
  }
}

@media (prefers-reduced-motion: reduce) {
  .reveal { transition: opacity 0.3s ease; transform: none; }
  .reveal.revealed { transform: none; }
}
</style>
