<template>
  <footer class="footer-section">
    <div class="container footer-section__container">
      <!-- Top Section: Navigation + News -->
      <div class="footer-section__top">
        <!-- Navigation Categories - Requirement 7.1 -->
        <div class="footer-section__nav">
          <div
            v-for="(group, index) in navigation"
            :key="index"
            class="footer-section__nav-group"
          >
            <h4 class="footer-section__nav-title">{{ group.title }}</h4>
            <ul class="footer-section__nav-list">
              <li
                v-for="(link, linkIndex) in group.links"
                :key="linkIndex"
                class="footer-section__nav-item"
              >
                <a
                  :href="link.url"
                  class="footer-section__nav-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {{ link.text }}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <!-- News Module - Requirement 7.3 -->
        <div class="footer-section__news">
          <h4 class="footer-section__news-title">官方动态</h4>
          <NewsModule
            :news="news"
            :loading="newsLoading"
            :error="newsError"
            @retry="handleRetryNews"
          />
        </div>
      </div>

      <!-- Divider -->
      <el-divider class="footer-section__divider" />

      <!-- Bottom Section: Contact + Copyright - Requirement 7.2 -->
      <div class="footer-section__bottom">
        <!-- Contact Info -->
        <div class="footer-section__contact">
          <div v-if="contactInfo.phone" class="footer-section__contact-item">
            <el-icon class="footer-section__contact-icon">
              <Phone />
            </el-icon>
            <span>{{ contactInfo.phone }}</span>
          </div>
          <div v-if="contactInfo.email" class="footer-section__contact-item">
            <el-icon class="footer-section__contact-icon">
              <Message />
            </el-icon>
            <a :href="`mailto:${contactInfo.email}`" class="footer-section__contact-link">
              {{ contactInfo.email }}
            </a>
          </div>
          <div v-if="contactInfo.wechat" class="footer-section__contact-item">
            <el-icon class="footer-section__contact-icon">
              <ChatDotRound />
            </el-icon>
            <span>微信: {{ contactInfo.wechat }}</span>
          </div>
        </div>

        <!-- Copyright -->
        <div class="footer-section__copyright">
          <p>{{ copyright }}</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
/**
 * FooterSection组件
 * 底部导航与信息板块
 * 
 * @description 显示导航分类、版权信息、联系方式，并集成NewsModule组件
 * @requirements 7.1 - WHEN 用户滚动到页面底部 THEN THE Homepage SHALL 显示导航分类（平台服务、关于我们、官方动态）
 * @requirements 7.2 - WHEN 用户查看底部区域 THEN THE Homepage SHALL 显示版权信息和客服联系方式
 * @requirements 7.3 - THE Homepage SHALL 在底部显示News_Module展示新闻内容
 */
import { ElDivider, ElIcon } from 'element-plus'
import { Phone, Message, ChatDotRound } from '@element-plus/icons-vue'
import NewsModule from '@/components/common/NewsModule.vue'
import type { FooterNavGroup, ContactInfo, NewsItem } from '@/types'

// Define props interface
interface FooterSectionProps {
  navigation: FooterNavGroup[]
  copyright: string
  contactInfo: ContactInfo
  news: NewsItem[]
  newsLoading: boolean
  newsError: string | null
}

defineProps<FooterSectionProps>()

// Define emits
const emit = defineEmits<{
  (e: 'retryNews'): void
}>()

/**
 * Handle retry news event from NewsModule
 * Emits 'retryNews' event to parent component
 */
const handleRetryNews = () => {
  emit('retryNews')
}
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;

