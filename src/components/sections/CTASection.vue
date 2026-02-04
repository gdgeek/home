<template>
  <section class="cta-section">
    <div class="cta-section__background">
      <!-- Decorative background elements -->
      <div class="cta-section__bg-circle cta-section__bg-circle--1"></div>
      <div class="cta-section__bg-circle cta-section__bg-circle--2"></div>
    </div>
    
    <div class="container cta-section__container">
      <div class="cta-section__content">
        <!-- Section Title - Requirement 6.1 -->
        <h2 class="cta-section__title animate-fade-in-down">
          即刻上手，开启AR教育创作之旅
        </h2>
        
        <!-- Helper Text - Requirement 6.4 -->
        <p class="cta-section__subtitle animate-fade-in">
          无需复杂培训，零门槛开始您的AR教学创作
        </p>
        
        <!-- Login Button - Requirement 6.2, 6.3 -->
        <div class="cta-section__actions animate-fade-in-up">
          <el-button
            type="primary"
            size="large"
            class="cta-section__btn"
            @click="handleLoginClick"
          >
            <el-icon class="cta-section__btn-icon">
              <UserFilled />
            </el-icon>
            统一登录入口
          </el-button>
        </div>
        
        <!-- Additional Helper Text - Requirement 6.4 -->
        <p class="cta-section__helper-text animate-fade-in">
          <el-icon class="cta-section__helper-icon">
            <InfoFilled />
          </el-icon>
          支持学校统一身份认证，安全便捷
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
/**
 * CTASection组件
 * 互动引导板块，提供明确的行动引导
 * 
 * @description 显示标题、登录按钮和辅助说明文案
 * @requirements 6.1, 6.2, 6.3, 6.4
 */
import { ElButton, ElIcon } from 'element-plus'
import { UserFilled, InfoFilled } from '@element-plus/icons-vue'

// Define props
interface CTASectionProps {
  loginUrl: string
}

const props = defineProps<CTASectionProps>()

/**
 * Handle login button click
 * Requirement 6.3: Opens external login page in new tab
 */
const handleLoginClick = () => {
  if (props.loginUrl) {
    window.open(props.loginUrl, '_blank', 'noopener,noreferrer')
  }
}
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;

.cta-section {
  position: relative;
  padding: $spacing-xxxl 0;
  overflow: hidden;
  background: $gradient-primary;
  
  @include tablet {
    padding: $spacing-xxl 0;
  }
  
  @include mobile {
    padding: $spacing-xl 0;
  }
  
  // Background decorative elements
  &__background {
    position: absolute;
    inset: 0;
    pointer-events: none;
    overflow: hidden;
  }
  
  &__bg-circle {
    position: absolute;
    border-radius: 50%;
    opacity: 0.15;
    
    &--1 {
      width: 500px;
      height: 500px;
      top: -200px;
      right: -100px;
      background: radial-gradient(circle, $color-bg-white 0%, transparent 70%);
      
      @include mobile {
        width: 250px;
        height: 250px;
        top: -100px;
        right: -50px;
      }
    }
    
    &--2 {
      width: 400px;
      height: 400px;
      bottom: -150px;
      left: -100px;
      background: radial-gradient(circle, $color-success 0%, transparent 70%);
      
      @include mobile {
        width: 200px;
        height: 200px;
        bottom: -75px;
        left: -50px;
      }
    }
  }
  
  &__container {
    position: relative;
    z-index: 1;
  }
  
  &__content {
    text-align: center;
    max-width: 700px;
    margin: 0 auto;
  }
  
  // Title - Requirement 6.1
  &__title {
    font-size: clamp(1.75rem, 4vw, 2.5rem);
    font-weight: $font-weight-bold;
    color: $color-bg-white;
    line-height: $line-height-tight;
    margin-bottom: $spacing-md;
  }
  
  // Subtitle helper text
  &__subtitle {
    font-size: $font-size-lg;
    color: rgba($color-bg-white, 0.9);
    line-height: $line-height-relaxed;
    margin-bottom: $spacing-xl;
    
    @include mobile {
      font-size: $font-size-base;
      margin-bottom: $spacing-lg;
    }
  }
  
  // Actions container
  &__actions {
    margin-bottom: $spacing-lg;
    
    @include mobile {
      margin-bottom: $spacing-md;
    }
  }
  
  // Login Button - Requirement 6.2
  &__btn {
    display: inline-flex;
    align-items: center;
    gap: $spacing-sm;
    padding: $spacing-md $spacing-xxl;
    font-size: $font-size-lg;
    font-weight: $font-weight-semibold;
    border-radius: $border-radius-round;
    background: $gradient-cta;
    border-color: $color-success;
    color: $color-bg-white;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    transition: $transition-base;
    cursor: pointer;
    
    @include mobile {
      width: 100%;
      max-width: 280px;
      justify-content: center;
      padding: $spacing-md $spacing-xl;
      font-size: $font-size-base;
    }
    
    &:hover,
    &:focus {
      transform: translateY(-3px);
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.4);
      background: linear-gradient(135deg, #16A34A 0%, #15803D 100%);
      border-color: #16A34A;
    }
    
    &:active {
      transform: translateY(-1px);
    }
  }
  
  &__btn-icon {
    font-size: 20px;
    
    @include mobile {
      font-size: 18px;
    }
  }
  
  // Helper text - Requirement 6.4
  &__helper-text {
    display: inline-flex;
    align-items: center;
    gap: $spacing-xs;
    font-size: $font-size-sm;
    color: rgba($color-bg-white, 0.8);
    
    @include mobile {
      font-size: $font-size-xs;
    }
  }
  
  &__helper-icon {
    font-size: 16px;
    
    @include mobile {
      font-size: 14px;
    }
  }
}
</style>
