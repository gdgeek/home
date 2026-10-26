<script setup lang="ts">
import XiadingBrandLockup from '../components/XiadingBrandLockup.vue'

const journey = [
  { step: '01', title: '創作教學內容', text: '用可視化工具，將課程構想搭建成 AI/AR 互動場景。' },
  { step: '02', title: '走進沉浸課堂', text: '透過 Rokid AR 眼鏡，讓虛擬內容與真實環境相遇。' },
  { step: '03', title: '探索與協作', text: '結合多人互動與投屏展示，讓師生一起參與學習。' },
]
</script>

<template>
  <section id="partnership" class="xd-partnership" aria-labelledby="xiading-partnership-title">
    <div class="xd-partnership__inner">
      <div class="xd-partnership__intro">
        <p class="xd-partnership__eyebrow">夏鼎 × Rokid · 聯合品牌</p>
        <h2 id="xiading-partnership-title">教學創意與空間體驗，<br />在這裡相遇。</h2>
        <p class="xd-partnership__desc">夏鼎攜手 Rokid，將面向澳門教育的 AI/AR 內容創作與 AR 眼鏡體驗連接起來。從備課、創作到課堂互動，讓每一個教學構想都能走進真實世界。</p>
        <XiadingBrandLockup size="large" />
        <a class="xd-partnership__link" href="#features">探索平台功能 <span aria-hidden="true">→</span></a>
      </div>
      <figure class="xd-partnership__visual">
        <img src="/images/ar-platform/女士操作Rokid AR Studio.webp" alt="使用 Rokid AR 裝置體驗空間互動內容" loading="lazy" width="960" height="720" />
        <figcaption>從螢幕上的創作，到真實空間裡的體驗</figcaption>
      </figure>
      <ol class="xd-partnership__journey" aria-label="聯合品牌教學體驗">
        <li v-for="item in journey" :key="item.step">
          <span class="xd-partnership__step" aria-hidden="true">{{ item.step }}</span>
          <div><h3>{{ item.title }}</h3><p>{{ item.text }}</p></div>
        </li>
      </ol>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/xiading/variables' as xd;

.xd-partnership {
  position: relative; z-index: 1; background: #fff; scroll-margin-top: 100px;
  &__inner {
    display: grid; grid-template-columns: 1fr 1fr; gap: 56px 64px;
    max-width: xd.$xiading-container-max-width; margin: 0 auto; padding: 88px 24px 48px;
  }
  &__intro { align-self: center; min-width: 0; }
  &__eyebrow { margin: 0 0 16px; color: xd.$xiading-primary; font-size: 13px; font-weight: 700; letter-spacing: 0.08em; }
  h2 { margin: 0; color: xd.$xiading-text-primary; font-family: xd.$xiading-font-family-display; font-size: 34px; line-height: 1.45; font-weight: 700; letter-spacing: -0.02em; }
  &__desc { max-width: 480px; margin: 20px 0 28px; font-size: 15px; line-height: 1.9; color: xd.$xiading-text-secondary; }
  &__link { display: flex; align-items: center; gap: 32px; width: fit-content; margin-top: 28px; padding: 8px 0; color: xd.$xiading-accent; text-decoration: none; font-size: 14px; font-weight: 700; border-bottom: 1px solid xd.$xiading-primary-wash; }
  &__visual {
    margin: 0; position: relative; align-self: center; aspect-ratio: 4 / 3; border-radius: 18px; overflow: hidden; background: xd.$xiading-bg-secondary;
    img { display: block; width: 100%; height: 100%; object-fit: cover; }
    figcaption { position: absolute; bottom: 0; left: 0; right: 0; padding: 60px 24px 24px; color: white; font-size: 13px; background: linear-gradient(transparent, rgba(10, 24, 43, 0.8)); }
  }
  &__journey {
    grid-column: 1 / -1; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 36px;
    margin: 0; padding: 32px 0 0; list-style: none; border-top: 1px solid xd.$xiading-primary-wash;
    li { display: flex; gap: 16px; }
    h3 { margin: 0 0 8px; color: xd.$xiading-text-primary; font-size: 17px; font-weight: 700; }
    p { margin: 0; font-size: 13px; line-height: 1.8; color: xd.$xiading-text-secondary; }
  }
  &__step { color: xd.$xiading-primary; font: 500 13px/1.8 xd.$xiading-font-family-display; }
  a:focus-visible { outline: 3px solid xd.$xiading-primary; outline-offset: 4px; }

  @media (max-width: 960px) {
    &__inner { gap: 40px; }
    h2 { font-size: 28px; }
  }
  @media (max-width: 768px) {
    &__inner { grid-template-columns: 1fr; padding: 56px 20px 40px; gap: 32px; }
    &__visual img { min-height: 0; height: auto; aspect-ratio: 4 / 3; }
    &__journey { grid-template-columns: 1fr; gap: 24px; padding-top: 28px; }
  }
}
</style>