.footer-section {
  background: $color-text-primary;
  color: $color-bg-white;
  padding: $spacing-xxl 0 $spacing-lg;
  
  @include mobile {
    padding: $spacing-xl 0 $spacing-md;
  }
  
  &__container {
    max-width: $container-max-width;
    margin: 0 auto;
    padding: 0 $container-padding;
  }
  
  // Top Section: Navigation + News
  &__top {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: $spacing-xxl;
    
    @include tablet {
      grid-template-columns: 1fr;
      gap: $spacing-xl;
    }
    
    @include mobile {
      gap: $spacing-lg;
    }
  }
  
  // Navigation Section - Requirement 7.1
  &__nav {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: $spacing-lg;
    
    @include mobile {
      grid-template-columns: repeat(2, 1fr);
      gap: $spacing-md;
    }
  }
  
  &__nav-group {
    min-width: 0;
  }
  
  &__nav-title {
    font-size: $font-size-base;
    font-weight: $font-weight-semibold;
    color: $color-bg-white;
    margin-bottom: $spacing-md;
    line-height: $line-height-tight;
    
    @include mobile {
      font-size: $font-size-sm;
      margin-bottom: $spacing-sm;
    }
  }
  
  &__nav-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  &__nav-item {
    margin-bottom: $spacing-sm;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
  
  &__nav-link {
    font-size: $font-size-sm;
    color: rgba($color-bg-white, 0.7);
    text-decoration: none;
    transition: color $transition-duration-fast $transition-timing-ease-in-out;
    cursor: pointer;
    
    &:hover {
      color: $color-bg-white;
    }
    
    @include mobile {
      font-size: $font-size-xs;
    }
  }
  
  // News Section - Requirement 7.3
  &__news {
    min-width: 0;
  }
  
  &__news-title {
    font-size: $font-size-base;
    font-weight: $font-weight-semibold;
    color: $color-bg-white;
    margin-bottom: $spacing-md;
    line-height: $line-height-tight;
    
    @include mobile {
      font-size: $font-size-sm;
      margin-bottom: $spacing-sm;
    }
  }
  
  // Override NewsModule styles for dark background
  :deep(.news-module) {
    .news-module__skeleton {
      background: rgba($color-bg-white, 0.1);
    }
    
    .news-module__error,
    .news-module__empty {
      background: rgba($color-bg-white, 0.05);
      border-color: rgba($color-bg-white, 0.2);
    }
    
    .news-module__error-icon {
      color: $color-warning;
    }
    
    .news-module__error-message,
    .news-module__empty-message {
      color: rgba($color-bg-white, 0.7);
    }
    
    .news-module__empty-icon {
      color: rgba($color-bg-white, 0.5);
    }
    
    .news-module__item {
      background: rgba($color-bg-white, 0.05);
      border-color: rgba($color-bg-white, 0.1);
      
      &:hover {
        background: rgba($color-bg-white, 0.1);
        border-color: rgba($color-bg-white, 0.2);
      }
    }
    
    .news-module__category {
      background: rgba($color-primary-light-2, 0.3);
      color: $color-primary-light-4;
    }
    
    .news-module__date {
      color: rgba($color-bg-white, 0.5);
    }
    
    .news-module__title a {
      color: $color-bg-white;
      
      &:hover {
        color: $color-primary-light-4;
      }
    }
    
    .news-module__excerpt {
      color: rgba($color-bg-white, 0.7);
    }
  }
  
  // Divider
  &__divider {
    margin: $spacing-xl 0;
    border-color: rgba($color-bg-white, 0.15);
    
    @include mobile {
      margin: $spacing-lg 0;
    }
  }
  
  // Bottom Section: Contact + Copyright - Requirement 7.2
  &__bottom {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    gap: $spacing-md;
    
    @include mobile {
      flex-direction: column;
      text-align: center;
    }
  }
  
  // Contact Info
  &__contact {
    display: flex;
    flex-wrap: wrap;
    gap: $spacing-lg;
    
    @include mobile {
      flex-direction: column;
      gap: $spacing-sm;
    }
  }
  
  &__contact-item {
    display: flex;
    align-items: center;
    gap: $spacing-xs;
    font-size: $font-size-sm;
    color: rgba($color-bg-white, 0.8);
    
    @include mobile {
      font-size: $font-size-xs;
      justify-content: center;
    }
  }
  
  &__contact-icon {
    font-size: 16px;
    color: rgba($color-bg-white, 0.6);
    
    @include mobile {
      font-size: 14px;
    }
  }
  
  &__contact-link {
    color: rgba($color-bg-white, 0.8);
    text-decoration: none;
    transition: color $transition-duration-fast $transition-timing-ease-in-out;
    cursor: pointer;
    
    &:hover {
      color: $color-bg-white;
    }
  }
  
  // Copyright
  &__copyright {
    font-size: $font-size-xs;
    color: rgba($color-bg-white, 0.5);
    
    p {
      margin: 0;
    }
  }
}
</style>
