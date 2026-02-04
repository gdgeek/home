<template>
  <div class="feature-card card">
    <div class="feature-card__icon">
      <!-- Support both Element Plus icon names and image URLs -->
      <img
        v-if="isImageUrl"
        :src="icon"
        :alt="title"
        class="feature-card__icon-image"
      />
      <el-icon v-else :size="40" class="feature-card__icon-element">
        <component :is="iconComponent" />
      </el-icon>
    </div>
    <div class="feature-card__content">
      <h3 class="feature-card__title">{{ title }}</h3>
      <p class="feature-card__description">{{ description }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * FeatureCard组件
 * 展示核心功能的卡片组件
 * 
 * @description 包含图标、功能名称和功能描述
 * @requirements 3.3 - THE Feature_Card SHALL 包含图标、功能名称和功能描述
 */
import { computed, defineAsyncComponent, type Component } from 'vue'
import { ElIcon } from 'element-plus'
import type { FeatureCardProps } from '@/types'

// Define props with TypeScript interface
const props = defineProps<FeatureCardProps>()

/**
 * Check if the icon prop is an image URL
 */
const isImageUrl = computed(() => {
  return props.icon.startsWith('http://') || 
         props.icon.startsWith('https://') || 
         props.icon.startsWith('/') ||
         props.icon.startsWith('./') ||
         props.icon.startsWith('data:')
})

/**
 * Dynamically resolve Element Plus icon component
 * Supports icon names like 'Picture', 'Edit', 'Share', 'Folder', etc.
 */
const iconComponent = computed<Component | null>(() => {
  if (isImageUrl.value) {
    return null
  }
  
  // Dynamically import Element Plus icons
  return defineAsyncComponent(() => 
    import('@element-plus/icons-vue').then((icons) => {
      const iconName = props.icon as keyof typeof icons
      return icons[iconName] || icons['QuestionFilled']
    })
  )
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;

.feature-card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: $spacing-xl;
  height: 100%;
  position: relative;
  overflow: hidden;
  
  // Decorative gradient accent
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 0;
    background: $gradient-primary;
    transition: height $transition-duration-base $transition-timing-ease-in-out;
  }
  
  @include mobile {
    padding: $spacing-lg;
  }
  
  &__icon {
    @include flex-center;
    width: 64px;
    height: 64px;
    margin-bottom: $spacing-lg;
    border-radius: $border-radius-base;
    background: $gradient-primary;
    color: $color-bg-white;
    transition: $transition-base;
    
    @include mobile {
      width: 52px;
      height: 52px;
      margin-bottom: $spacing-md;
    }
  }
  
  &__icon-image {
    width: 32px;
    height: 32px;
    object-fit: contain;
    filter: brightness(0) invert(1); // Make image white on gradient background
    
    @include mobile {
      width: 28px;
      height: 28px;
    }
  }
  
  &__icon-element {
    color: $color-bg-white;
  }
  
  &__content {
    flex: 1;
    display: flex;
    flex-direction: column;
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
    
    @include mobile {
      font-size: $font-size-xs;
    }
  }
  
  // Hover effects
  &:hover {
    &::before {
      height: 100%;
    }
    
    .feature-card__icon {
      transform: scale(1.1) rotate(-5deg);
      box-shadow: $shadow-md;
    }
    
    .feature-card__title {
      color: $color-primary;
    }
  }
}
</style>
