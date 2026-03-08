<script setup lang="ts">
import { FolderOpened, EditPen, VideoCamera, View, School, User, OfficeBuilding } from '@element-plus/icons-vue'

const valueItems = [
  { icon: School, title: '教师赋能', description: '快速制作AR课件、互动实验及教学模型，提升课堂吸引力与教学效率' },
  { icon: User, title: '学生创作', description: '通过AR创作表达学习成果，培养空间思维、创新能力与表达能力' },
  { icon: OfficeBuilding, title: '校园部署', description: '低成本搭建AR教学环境，开展STEAM教育、科创活动' }
]

const featureItems = [
  { icon: FolderOpened, title: '海量教育素材库', description: '覆盖K12全学科3D模型，与课本同步更新', image: '/images/ar-platform/UGC场景编辑器界面.webp' },
  { icon: EditPen, title: '可视化编辑器', description: '所见即所得，零代码创作AR内容', image: '/images/ar-platform/拖拽程序生成工具.webp' },
  { icon: View, title: '第三方视角投屏', description: '教师可通过平板查看学生AR视角，辅助课堂教学指导', image: '/images/ar-platform/三方视角，用户操作AR医疗头骨内容.webp' },
  { icon: VideoCamera, title: '多终端支持', description: 'iPad、Rokid AR眼镜全面适配', image: '/images/ar-platform/女士操作Rokid AR Studio.webp' }
]
</script>

<template>
  <!-- Value Section -->
  <section id="value" class="value animate-on-scroll">
    <div class="section-container">
      <h2 class="section-title">以AR之力，重构教育表达</h2>
      <p class="section-subtitle">我们为教育场景，重新定义AR创作</p>
      <div class="value__grid">
        <div
          v-for="(item, index) in valueItems"
          :key="index"
          class="value-card animate-delay"
          :style="{ animationDelay: `${index * 0.15}s` }"
        >
          <div class="value-card__icon">
            <component :is="item.icon" :size="32" />
          </div>
          <h3 class="value-card__title">{{ item.title }}</h3>
          <p class="value-card__desc">{{ item.description }}</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Feature Section -->
  <section id="feature" class="feature animate-on-scroll">
    <div class="section-container">
      <h2 class="section-title">简单操作，解锁教育AR无限可能</h2>
      <p class="section-subtitle">零门槛操作，让每位师生都能轻松创作</p>
      <div class="feature__grid">
        <div
          v-for="(item, index) in featureItems"
          :key="index"
          class="feature-card animate-delay"
          :style="{ animationDelay: `${index * 0.2}s` }"
        >
          <div class="feature-card__image">
            <img :src="item.image" :alt="item.title" loading="lazy" width="400" height="220" />
          </div>
          <div class="feature-card__content">
            <div class="feature-card__icon">
              <component :is="item.icon" :size="24" />
            </div>
            <h3 class="feature-card__title">{{ item.title }}</h3>
            <p class="feature-card__desc">{{ item.description }}</p>
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
$bg-secondary: xk.$xingkou-bg-secondary;
$text-primary: xk.$xingkou-text-primary;
$text-secondary: xk.$xingkou-text-secondary;
$text-light: xk.$xingkou-text-light;
$border-color: xk.$xingkou-border-color;
$gradient-cta: xk.$xingkou-gradient-cta;
$gradient-card: xk.$xingkou-gradient-card;
$spacing-sm: xk.$xingkou-spacing-sm;
$spacing-md: xk.$xingkou-spacing-md;
$spacing-lg: xk.$xingkou-spacing-lg;
$spacing-xl: xk.$xingkou-spacing-xl;
$spacing-xxl: xk.$xingkou-spacing-xxl;
$font-size-base: xk.$xingkou-font-size-base;
$font-size-lg: xk.$xingkou-font-size-lg;
$font-size-xl: xk.$xingkou-font-size-xl;
$font-size-xxl: xk.$xingkou-font-size-xxl;
$font-size-xxxl: xk.$xingkou-font-size-xxxl;
$font-weight-semibold: xk.$xingkou-font-weight-semibold;
$font-weight-bold: xk.$xingkou-font-weight-bold;
$border-radius-md: xk.$xingkou-border-radius-md;
$border-radius-lg: xk.$xingkou-border-radius-lg;
$transition-base: xk.$xingkou-transition-base;
$breakpoint-mobile: xk.$xingkou-breakpoint-mobile;
$breakpoint-tablet: xk.$xingkou-breakpoint-tablet;
$container-max-width: xk.$xingkou-container-max-width;
$container-padding: xk.$xingkou-container-padding;
$section-padding-y: xk.$xingkou-section-padding-y;
$line-height-relaxed: 1.75;
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

