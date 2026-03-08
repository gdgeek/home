<script setup lang="ts">
import { Cpu, VideoCamera, OfficeBuilding, School } from '@element-plus/icons-vue'

const sceneItems = [
  { icon: Cpu, title: '医疗护理', description: '婴幼儿护理、外伤处理等医疗科普', tag: '医疗', image: '/images/ar-platform/婴幼儿护理 外伤处理.webp' },
  { icon: VideoCamera, title: '口腔教学', description: '窝沟封闭等口腔医疗操作培训', tag: '口腔', image: '/images/ar-platform/AR医疗 窝沟封闭.webp' },
  { icon: OfficeBuilding, title: '工业展示', description: '掘进机等大型设备1:1还原展示', tag: '工业', image: '/images/ar-platform/AR掘进机展示.webp' },
  { icon: School, title: '互动游戏', description: '多人AR游戏，寓教于乐', tag: '游戏', image: '/images/ar-platform/多人AR游戏，三方视角.webp' }
]

const caseItems = [
  { company: '北京市第四中学', quote: '星扣AR让物理课堂焕然一新，学生学习兴趣大幅提升。', author: '张老师', role: '物理科教学组长' },
  { company: '上海交通大学附属中学', quote: '学生使用iPad和Rokid AR眼镜进行创作，培养了创新思维和动手能力。', author: '李主任', role: 'STEAM教育负责人' },
  { company: '深圳中学', quote: '零门槛的操作让每位老师都能轻松制作AR课件，大大提升了备课效率。', author: '王校长', role: '教务主任' }
]
</script>

