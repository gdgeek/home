<template>
  <div class="news-module">
    <!-- Loading State - Requirement 8.4 -->
    <div v-if="loading" class="news-module__loading">
      <el-skeleton :rows="3" animated class="news-module__skeleton" />
      <el-skeleton :rows="3" animated class="news-module__skeleton" />
      <el-skeleton :rows="3" animated class="news-module__skeleton" />
    </div>

    <!-- Error State - Requirement 8.3 -->
    <div v-else-if="error" class="news-module__error">
      <el-icon :size="48" class="news-module__error-icon">
        <WarningFilled />
      </el-icon>
      <p class="news-module__error-message">{{ error }}</p>
      <el-button type="primary" @click="handleRetry">
        <el-icon class="news-module__retry-icon">
          <RefreshRight />
        </el-icon>
        重新加载
      </el-button>
    </div>

    <!-- Empty State -->
    <div v-else-if="news.length === 0" class="news-module__empty">
      <el-icon :size="48" class="news-module__empty-icon">
        <Document />
      </el-icon>
      <p class="news-module__empty-message">暂无新闻</p>
    </div>

    <!-- News List - Requirement 8.2 -->
    <div v-else class="news-module__list">
      <div
        v-for="item in news"
        :key="item.id"
        class="news-module__item"
      >
        <div class="news-module__item-header">
          <span class="news-module__category">{{ item.category.name }}</span>
          <span class="news-module__date">{{ formatDate(item.date) }}</span>
        </div>
        <h4 class="news-module__title">
          <a :href="item.link" target="_blank" rel="noopener noreferrer">
            {{ item.title }}
          </a>
        </h4>
        <p class="news-module__excerpt">{{ item.excerpt }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * NewsModule组件
 * 展示新闻内容的模块组件
 * 
 * @description 显示新闻列表，支持加载状态和错误状态
 * @requirements 8.2 - WHEN WordPress_API返回数据成功 THEN THE News_Module SHALL 显示新闻列表
 * @requirements 8.3 - IF WordPress_API请求失败 THEN THE News_Module SHALL 显示友好的错误提示信息
 * @requirements 8.4 - WHEN 新闻数据加载中 THEN THE News_Module SHALL 显示加载状态指示器
 */
import { ElSkeleton, ElButton, ElIcon } from 'element-plus'
import { WarningFilled, RefreshRight, Document } from '@element-plus/icons-vue'
import type { NewsModuleProps } from '@/types'

// Define props with TypeScript interface
defineProps<NewsModuleProps>()

// Define emits
const emit = defineEmits<{
  (e: 'retry'): void
}>()

/**
 * Handle retry button click
 * Emits 'retry' event to parent component
 */
const handleRetry = () => {
  emit('retry')
}

/**
 * Format date string to localized format
 * @param dateString - ISO date string
 * @returns Formatted date string
 */
const formatDate = (dateString: string): string => {
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  } catch {
    return dateString
  }
}
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;

.news-module {
  width: 100%;
  
  // Loading State
  &__loading {
    display: flex;
    flex-direction: column;
    gap: $spacing-lg;
  }
  
  &__skeleton {
    padding: $spacing-md;
    background: $color-bg-white;
    border-radius: $border-radius-base;
  }
  
  // Error State
  &__error {
    @include flex-center;
    flex-direction: column;
    padding: $spacing-xxl $spacing-lg;
    text-align: center;
    background: $color-bg-white;
    border-radius: $border-radius-base;
    border: 1px dashed $color-border-light;
  }
  
  &__error-icon {
    color: $color-warning;
    margin-bottom: $spacing-md;
  }
  
  &__error-message {
    font-size: $font-size-base;
    color: $color-text-secondary;
    margin-bottom: $spacing-lg;
    max-width: 300px;
  }
  
  &__retry-icon {
    margin-right: $spacing-xs;
  }
  
  // Empty State
  &__empty {
    @include flex-center;
    flex-direction: column;
    padding: $spacing-xxl $spacing-lg;
    text-align: center;
    background: $color-bg-white;
    border-radius: $border-radius-base;
    border: 1px dashed $color-border-light;
  }
  
  &__empty-icon {
    color: $color-text-placeholder;
    margin-bottom: $spacing-md;
  }
  
  &__empty-message {
    font-size: $font-size-base;
    color: $color-text-secondary;
  }
  
  // News List
  &__list {
    display: flex;
    flex-direction: column;
    gap: $spacing-md;
  }
  
  &__item {
    padding: $spacing-lg;
    background: $color-bg-white;
    border-radius: $border-radius-base;
    border: 1px solid $color-border-lighter;
    transition: $transition-base;
    cursor: pointer;
    
    &:hover {
      border-color: $color-primary-light-5;
      box-shadow: $shadow-md;
      
      .news-module__title a {
        color: $color-primary;
      }
    }
    
    @include mobile {
      padding: $spacing-md;
    }
  }
  
  &__item-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: $spacing-sm;
    
    @include mobile {
      flex-direction: column;
      align-items: flex-start;
      gap: $spacing-xs;
    }
  }
  
  &__category {
    display: inline-flex;
    align-items: center;
    padding: $spacing-xs $spacing-sm;
    font-size: $font-size-xs;
    color: $color-primary;
    background: $color-primary-light-7;
    border-radius: $border-radius-round;
    font-weight: $font-weight-medium;
  }
  
  &__date {
    font-size: $font-size-xs;
    color: $color-text-placeholder;
  }
  
  &__title {
    font-size: $font-size-lg;
    font-weight: $font-weight-semibold;
    margin-bottom: $spacing-sm;
    line-height: $line-height-tight;
    
    a {
      color: $color-text-primary;
      text-decoration: none;
      transition: color $transition-duration-fast $transition-timing-ease-in-out;
      
      &:hover {
        color: $color-primary;
      }
    }
    
    @include mobile {
      font-size: $font-size-base;
    }
  }
  
  &__excerpt {
    font-size: $font-size-sm;
    color: $color-text-secondary;
    line-height: $line-height-relaxed;
    @include text-clamp(2);
    
    @include mobile {
      font-size: $font-size-xs;
    }
  }
}
</style>
