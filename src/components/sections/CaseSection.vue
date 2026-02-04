<template>
  <section id="case-section" class="case-section section">
    <div class="container">
      <!-- Section Title - Requirement 5.1 -->
      <div class="section-title">
        <h2 class="case-section__title animate-fade-in-down">
          已有上千所校园，用星扣解锁AR教学新体验
        </h2>
        <p class="case-section__subtitle section-subtitle animate-fade-in">
          来自全国各地的学校正在使用星扣AR创作平台，探索教育创新的无限可能
        </p>
      </div>
      
      <!-- Case Cards Grid - Requirement 5.2 -->
      <div class="case-section__grid">
        <div
          v-for="(caseItem, index) in caseItems"
          :key="index"
          class="case-section__item animate-fade-in-up"
          :style="{ animationDelay: `${index * 0.1}s` }"
        >
          <CaseCard
            :school-name="caseItem.schoolName"
            :description="caseItem.description"
            :image="caseItem.image"
            :tags="caseItem.tags"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
/**
 * CaseSection组件
 * 用户案例板块，展示真实学校使用案例
 * 
 * @description 显示3-4个CaseCard展示真实案例，包含id属性用于滚动定位
 * @requirements 5.1, 5.2
 */
import { reactive } from 'vue'
import CaseCard from '@/components/common/CaseCard.vue'
import type { CaseItem } from '@/types'

/**
 * 用户案例数据
 * Requirement 5.2: 显示3-4个Case_Card展示真实案例
 */
const caseItems = reactive<CaseItem[]>([
  {
    schoolName: '北京市第一中学',
    description: '通过星扣AR平台，我们将生物课的细胞结构、人体器官等抽象概念转化为3D立体模型，学生可以360度观察和互动，大大提升了学习兴趣和理解深度。',
    image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&h=450&fit=crop',
    tags: ['生物教学', 'AR互动', '重点中学']
  },
  {
    schoolName: '上海市实验小学',
    description: '我们利用星扣平台开发了一系列AR历史课程，让学生"穿越"到古代文明现场，亲眼见证长城修建、丝绸之路等历史场景，历史课变得生动有趣。',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=450&fit=crop',
    tags: ['历史教学', '沉浸体验', '示范学校']
  },
  {
    schoolName: '深圳市科技高级中学',
    description: '物理实验课引入AR技术后，学生可以安全地观察电磁场、光学折射等现象，原本危险或难以展示的实验都能在AR环境中完美呈现。',
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=800&h=450&fit=crop',
    tags: ['物理实验', '安全教学', '科技特色']
  },
  {
    schoolName: '杭州市艺术学校',
    description: '美术课上，学生使用星扣AR创作自己的3D艺术作品，从平面绘画到立体雕塑，AR技术为艺术教育打开了全新的创作维度。',
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&h=450&fit=crop',
    tags: ['艺术创作', '3D建模', '特色教育']
  }
])
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;

.case-section {
  background-color: $color-bg-white;
  
  &__title {
    color: $color-text-primary;
    margin-bottom: $spacing-sm;
  }
  
  &__subtitle {
    max-width: 700px;
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