<template>
  <!-- Scene Section -->
  <section id="scene" class="scene animate-on-scroll">
    <div class="section-container">
      <h2 class="section-title">AR赋能全学科，适配多元教学场景</h2>
      <p class="section-subtitle">从医疗到工业，从教育到娱乐，AR让每个场景都生动起来</p>
      <div class="scene__grid">
        <div
          v-for="(item, index) in sceneItems"
          :key="index"
          class="scene-card animate-delay"
          :style="{ animationDelay: `${index * 0.12}s` }"
        >
          <div class="scene-card__image">
            <img :src="item.image" :alt="item.title" loading="lazy" width="300" height="160" />
            <span class="scene-card__tag">{{ item.tag }}</span>
          </div>
          <div class="scene-card__content">
            <div class="scene-card__icon">
              <component :is="item.icon" :size="32" />
            </div>
            <h3 class="scene-card__title">{{ item.title }}</h3>
            <p class="scene-card__desc">{{ item.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Case Section -->
  <section id="case" class="case animate-on-scroll">
    <div class="section-container">
      <h2 class="section-title">已有众多校园，用星扣解锁AR教学新体验</h2>
      <p class="section-subtitle">听听他们怎么说</p>
      <div class="case__grid">
        <div
          v-for="(item, index) in caseItems"
          :key="index"
          class="case-card animate-delay"
          :style="{ animationDelay: `${index * 0.18}s` }"
        >
          <p class="case-card__quote">"{{ item.quote }}"</p>
          <div class="case-card__author">
            <span class="case-card__name">{{ item.author }}</span>
            <span class="case-card__role">{{ item.role }}</span>
            <span class="case-card__company">{{ item.company }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/xingkou/variables' as xk;

$primary: xk.$xingkou-primary;
$bg-card: xk.$xingkou-bg-card;
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
$spacing-xxl: xk.$xingkou-spacing-xxl;
$font-size-xs: xk.$xingkou-font-size-xs;
$font-size-sm: xk.$xingkou-font-size-sm;
$font-size-base: xk.$xingkou-font-size-base;
$font-size-lg: xk.$xingkou-font-size-lg;
$font-size-xl: xk.$xingkou-font-size-xl;
$font-size-xxl: xk.$xingkou-font-size-xxl;
$font-size-xxxl: xk.$xingkou-font-size-xxxl;
$font-weight-medium: xk.$xingkou-font-weight-medium;
$font-weight-semibold: xk.$xingkou-font-weight-semibold;
$font-weight-bold: xk.$xingkou-font-weight-bold;
$border-radius-sm: xk.$xingkou-border-radius-sm;
$border-radius-md: xk.$xingkou-border-radius-md;
$border-radius-lg: xk.$xingkou-border-radius-lg;
$transition-base: xk.$xingkou-transition-base;
$breakpoint-mobile: xk.$xingkou-breakpoint-mobile;
$breakpoint-tablet: xk.$xingkou-breakpoint-tablet;
$breakpoint-desktop: xk.$xingkou-breakpoint-desktop;
$container-max-width: xk.$xingkou-container-max-width;
$container-padding: xk.$xingkou-container-padding;
$section-padding-y: xk.$xingkou-section-padding-y;
$line-height-relaxed: 1.75;
$line-height-normal: 1.5;
$ease-out: cubic-bezier(0.16, 1, 0.3, 1);

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
  margin-bottom: $spacing-xxl;
  margin-top: $spacing-lg;
}

.scene {
  padding: $section-padding-y 0;
  background: $bg-card;

  &__grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: $spacing-lg;

    @media (max-width: $breakpoint-desktop) { grid-template-columns: repeat(2, 1fr); }
    @media (max-width: $breakpoint-mobile) { grid-template-columns: 1fr; }
  }
}

.scene-card {
  background: $bg-card;
  border-radius: $border-radius-md;
  overflow: hidden;
  border: 1px solid $border-color;
  transition: all $transition-base $ease-out;
  cursor: pointer;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: $gradient-cta;
    opacity: 0;
    transition: opacity 0.4s ease;
    z-index: 1;
    pointer-events: none;
  }

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba($primary, 0.15);
    border-color: rgba($primary, 0.4);

    &::before { opacity: 0.05; }
  }

  &__image {
    position: relative;
    height: 160px;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s ease;
    }

    .scene-card:hover & img { transform: scale(1.15); }
  }

  &__tag {
    position: absolute;
    top: $spacing-sm;
    left: $spacing-sm;
    padding: $spacing-xs $spacing-sm;
    background: $gradient-cta;
    color: $text-light;
    border-radius: $border-radius-sm;
    font-size: $font-size-xs;
    box-shadow: 0 2px 8px rgba($primary, 0.3);
    z-index: 2;
    font-weight: $font-weight-medium;
  }

  &__content {
    padding: $spacing-md;
    position: relative;
    z-index: 2;
  }

  &__icon {
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: $gradient-cta;
    border-radius: $border-radius-md;
    color: $text-light;
    margin-bottom: $spacing-sm;
    box-shadow: 0 4px 12px rgba($primary, 0.25);
    transition: all 0.3s ease;

    :deep(svg) { width: 24px !important; height: 24px !important; }

    .scene-card:hover & {
      transform: scale(1.1) rotate(5deg);
      box-shadow: 0 6px 16px rgba($primary, 0.35);
    }
  }

  &__title {
    font-size: $font-size-base;
    font-weight: $font-weight-semibold;
    margin-bottom: $spacing-xs;
    color: $text-primary;
    transition: color 0.3s ease;

    .scene-card:hover & { color: $primary; }
  }

  &__desc {
    font-size: $font-size-sm;
    color: $text-secondary;
  }
}

.case {
  padding: $section-padding-y 0;
  background: $bg-card;

  &__grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: $spacing-xl;

    @media (max-width: $breakpoint-tablet) { grid-template-columns: 1fr; }
  }
}

.case-card {
  background: $bg-card;
  padding: $spacing-xl;
  border-radius: $border-radius-lg;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  transition: all $transition-base;
  position: relative;
  overflow: hidden;

  &::before {
    content: '"';
    position: absolute;
    top: 10px;
    left: 20px;
    font-size: 80px;
    font-weight: bold;
    color: rgba($primary, 0.08);
    font-family: Georgia, serif;
    line-height: 1;
    pointer-events: none;
  }

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 16px 40px rgba($primary, 0.12);
  }

  &__quote {
    font-size: $font-size-base;
    color: $text-secondary;
    line-height: $line-height-relaxed;
    margin-bottom: $spacing-lg;
    font-style: italic;
    position: relative;
    z-index: 1;
  }

  &__author {
    display: flex;
    flex-direction: column;
    gap: $spacing-xs;
    position: relative;
    z-index: 1;
  }

  &__name {
    font-weight: $font-weight-semibold;
    color: $text-primary;
    font-size: $font-size-lg;
  }

  &__role {
    font-size: $font-size-sm;
    color: $text-muted;
  }

  &__company {
    font-size: $font-size-sm;
    color: $primary;
    font-weight: $font-weight-medium;
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
