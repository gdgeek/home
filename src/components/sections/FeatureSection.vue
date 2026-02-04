<template>
  <section class="feature-section section">
    <div class="container">
      <!-- Section Title - Requirement 3.1 -->
      <div class="section-title">
        <h2 class="feature-section__title animate-fade-in-down">
          简单操作，解锁教育AR无限可能
        </h2>
        <p class="feature-section__subtitle section-subtitle animate-fade-in">
          四大核心功能，助力教育创新
        </p>
      </div>
      
      <!-- Feature Cards Grid - Requirement 3.2 -->
      <div class="feature-section__grid">
        <div
          v-for="(feature, index) in featureItems"
          :key="index"
          class="feature-section__item animate-fade-in-up"
          :style="{ animationDelay: `${index * 0.1}s` }"
        >
          <FeatureCard
            :icon="feature.icon"
            :title="feature.title"
            :description="feature.description"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
/**
 * FeatureSection组件
 * 核心功能板块，展示平台的四大核心功能
 * 
 * @description 显示四张FeatureCard分别展示"教育专属素材库"、"零门槛编辑器"、"一键分享互动"、"作品管理中心"
 * @requirements 3.1, 3.2
 */
import { reactive } from 'vue'
import FeatureCard from '@/components/common/FeatureCard.vue'
import type { FeatureItem } from '@/types'

/**
 * 核心功能数据
 * Requirement 3.2: 四张Feature_Card分别展示"教育专属素材库"、"零门槛编辑器"、"一键分享互动"、"作品管理中心"
 */
const featureItems = reactive<FeatureItem[]>([
  {
    icon: 'Picture',
    title: '教育专属素材库',
    description: '海量教育场景3D模型、动画素材，覆盖K12全学科。持续更新的素材库，让AR内容创作更轻松。'
  },
  {
    icon: 'Edit',
    title: '零门槛编辑器',
    description: '可视化拖拽操作，无需编程基础。简单几步即可完成AR内容制作，让每位教师都能成为AR创作者。'
  },
  {
    icon: 'Share',
    title: '一键分享互动',
    description: '作品一键生成分享链接或二维码，学生扫码即可体验。支持多人同时互动，让课堂更加生动有趣。'
  },
  {
    icon: 'Folder',
    title: '作品管理中心',
    description: '统一管理所有AR作品，支持分类整理、版本管理。便捷的作品库让教学资源积累更有序。'
  }
])
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;

.feature-section {
  background-color: $color-bg-white;
  
  &__title {
    color: $color-text-primary;
    margin-bottom: $spacing-sm;
  }
  
  &__subtitle {
    max-width: 600px;
    margin: 0 auto;
  }
  
  // Responsive grid layout
  // Requirement 10.1, 10.2, 10.3: 4 columns desktop, 2 tablet, 1 mobile
  &__grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: $spacing-lg;
    
    @include tablet {
      grid-template-columns: repeat(2, 1fr);
    }
    
    @include mobile {
      grid-template-columns: 1fr;
      gap: $spacing-md;
    }
  }
  
  &__item {
    height: 100%;
    
    // Staggered animation
    @for $i from 1 through 4 {
      &:nth-child(#{$i}) {
        animation-delay: #{($i - 1) * 0.1}s;
      }
    }
  }
}
</style>
