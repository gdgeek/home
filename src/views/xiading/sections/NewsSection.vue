<script setup lang="ts">
import type { NewsItem } from '@/types'

defineProps<{
  news: NewsItem[]
  blogUrl: string
  onOpenNewsDetail: (item: NewsItem) => void
  formatDate: (dateString: string) => string
}>()
</script>

<template>
  <section v-if="news?.length" id="news" class="xd-section xd-section--alt">
    <div class="xd-section__header reveal">
      <span class="xd-tag">最新動態</span>
      <h2 class="xd-section__title">平台資訊</h2>
    </div>
    <div class="xd-news-grid reveal">
      <article v-if="news[0]" class="xd-news-featured" @click="onOpenNewsDetail(news[0])">
        <span class="xd-news-featured__date">{{ formatDate(news[0].date) }}</span>
        <h3 class="xd-news-featured__title">{{ news[0].title }}</h3>
        <span class="xd-news-featured__link">
          閱讀全文
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </span>
      </article>
      <div class="xd-news-list">
        <article
          v-for="item in news.slice(1, 4)"
          :key="item.id"
          class="xd-news-list__item"
          @click="onOpenNewsDetail(item)"
        >
          <span class="xd-news-list__date">{{ formatDate(item.date) }}</span>
          <h3 class="xd-news-list__title">{{ item.title }}</h3>
        </article>
        <a :href="blogUrl" target="_blank" rel="noopener" class="xd-news-list__more">查看更多 →</a>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/xiading/variables' as xd;

$steel: xd.$xiading-primary;
$bg: xd.$xiading-bg-primary;
$bg-alt: xd.$xiading-bg-secondary;
$card: xd.$xiading-bg-card;
$text-dark: xd.$xiading-text-primary;
$text-muted: xd.$xiading-text-muted;
$text-faint: xd.$xiading-text-faint;
$border: xd.$xiading-border-color;
$border-hover: xd.$xiading-border-hover;
$shadow-s: xd.$xiading-shadow-soft;
$shadow-l: xd.$xiading-shadow-hover;
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

.xd-tag {
  display: inline-block; padding: 6px 16px;
  background: rgba($steel, 0.06); border: 1px solid rgba($steel, 0.12);
  border-radius: 100px; font-size: 13px; font-weight: 500; color: $steel; letter-spacing: 0.04em;
}

.xd-section {
  position: relative; z-index: 1;
  max-width: $max-w; margin: 0 auto; padding: 64px 24px;
  @media (max-width: 768px) { padding: 40px 16px; }

  &--alt {
    background: $bg-alt; max-width: none;
    > * { max-width: $max-w; margin-left: auto; margin-right: auto; }
  }

  &__header { text-align: center; margin-bottom: 36px; }
  &__title {
    font-family: 'Zen Kaku Gothic New', sans-serif;
    font-size: clamp(26px, 4.5vw, 40px); font-weight: 700;
    color: $text-dark; margin-top: 14px; letter-spacing: -0.01em; line-height: 1.25;
  }
}

// ═══════════════════════════════════════
// 新聞：非對稱
// ═══════════════════════════════════════
.xd-news-grid {
  display: grid; grid-template-columns: 1.4fr 1fr; gap: 24px;
  @media (max-width: 768px) { grid-template-columns: 1fr; }
}

.xd-news-featured {
  padding: 28px; background: $card;
  border: 1px solid $border; border-radius: $r;
  cursor: pointer; transition: all 0.25s $ease;
  box-shadow: $shadow-s;
  display: flex; flex-direction: column; justify-content: flex-end;
  min-height: 220px;

  &:hover { border-color: $border-hover; box-shadow: $shadow-l; }

  &__date { font-family: 'Zen Kaku Gothic New', monospace; font-size: 12px; color: $text-faint; font-weight: 300; }
  &__title {
    font-size: clamp(20px, 3vw, 28px); font-weight: 700; color: $text-dark;
    margin: 12px 0 20px; line-height: 1.4;
  }
  &__link {
    display: inline-flex; align-items: center; gap: 6px;
    font-size: 14px; color: $steel; font-weight: 500;
    svg { width: 14px; height: 14px; transition: transform 0.2s; }
    &:hover svg { transform: translateX(3px); }
  }
}

.xd-news-list {
  display: flex; flex-direction: column; gap: 12px;

  &__item {
    padding: 16px 20px; background: $card;
    border: 1px solid $border; border-radius: $r-sm;
    cursor: pointer; transition: all 0.25s $ease;
    &:hover { border-color: $border-hover; box-shadow: $shadow-s; }
  }
  &__date { font-family: 'Zen Kaku Gothic New', monospace; font-size: 11px; color: $text-faint; font-weight: 300; }
  &__title {
    font-size: 15px; font-weight: 700; color: $text-dark;
    margin-top: 6px; line-height: 1.4;
    display: -webkit-box; -webkit-line-clamp: 2; line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
  }
  &__more {
    display: block; text-align: center; padding: 12px;
    color: $text-muted; text-decoration: none; font-size: 13px;
    transition: color 0.2s;
    &:hover { color: $steel; }
  }
}

@media (prefers-reduced-motion: reduce) {
  .reveal { transition: opacity 0.3s ease; transform: none; }
  .reveal.revealed { transform: none; }
}
</style>
