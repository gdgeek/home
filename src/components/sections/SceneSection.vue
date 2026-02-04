<template>
  <section class="scene-section section">
    <div class="container">
      <!-- Section Title - Requirement 4.1 -->
      <div class="section-title">
        <h2 class="scene-section__title animate-fade-in-down">
          AR赋能全学科，适配多元教学场景
        </h2>
        <p class="scene-section__subtitle section-subtitle animate-fade-in">
          覆盖K12全学科，让每一堂课都充满惊喜
        </p>
      </div>
      
      <!-- Scene Cards Grid - Requirement 4.2 -->
      <div class="scene-section__grid">
        <div
          v-for="(scene, index) in sceneItems"
          :key="index"
          class="scene-section__item animate-fade-in-up"
          :style="{ animationDelay: `${index * 0.1}s` }"
        >
          <SceneCard
            :subject="scene.subject"
            :image="scene.image"
            :description="scene.description"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
/**
 * SceneSection组件
 * 场景化展示板块，展示AR在不同学科的应用场景
 * 
 * @description 显示至少5个学科场景卡片（生物课、物理课、化学课、历史课、美术课）
 * @requirements 4.1, 4.2
 */
import { reactive } from 'vue'
import SceneCard from '@/components/common/SceneCard.vue'
import type { SceneItem } from '@/types'

/**
 * 学科场景数据
 * Requirement 4.2: 显示至少5个学科场景卡片（生物课、物理课、化学课、历史课、美术课）
 */
const sceneItems = reactive<SceneItem[]>([
  {
    subject: '生物课',
    image: 'https://picsum.photos/400/300?random=1',
    description: '通过AR技术将细胞结构、人体器官、动植物解剖等内容立体呈现，让学生直观观察生命的奥秘，深入理解生物学概念。'
  },
  {
    subject: '物理课',
    image: 'https://picsum.photos/400/300?random=2',
    description: '将抽象的物理现象可视化，如电磁场、力学运动、光学原理等，帮助学生建立直观的物理模型，加深对物理规律的理解。'
  },
  {
    subject: '化学课',
    image: 'https://picsum.photos/400/300?random=3',
    description: '安全模拟化学实验过程，展示分子结构和化学反应，让学生在零风险环境下探索化学世界，激发科学探究兴趣。'
  },
  {
    subject: '历史课',
    image: 'https://picsum.photos/400/300?random=4',
    description: '重现历史场景和文物古迹，让学生身临其境感受历史事件，通过沉浸式体验加深对历史文化的理解和记忆。'
  },
  {
    subject: '美术课',
    image: 'https://picsum.photos/400/300?random=5',
    description: '将艺术作品立体化展示，让学生从多角度欣赏名画雕塑，激发艺术创作灵感，培养审美能力和创造力。'
  }
])
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;

.scene-section {
  background-color: $color-bg-page;
  
  &__title {
    color: $color-text-primary;
    margin-bottom: $spacing-sm;
  }
  
  &__subtitle {
    max-width: 600px;
    margin: 0 auto;
  }
  
  // Responsive grid layout
  // Requirement 10.1, 10.2, 10.3: 5 columns desktop, 3 tablet, 2 mobile
  &__grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: $spacing-lg;
    
    @include tablet {
      grid-template-columns: repeat(3, 1fr);
    }
    
    @include mobile {
      grid-template-columns: repeat(2, 1fr);
      gap: $spacing-md;
    }
  }
  
  &__item {
    height: 100%;
    
    // Staggered animation
    @for $i from 1 through 5 {
      &:nth-child(#{$i}) {
        animation-delay: #{($i - 1) * 0.1}s;
      }
    }
  }
}
</style>
