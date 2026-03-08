<script setup lang="ts">
const cases = [
  { school: '澳門培正中學', quote: '夏鼎讓生物課堂煥然一新，學生參與度提升了85%',
    person: '陳老師', role: '生物科組長', stat: { value: '85%', label: '參與度提升' } },
  { school: '澳門大學附屬應用學校', quote: '學生已創作超過500件AR作品，創新思維顯著提升',
    person: '李主任', role: 'STEAM負責人', stat: { value: '500+', label: '學生作品' } },
  { school: '澳門聖若瑟教區中學', quote: '零門檻操作讓每位老師都能輕鬆製作AR課件',
    person: '黃校長', role: '教務主任', stat: { value: '98%', label: '教師使用率' } }
]
</script>

<template>
  <section id="cases" class="xd-section">
    <div class="xd-section__header reveal">
      <span class="xd-tag">成功案例</span>
      <h2 class="xd-section__title">澳門學校的選擇</h2>
    </div>
    <div class="xd-testimonials">
      <div v-for="(c, idx) in cases" :key="idx" class="xd-testimonial reveal">
        <div class="xd-testimonial__top">
          <span class="xd-testimonial__quote-mark">"</span>
          <div class="xd-testimonial__stat">
            <span class="xd-testimonial__stat-val">{{ c.stat.value }}</span>
            <span class="xd-testimonial__stat-lbl">{{ c.stat.label }}</span>
          </div>
        </div>
        <blockquote class="xd-testimonial__text">{{ c.quote }}</blockquote>
        <div class="xd-testimonial__author">
          <span class="xd-testimonial__school">{{ c.school }}</span>
          <span class="xd-testimonial__person">{{ c.person }} · {{ c.role }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/xiading/variables' as xd;

$steel: xd.$xiading-primary;
$card: xd.$xiading-bg-card;
$text-dark: xd.$xiading-text-primary;
$text-body: xd.$xiading-text-secondary;
$text-faint: xd.$xiading-text-faint;
$border: xd.$xiading-border-color;
$border-hover: xd.$xiading-border-hover;
$shadow-s: xd.$xiading-shadow-soft;
$shadow-l: xd.$xiading-shadow-hover;
$r: xd.$xiading-border-radius-lg;
$max-w: xd.$xiading-container-max-width;
$ease: xd.$xiading-ease-out;

.reveal {
  opacity: 0; transform: translateY(28px);
  transition: opacity 0.7s $ease, transform 0.7s $ease;
  &.revealed { opacity: 1; transform: translateY(0); }
}

.xd-tag {
  display: inline-block; padding: 6px 16px;
  background: rgba($steel, 0.06); border: 1px solid rgba($steel, 0.12);
  border-radius: 100px; font-size: 13px; font-weight: 500; color: $steel; letter-spacing: 0.04em;
}

.xd-section {
  position: relative; z-index: 1;
  max-width: $max-w; margin: 0 auto; padding: 64px 24px;
  @media (max-width: 768px) { padding: 40px 16px; }
  &__header { text-align: center; margin-bottom: 36px; }
  &__title {
    font-family: 'Zen Kaku Gothic New', sans-serif;
    font-size: clamp(26px, 4.5vw, 40px); font-weight: 700;
    color: $text-dark; margin-top: 14px; letter-spacing: -0.01em; line-height: 1.25;
  }
}

.xd-testimonials {
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px;
  @media (max-width: 1024px) { grid-template-columns: 1fr; max-width: 560px; margin: 0 auto; }
}

.xd-testimonial {
  padding: 24px; background: $card;
  border: 1px solid $border; border-radius: $r;
  transition: all 0.3s $ease; box-shadow: $shadow-s;
  cursor: pointer; display: flex; flex-direction: column;
  &:hover { border-color: $border-hover; transform: translateY(-3px); box-shadow: $shadow-l; }
  &__top { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 16px; }
  &__quote-mark {
    font-family: 'Zen Kaku Gothic New', serif;
    font-size: 56px; font-weight: 900; line-height: 0.7; color: rgba($steel, 0.12);
  }
  &__stat { text-align: right; }
  &__stat-val {
    display: block; font-family: 'Zen Kaku Gothic New', sans-serif;
    font-size: 26px; font-weight: 900; color: $steel; line-height: 1.1;
  }
  &__stat-lbl { font-size: 12px; color: $text-faint; font-weight: 300; }
  &__text {
    font-size: 15px; color: $text-body; line-height: 1.8;
    margin: 0 0 auto; padding-bottom: 20px; font-style: italic; font-weight: 300;
  }
  &__author {
    display: flex; flex-direction: column; gap: 2px;
    padding-top: 16px; border-top: 1px solid rgba($steel, 0.08);
  }
  &__school { font-size: 14px; font-weight: 700; color: $text-dark; }
  &__person { font-size: 13px; color: $text-faint; font-weight: 300; }
}

@media (prefers-reduced-motion: reduce) {
  .reveal { transition: opacity 0.3s ease; transform: none; }
  .reveal.revealed { transform: none; }
  .xd-testimonial:hover { transform: none; }
}
</style>
