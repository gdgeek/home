<template>
  <div class="scene-card card">
    <div class="scene-card__image-wrapper">
      <img
        :src="image"
        :alt="subject"
        class="scene-card__image"
        loading="lazy"
      />
      <div class="scene-card__overlay">
        <span class="scene-card__subject">{{ subject }}</span>
      </div>
    </div>
    <div class="scene-card__content">
      <h3 class="scene-card__title">{{ subject }}</h3>
      <p class="scene-card__description">{{ description }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * SceneCard组件
 * 展示学科应用场景的卡片组件
 * 
 * @description 包含学科名称、场景图片和应用描述
 * @requirements 4.3 - THE Scene_Card SHALL 包含学科名称、场景图片和应用描述
 */
import type { SceneCardProps } from '@/types'

// Define props with TypeScript interface
defineProps<SceneCardProps>()
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;

.scene-card {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: 100%;
  
  &__image-wrapper {
    position: relative;
    width: 100%;
    padding-top: 66.67%; // 3:2 aspect ratio
    overflow: hidden;
    
    @include mobile {
      padding-top: 56.25%; // 16:9 aspect ratio on mobile
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
  
  &__overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0.4) 100%
    );
    @include flex-center;
    opacity: 0;
    transition: opacity $transition-duration-base $transition-timing-ease-in-out;
  }
  
  &__subject {
    color: $color-bg-white;
    font-size: $font-size-xl;
    font-weight: $font-weight-bold;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    transform: translateY(10px);
    transition: transform $transition-duration-base $transition-timing-ease-in-out;
    
    @include mobile {
      font-size: $font-size-lg;
    }
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
  
  &__title {
    font-size: $font-size-lg;
    font-weight: $font-weight-semibold;
    color: $color-text-primary;
    margin-bottom: $spacing-sm;
    
    @include mobile {
      font-size: $font-size-base;
    }
  }
  
  &__description {
    font-size: $font-size-sm;
    color: $color-text-secondary;
    line-height: $line-height-relaxed;
    @include text-clamp(3);
    
    @include mobile {
      font-size: $font-size-xs;
      @include text-clamp(2);
    }
  }
  
  // Hover effects
  &:hover {
    .scene-card__image {
      transform: scale(1.08);
    }
    
    .scene-card__overlay {
      opacity: 1;
    }
    
    .scene-card__subject {
      transform: translateY(0);
    }
    
    .scene-card__title {
      color: $color-primary;
    }
  }
}
</style>
