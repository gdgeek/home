<template>
  <div class="value-card card">
    <div class="value-card__icon">
      <!-- Support both Element Plus icon names and image URLs -->
      <img
        v-if="isImageUrl"
        :src="icon"
        :alt="title"
        class="value-card__icon-image"
      />
      <el-icon v-else :size="48" class="value-card__icon-element">
        <component :is="iconComponent" />
      </el-icon>
    </div>
    <div class="value-card__content">
      <h3 class="value-card__title">{{ title }}</h3>
      <p class="value-card__description">{{ description }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * ValueCard组件
 * 展示核心价值的卡片组件
 * 
 * @description 包含图标、标题和描述文字
 * @requirements 2.3 - THE Value_Card SHALL 包含图标、标题和描述文字
 */
import { computed, defineAsyncComponent, type Component } from 'vue'
import { ElIcon } from 'element-plus'
import type { ValueCardProps } from '@/types'

// Define props with TypeScript interface
const props = defineProps<ValueCardProps>()

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
 * Supports icon names like 'User', 'Star', 'School', etc.
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

.value-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: $spacing-xl;
  height: 100%;
  
  @include mobile {
    padding: $spacing-lg;
  }
  
  &__icon {
    @include flex-center;
    width: 80px;
    height: 80px;
    margin-bottom: $spacing-lg;
    border-radius: $border-radius-circle;
    background: $color-primary-light-9;
    color: $color-primary;
    transition: $transition-base;
    
    @include mobile {
      width: 64px;
      height: 64px;
      margin-bottom: $spacing-md;
    }
  }
  
  &__icon-image {
    width: 48px;
    height: 48px;
    object-fit: contain;
    
    @include mobile {
      width: 36px;
      height: 36px;
    }
  }
  
  &__icon-element {
    color: $color-primary;
  }
  
  &__content {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  
  &__title {
    font-size: $font-size-xl;
    font-weight: $font-weight-semibold;
    color: $color-text-primary;
    margin-bottom: $spacing-sm;
    
    @include mobile {
      font-size: $font-size-lg;
    }
  }
  
  &__description {
    font-size: $font-size-base;
    color: $color-text-secondary;
    line-height: $line-height-relaxed;
    
    @include mobile {
      font-size: $font-size-sm;
    }
  }
  
  // Hover effect from global.scss card styles
  &:hover {
    .value-card__icon {
      background: $color-primary-light-8;
      transform: scale(1.05);
    }
  }
}
</style>