.value {
  padding: $section-padding-y 0;
  background: $bg-card;

  &__grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: $spacing-xl;

    @media (max-width: $breakpoint-tablet) { grid-template-columns: 1fr; }
  }
}

.value-card {
  text-align: center;
  padding: $spacing-xl;
  background: $gradient-card;
  border-radius: $border-radius-lg;
  border: 1px solid $border-color;
  transition: all $transition-base $ease-out;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: $gradient-cta;
    transform: scaleX(0);
    transition: transform 0.4s ease;
  }

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba($primary, 0.15);
    border-color: rgba($primary, 0.3);

    &::before { transform: scaleX(1); }
  }

  &__icon {
    width: 64px;
    height: 64px;
    margin: 0 auto $spacing-lg;
    display: flex;
    align-items: center;
    justify-content: center;
    background: $gradient-cta;
    border-radius: 50%;
    color: $text-light;
    box-shadow: 0 8px 20px rgba($primary, 0.3);
    transition: all $transition-base;
    position: relative;
    z-index: 1;

    :deep(svg) { width: 32px !important; height: 32px !important; }

    .value-card:hover & {
      transform: scale(1.1) rotate(5deg);
      box-shadow: 0 12px 30px rgba($primary, 0.4);
    }
  }

  &__title {
    font-size: $font-size-xl;
    font-weight: $font-weight-semibold;
    margin-bottom: $spacing-sm;
    color: $text-primary;
    position: relative;
    z-index: 1;
  }

  &__desc {
    font-size: $font-size-base;
    color: $text-secondary;
    line-height: $line-height-relaxed;
    position: relative;
    z-index: 1;
  }
}

.feature {
  padding: $section-padding-y 0;
  background: $bg-secondary;

  &__grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: $spacing-xl;

    @media (max-width: $breakpoint-tablet) { grid-template-columns: 1fr; }
  }
}

.feature-card {
  background: $bg-card;
  border-radius: $border-radius-lg;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  transition: all $transition-base $ease-out;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border: 2px solid transparent;
    border-radius: $border-radius-lg;
    transition: all $transition-base;
    pointer-events: none;
  }

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 50px rgba($primary, 0.15);

    &::after { border-color: rgba($primary, 0.3); }
  }

  &__image {
    height: 220px;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.6s ease;
    }

    .feature-card:hover & img { transform: scale(1.1); }
  }

  &__content {
    padding: $spacing-lg;
    position: relative;
    z-index: 1;
  }

  &__icon {
    width: 40px;
    height: 40px;
    margin-bottom: $spacing-sm;
    display: flex;
    align-items: center;
    justify-content: center;
    background: $gradient-cta;
    border-radius: $border-radius-md;
    color: $text-light;
    box-shadow: 0 4px 12px rgba($primary, 0.25);
    transition: transform 0.3s ease;

    :deep(svg) { width: 20px !important; height: 20px !important; }

    .feature-card:hover & { transform: scale(1.1); }
  }

  &__title {
    font-size: $font-size-lg;
    font-weight: $font-weight-semibold;
    margin-bottom: $spacing-sm;
    color: $text-primary;
  }

  &__desc {
    font-size: $font-size-base;
    color: $text-secondary;
    line-height: $line-height-relaxed;
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
