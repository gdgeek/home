<script setup lang="ts">
import type { BrandFooterConfig } from '@/types/brand'
import XiadingBrandLockup from '../components/XiadingBrandLockup.vue'

defineProps<{ footer: BrandFooterConfig; buildTime: string }>()
</script>

<template>
  <footer class="xd-footer">
    <div class="xd-footer__inner">
      <div class="xd-footer__brand">
        <a href="#top" aria-label="夏鼎 × Rokid 首頁"><XiadingBrandLockup /></a>
        <p>夏鼎 × Rokid AI/AR教育平台<br />讓創意走進課堂，讓知識融入現實。</p>
        <a v-if="footer.contactInfo.email" class="xd-footer__email" :href="`mailto:${footer.contactInfo.email}`">{{ footer.contactInfo.email }}</a>
      </div>
      <nav v-for="group in footer.navigation" :key="group.title" class="xd-footer__links" :aria-label="group.title">
        <h2>{{ group.title }}</h2>
        <a
          v-for="link in group.links"
          :key="link.url"
          :href="link.url"
          :target="link.url.startsWith('https://') ? '_blank' : undefined"
          :rel="link.url.startsWith('https://') ? 'noopener noreferrer' : undefined"
        >{{ link.text }}</a>
      </nav>
    </div>
    <section class="xd-footer__credits" aria-labelledby="xiading-image-credits">
      <h2 id="xiading-image-credits">圖片來源與授權</h2>
      <p>
        澳門旅遊大學氹仔校區展望樓 ·
        <a href="https://commons.wikimedia.org/wiki/File:20250812_Campus_da_Taipa,_Universidade_de_Turismo_de_Macau.jpg">攝影：Yumeto</a>
        · <a href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA 4.0</a>（縮圖）
      </p>
    </section>
    <div class="xd-footer__bottom">
      <span>{{ footer.copyright }}</span>
      <span class="xd-footer__ver">{{ buildTime }}</span>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/xiading/variables' as xd;

.xd-footer {
  position: relative; z-index: 1; margin-top: 64px; border-top: 1px solid xd.$xiading-border-color;
  &__inner {
    max-width: xd.$xiading-container-max-width; margin: 0 auto; padding: 44px 24px;
    display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 48px;
  }
  &__brand {
    p { margin: 18px 0 12px; font-size: 14px; color: xd.$xiading-text-secondary; line-height: 1.8; }
    > a { display: inline-block; }
  }
  a { color: xd.$xiading-text-secondary; text-decoration: none; font-size: 13px; line-height: 1.6; }
  a:hover { color: xd.$xiading-primary; }
  a:focus-visible { outline: 3px solid xd.$xiading-primary; outline-offset: 4px; }
  &__links {
    display: flex; flex-direction: column; align-items: flex-start; gap: 12px;
    h2 { margin: 0 0 4px; color: xd.$xiading-text-primary; font-size: 14px; font-weight: 700; }
    a { padding: 3px 0; }
  }
  &__credits {
    max-width: xd.$xiading-container-max-width; margin: 0 auto; padding: 0 24px 24px;
    color: #757575; font-size: 12px; line-height: 1.7;
    h2 { margin: 0 0 4px; font-size: 13px; font-weight: 600; }
    p { margin: 0; }
    a { color: inherit; font-size: inherit; text-decoration: underline; }
  }
  &__bottom {
    max-width: xd.$xiading-container-max-width; margin: 0 auto; padding: 20px 24px;
    border-top: 1px solid xd.$xiading-border-color; display: flex; justify-content: space-between; gap: 16px; flex-wrap: wrap;
    font-size: 12px; color: xd.$xiading-text-secondary;
  }
  &__ver { font-variant-numeric: tabular-nums; }
  @media (max-width: 768px) {
    &__inner { padding: 36px 20px; grid-template-columns: 1fr 1fr; gap: 32px; }
    &__brand { grid-column: 1 / -1; }
    &__credits { padding: 0 20px 20px; }
    &__bottom { padding: 20px; }
  }
}
</style>
