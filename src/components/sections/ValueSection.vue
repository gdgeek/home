<template>
  <section class="value-section section">
    <div class="container">
      <!-- Section Title - Requirement 2.1 -->
      <div class="section-title">
        <h2 class="value-section__title animate-fade-in-down">
          以AR之力，重构教育表达
        </h2>
        <p class="value-section__subtitle section-subtitle animate-fade-in">
          为教师、学生和校园量身打造的AR创作解决方案
        </p>
      </div>
      
      <!-- Value Cards Grid - Requirement 2.2 -->
      <div class="value-section__grid">
        <div
          v-for="(value, index) in valueItems"
          :key="index"
          class="value-section__item animate-fade-in-up"
          :style="{ animationDelay: `${index * 0.1}s` }"
        >
          <ValueCard
            :icon="value.icon"
            :title="value.title"
            :description="value.description"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
/**
 * ValueSection组件
 * 核心价值板块，展示平台对不同角色的价值
 * 
 * @description 显示三张ValueCard分别展示"教师专属"、"学生友好"、"校园适配"价值
 * @requirements 2.1, 2.2
 */
import { reactive } from 'vue'
import ValueCard from '@/components/common/ValueCard.vue'
import type { ValueItem } from '@/types'

/**
 * 核心价值数据
 * Requirement 2.2: 三张Value_Card分别展示"教师专属"、"学生友好"、"校园适配"价值
 */
const valueItems = reactive<ValueItem[]>([
  {
    icon: 'User',
    title: '教师专属',
    description: '专为教育工作者设计的AR创作工具，无需编程基础，轻松将教学内容转化为沉浸式AR体验，让备课更高效、授课更生动。'
  },
  {
    icon: 'Star',
    title: '学生友好',
    description: '直观易用的交互界面，激发学生学习兴趣。通过AR技术让抽象知识可视化，帮助学生更好地理解和记忆复杂概念。'
  },
  {
    icon: 'School',
    title: '校园适配',
    description: '针对校园环境深度优化，支持多终端部署，兼容主流教学设备。提供完善的管理后台，方便学校统一管理和监控。'
  }
])
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;

.value-section {
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
  // Requirement 10.1, 10.2, 10.3: 3 columns desktop, 2 tablet, 1 mobile
  &__grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
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
    @for $i from 1 through 3 {
      &:nth-child(#{$i}) {
        animation-delay: #{($i - 1) * 0.1}s;
      }
    }
  }
}
</style>
