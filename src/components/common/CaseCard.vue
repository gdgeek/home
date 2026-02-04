<template>
  <div class="case-card card">
    <div v-if="image" class="case-card__image-wrapper">
      <img
        :src="image"
        :alt="schoolName"
        class="case-card__image"
        loading="lazy"
      />
    </div>
    <div class="case-card__content">
      <h3 class="case-card__school-name">{{ schoolName }}</h3>
      <p class="case-card__description">{{ description }}</p>
      <div v-if="tags && tags.length > 0" class="case-card__tags">
        <span
          v-for="(tag, index) in tags"
          :key="index"
          class="case-card__tag"
        >
          {{ tag }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * CaseCard组件
 * 展示用户案例的卡片组件
 * 
 * @description 包含学校名称、案例描述和效果展示
 * @requirements 5.3 - THE Case_Card SHALL 包含学校名称、案例描述和效果展示
 */
import type { CaseCardProps } from '@/types'

// Define props with TypeScript interface
defineProps<CaseCardProps>()
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;

.case-card {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: 100%;
  cursor: pointer;
  
  &__image-wrapper {
    position: relative;
    width: 100%;
    padding-top: 56.25%; // 16:9 aspect ratio
    overflow: hidden;
    background: $color-bg-base;
    
    @include mobile {
      padding-top: 50%; // Slightly shorter on mobile
    }
  }
  
  &__image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform $transition-duration-base $transition-timing-ease-in-out;
  }
  
  &__content {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: $spacing-lg;
    
    @include mobile {
      padding: $spacing-md;
    }
  }
  
  &__school-name {
    font-size: $font-size-lg;
    font-weight: $font-weight-semibold;
    color: $color-text-primary;
    margin-bottom: $spacing-sm;
    transition: color $transition-duration-fast $transition-timing-ease-in-out;
    
    @include mobile {
      font-size: $font-size-base;
    }
  }
  
  &__description {
    font-size: $font-size-sm;
    color: $color-text-secondary;
    line-height: $line-height-relaxed;
    margin-bottom: $spacing-md;
    flex: 1;
    @include text-clamp(3);
    
    @include mobile {
      font-size: $font-size-xs;
      @include text-clamp(2);
      margin-bottom: $spacing-sm;
    }
  }
  
  &__tags {
    display: flex;
    flex-wrap: wrap;
    gap: $spacing-xs;
    margin-top: auto;
  }
  
  &__tag {
    display: inline-flex;
    align-items: center;
    padding: $spacing-xs $spacing-sm;
    font-size: $font-size-xs;
    color: $color-primary;
    background: $color-primary-light-7;
    border-radius: $border-radius-round;
    transition: $transition-fast;
    
    @include mobile {
      padding: 2px $spacing-xs;
      font-size: 10px;
    }
  }
  
  // Hover effects
  &:hover {
    .case-card__image {
      transform: scale(1.05);
    }
    
    .case-card__school-name {
      color: $color-primary;
    }
    
    .case-card__tag {
      background: $color-primary-light-6;
    }
  }
}
</style>
