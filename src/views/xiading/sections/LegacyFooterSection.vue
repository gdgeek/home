<script setup lang="ts">
defineProps<{ copyright: string; buildTime: string }>()
</script>

<template>
    <!-- Footer：簡潔橫排 -->
    <footer class="xd-footer">
      <div class="xd-footer__inner">
        <div class="xd-footer__brand">
          <img src="/logo/xiading/bar.webp" alt="夏鼎科技" class="xd-footer__logo" />
          <p>專為澳門教育場景打造的AR創作工具</p>
        </div>
        <div class="xd-footer__links">
          <a href="#">創作指南</a>
          <a href="#">素材庫</a>
          <a href="#">幫助中心</a>
          <a href="#">公司介紹</a>
          <a href="#">用戶協議</a>
          <a href="#">隱私政策</a>
        </div>
        <div class="xd-footer__contact">
          <span>+853 2888 8888</span>
          <span>contact@xiading.mo</span>
        </div>
      </div>
      <div class="xd-footer__bottom">
        <span>{{ copyright || '© 2025 夏鼎科技（澳門）' }}</span>
        <span class="xd-footer__ver">{{ buildTime }}</span>
      </div>
    </footer>

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

// ═══════════════════════════════════════
// Footer：簡潔橫排
// ═══════════════════════════════════════
.xd-footer {
  position: relative; z-index: 1;
  border-top: 1px solid $border; margin-top: 64px;

  &__inner {
    max-width: $max-w; margin: 0 auto;
    padding: 36px 24px 24px;
    display: flex; align-items: flex-start; gap: 48px;
    @media (max-width: 768px) { flex-direction: column; gap: 32px; }
  }

  &__brand {
    flex: 1;
    p { font-size: 14px; color: $text-muted; margin-top: 10px; font-weight: 300; }
  }
  &__logo { height: 24px; }

  &__links {
    display: flex; flex-wrap: wrap; gap: 8px 24px;
    a { font-size: 13px; color: $text-muted; text-decoration: none; font-weight: 300; transition: color 0.2s;
      &:hover { color: $steel; } }
  }

  &__contact {
    display: flex; flex-direction: column; gap: 4px; text-align: right;
    span { font-family: 'Zen Kaku Gothic New', monospace; font-size: 13px; color: $text-faint; font-weight: 300; }
    @media (max-width: 768px) { text-align: left; }
  }

  &__bottom {
    max-width: $max-w; margin: 0 auto; padding: 16px 24px;
    border-top: 1px solid $border;
    display: flex; justify-content: space-between; align-items: center;
    font-size: 12px; color: $text-faint; font-weight: 300;
  }
  &__ver { font-family: 'Zen Kaku Gothic New', monospace; opacity: 0.5; }
}

</style>
