<script setup lang="ts">
import type { NewsItem } from '@/types'

defineProps<{
  news: NewsItem[]
  loading: boolean
  error: string | null
  blogUrl: string
  onOpenNewsDetail: (item: NewsItem) => void
  formatDate: (dateString: string) => string
}>()
</script>

<template>
  <section
    v-if="!error && !loading && news && news.length > 0"
    id="news"
    class="news animate-on-scroll"
  >
    <div class="section-container">
      <h2 class="section-title">新闻动态</h2>
      <p class="section-subtitle">了解平台最新资讯与行业动态</p>

      <div class="news__grid">
        <div
          v-for="(item, index) in news"
          :key="item.id"
          class="news-card animate-delay"
          :style="{ animationDelay: `${index * 0.15}s` }"
          @click="onOpenNewsDetail(item)"
        >
          <span class="news-card__category">{{ item.category.name }}</span>
          <h3 class="news-card__title">{{ item.title }}</h3>
          <p v-if="item.excerpt" class="news-card__excerpt">{{ item.excerpt }}</p>
          <span class="news-card__date">{{ formatDate(item.date) }}</span>
        </div>
      </div>

      <div class="news__more">
        <a :href="blogUrl" class="news__more-link" target="_blank" rel="noopener">查看更多新闻 →</a>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/xingkou/variables' as xk;

$primary: xk.$xingkou-primary;
$bg-card: xk.$xingkou-bg-card;
$bg-secondary: xk.$xingkou-bg-secondary;
$text-primary: xk.$xingkou-text-primary;
$text-secondary: xk.$xingkou-text-secondary;
$text-muted: xk.$xingkou-text-muted;
$text-light: xk.$xingkou-text-light;
$border-color: xk.$xingkou-border-color;
$gradient-cta: xk.$xingkou-gradient-cta;
$spacing-xs: xk.$xingkou-spacing-xs;
$spacing-sm: xk.$xingkou-spacing-sm;
$spacing-md: xk.$xingkou-spacing-md;
$spacing-lg: xk.$xingkou-spacing-lg;
$spacing-xl: xk.$xingkou-spacing-xl;
$font-size-xs: xk.$xingkou-font-size-xs;
$font-size-sm: xk.$xingkou-font-size-sm;
$font-size-base: xk.$xingkou-font-size-base;
$font-size-lg: xk.$xingkou-font-size-lg;
$font-size-xxl: xk.$xingkou-font-size-xxl;
$font-size-xxxl: xk.$xingkou-font-size-xxxl;
$font-weight-medium: xk.$xingkou-font-weight-medium;
$font-weight-semibold: xk.$xingkou-font-weight-semibold;
$font-weight-bold: xk.$xingkou-font-weight-bold;
$border-radius-sm: xk.$xingkou-border-radius-sm;
$border-radius-md: xk.$xingkou-border-radius-md;
$transition-base: xk.$xingkou-transition-base;
$breakpoint-mobile: xk.$xingkou-breakpoint-mobile;
$breakpoint-tablet: xk.$xingkou-breakpoint-tablet;
$container-max-width: xk.$xingkou-container-max-width;
$container-padding: xk.$xingkou-container-padding;
$section-padding-y: xk.$xingkou-section-padding-y;
$line-height-normal: 1.5;
$line-height-relaxed: 1.75;

.section-container {
  max-width: $container-max-width;
  margin: 0 auto;
  padding: 0 $container-padding;
}

.section-title {
  font-size: $font-size-xxxl;
  font-weight: $font-weight-bold;
  text-align: center;
  margin-bottom: $spacing-md;
  color: $text-primary;
  position: relative;
  display: inline-block;
  width: 100%;

  &::after {
    content: '';
    position: absolute;
    bottom: -12px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background: $gradient-cta;
    border-radius: 2px;
  }

  @media (max-width: $breakpoint-mobile) { font-size: $font-size-xxl; }
}

.section-subtitle {
  font-size: $font-size-lg;
  text-align: center;
  color: $text-secondary;
  margin-bottom: $spacing-xl;
  margin-top: $spacing-lg;
}

.news {
  padding: $section-padding-y 0;
  background: $bg-card;

  &__grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: $spacing-lg;
    margin-bottom: $spacing-xl;

    @media (max-width: $breakpoint-tablet) { grid-template-columns: 1fr; }
  }

  &__more { text-align: center; }

  &__more-link {
    color: $primary;
    text-decoration: none;
    font-weight: $font-weight-medium;
    position: relative;
    padding-bottom: 2px;
    transition: all 0.3s ease;

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 0;
      height: 2px;
      background: $primary;
      transition: width 0.3s ease;
    }

    &:hover::after { width: 100%; }
  }
}

.news-card {
  background: $bg-secondary;
  padding: $spacing-lg;
  border-radius: $border-radius-md;
  border: 1px solid $border-color;
  transition: all $transition-base;
  cursor: pointer;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 4px;
    background: $gradient-cta;
    transform: scaleY(0);
    transition: transform 0.3s ease;
  }

  &:hover {
    border-color: $primary;
    box-shadow: 0 8px 25px rgba($primary, 0.1);
    transform: translateX(4px);

    &::before { transform: scaleY(1); }
  }

  &__category {
    display: inline-block;
    padding: $spacing-xs $spacing-sm;
    background: $gradient-cta;
    color: $text-light;
    border-radius: $border-radius-sm;
    font-size: $font-size-xs;
    margin-bottom: $spacing-sm;
    font-weight: $font-weight-medium;
  }

  &__title {
    font-size: $font-size-base;
    font-weight: $font-weight-semibold;
    color: $text-primary;
    margin-bottom: $spacing-sm;
    line-height: $line-height-normal;
    transition: color 0.3s ease;

    .news-card:hover & { color: $primary; }
  }

  &__excerpt {
    font-size: $font-size-sm;
    color: $text-secondary;
    margin-bottom: $spacing-sm;
    line-height: $line-height-relaxed;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  &__date {
    font-size: $font-size-sm;
    color: $text-muted;
  }
}

.animate-on-scroll {
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.8s ease-out, transform 0.8s ease-out;

  &.animated { opacity: 1; transform: translateY(0); }
}

.animate-delay {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;

  .animated & { opacity: 1; transform: translateY(0); }
}
</style>
