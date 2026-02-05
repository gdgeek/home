<template>
  <section class="hero-section">
    <div class="hero-section__background">
      <!-- Decorative background elements -->
      <div class="hero-section__bg-circle hero-section__bg-circle--1"></div>
      <div class="hero-section__bg-circle hero-section__bg-circle--2"></div>
      <div class="hero-section__bg-circle hero-section__bg-circle--3"></div>
    </div>
    
    <div class="container hero-section__container">
      <div class="hero-section__content">
        <!-- Main Title - Requirement 1.1 -->
        <h1 class="hero-section__title animate-fade-in-down">
          {{ title }}
        </h1>
        
        <!-- Subtitle - Requirement 1.2 -->
        <p class="hero-section__subtitle animate-fade-in">
          {{ subtitle }}
        </p>
        
        <!-- Action Buttons - Requirement 1.3 -->
        <div class="hero-section__actions animate-fade-in-up">
          <!-- Primary Button - Requirement 1.4: Opens external login page -->
          <el-button
            type="primary"
            size="large"
            class="hero-section__btn hero-section__btn--primary"
            @click="handlePrimaryClick"
          >
            <el-icon class="hero-section__btn-icon">
              <Promotion />
            </el-icon>
            {{ primaryButtonText }}
          </el-button>
          
          <!-- Secondary Button - Requirement 1.5: Scrolls to case section -->
          <el-button
            size="large"
            class="hero-section__btn hero-section__btn--secondary"
            @click="handleSecondaryClick"
          >
            <el-icon class="hero-section__btn-icon">
              <View />
            </el-icon>
            {{ secondaryButtonText }}
          </el-button>
        </div>
        
        <!-- Highlights - Requirement 1.6 -->
        <div class="hero-section__highlights animate-fade-in">
          <span
            v-for="(highlight, index) in highlights"
            :key="index"
            class="hero-section__highlight"
          >
            <el-icon class="hero-section__highlight-icon">
              <CircleCheck />
            </el-icon>
            {{ highlight }}
          </span>
        </div>
      </div>
      
      <!-- Hero Visual/Illustration -->
      <div class="hero-section__visual">
        <div class="hero-section__visual-container">
          <!-- AR Education Image - Rokid AR Studio -->
          <div class="hero-section__image-wrapper">
            <img 
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=500&fit=crop" 
              alt="AR教育场景 - 使用Rokid AR眼镜进行沉浸式学习"
              class="hero-section__image"
            />
            <!-- Floating AR Elements -->
            <div class="hero-section__ar-badge hero-section__ar-badge--1">
              <el-icon :size="20"><Reading /></el-icon>
              <span>Rokid AR</span>
            </div>
            <div class="hero-section__ar-badge hero-section__ar-badge--2">
              <el-icon :size="20"><Cpu /></el-icon>
              <span>AR Studio</span>
            </div>
            <div class="hero-section__ar-badge hero-section__ar-badge--3">
              <el-icon :size="20"><MagicStick /></el-icon>
              <span>沉浸教学</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
/**
 * HeroSection组件
 * 首屏展示区域，包含主标题、副标题和行动按钮
 * 
 * @description 展示平台核心定位和行动入口
 * @requirements 1.1, 1.2, 1.3, 1.4, 1.5, 1.6
 */
import { ElButton, ElIcon } from 'element-plus'
import { Promotion, View, CircleCheck, Reading, Cpu, MagicStick } from '@element-plus/icons-vue'
import type { HeroSectionProps } from '@/types'

// Define props with TypeScript interface
defineProps<HeroSectionProps>()

// Define emits
const emit = defineEmits<{
  (e: 'scrollToCase'): void
  (e: 'openLogin'): void
}>()

/**
 * Handle primary button click
 * Requirement 1.4: Opens login modal
 */
const handlePrimaryClick = () => {
  emit('openLogin')
}

/**
 * Handle secondary button click
 * Requirement 1.5: Emits event to scroll to case section
 */
const handleSecondaryClick = () => {
  emit('scrollToCase')
}
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;

.hero-section {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: $spacing-xxxl 0;
  overflow: hidden;
  background: $gradient-hero;
  
  @include tablet {
    min-height: auto;
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
    opacity: 0.5;
    
    &--1 {
      width: 600px;
      height: 600px;
      top: -200px;
      right: -100px;
      background: radial-gradient(circle, $color-primary-light-6 0%, transparent 70%);
      
      @include mobile {
        width: 300px;
        height: 300px;
        top: -100px;
        right: -50px;
      }
    }
    
    &--2 {
      width: 400px;
      height: 400px;
      bottom: -100px;
      left: -100px;
      background: radial-gradient(circle, $color-primary-light-5 0%, transparent 70%);
      
      @include mobile {
        width: 200px;
        height: 200px;
        bottom: -50px;
        left: -50px;
      }
    }
    
    &--3 {
      width: 200px;
      height: 200px;
      top: 50%;
      left: 30%;
      background: radial-gradient(circle, rgba($color-success, 0.2) 0%, transparent 70%);
      
      @include mobile {
        display: none;
      }
    }
  }
  
  &__container {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    gap: $spacing-xxl;
    
    @include tablet {
      flex-direction: column;
      text-align: center;
    }
  }
  
  &__content {
    flex: 1;
    max-width: 640px;
    
    @include tablet {
      max-width: 100%;
    }
  }
  
  &__title {
    font-size: clamp(2rem, 5vw, 3rem);
    font-weight: $font-weight-bold;
    color: $color-text-primary;
    line-height: 1.2;
    margin-bottom: $spacing-lg;
    
    // Highlight the quoted parts
    :deep(em), 
    :deep(strong) {
      color: $color-primary;
      font-style: normal;
    }
  }
  
  &__subtitle {
    font-size: $font-size-lg;
    color: $color-text-secondary;
    line-height: $line-height-relaxed;
    margin-bottom: $spacing-xl;
    
    @include mobile {
      font-size: $font-size-base;
      margin-bottom: $spacing-lg;
    }
  }
  
  &__actions {
    display: flex;
    gap: $spacing-md;
    margin-bottom: $spacing-xl;
    
    @include tablet {
      justify-content: center;
    }
    
    @include mobile {
      flex-direction: column;
      gap: $spacing-sm;
      margin-bottom: $spacing-lg;
    }
  }
  
  &__btn {
    display: inline-flex;
    align-items: center;
    gap: $spacing-xs;
    padding: $spacing-md $spacing-xl;
    font-size: $font-size-base;
    font-weight: $font-weight-medium;
    border-radius: $border-radius-round;
    transition: $transition-base;
    cursor: pointer;
    
    @include mobile {
      width: 100%;
      justify-content: center;
    }
    
    &--primary {
      background: $gradient-cta;
      border-color: $color-success;
      color: $color-bg-white;
      box-shadow: 0 4px 14px rgba($color-success, 0.4);
      
      &:hover,
      &:focus {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba($color-success, 0.5);
        background: linear-gradient(135deg, #16A34A 0%, #15803D 100%);
        border-color: #16A34A;
      }
      
      &:active {
        transform: translateY(0);
      }
    }
    
    &--secondary {
      background: $color-bg-white;
      border: 2px solid $color-primary;
      color: $color-primary;
      
      &:hover,
      &:focus {
        background: $color-primary;
        color: $color-bg-white;
        transform: translateY(-2px);
      }
      
      &:active {
        transform: translateY(0);
      }
    }
  }
  
  &__btn-icon {
    font-size: 18px;
  }
  
  &__highlights {
    display: flex;
    flex-wrap: wrap;
    gap: $spacing-md $spacing-lg;
    
    @include tablet {
      justify-content: center;
    }
    
    @include mobile {
      gap: $spacing-sm $spacing-md;
    }
  }
  
  &__highlight {
    display: inline-flex;
    align-items: center;
    gap: $spacing-xs;
    font-size: $font-size-sm;
    color: $color-text-secondary;
    
    @include mobile {
      font-size: $font-size-xs;
    }
  }
  
  &__highlight-icon {
    color: $color-success;
    font-size: 16px;
  }
  
  // Visual/Illustration section
  &__visual {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    
    @include tablet {
      width: 100%;
      max-width: 500px;
      margin-top: $spacing-xl;
    }
    
    @include mobile {
      max-width: 100%;
      margin-top: $spacing-lg;
    }
  }
  
  &__visual-container {
    position: relative;
    width: 100%;
    max-width: 500px;
  }
  
  &__image-wrapper {
    position: relative;
    width: 100%;
    border-radius: 20px;
    overflow: visible;
    box-shadow: $shadow-xl;
    
    @include mobile {
      border-radius: 16px;
    }
  }
  
  &__image {
    width: 100%;
    height: auto;
    display: block;
    border-radius: 20px;
    object-fit: cover;
    
    @include mobile {
      border-radius: 16px;
    }
  }
  
  // Floating AR badges
  &__ar-badge {
    position: absolute;
    display: flex;
    align-items: center;
    gap: $spacing-xs;
    padding: $spacing-sm $spacing-md;
    background: $color-bg-white;
    border-radius: $border-radius-round;
    box-shadow: $shadow-lg;
    font-size: $font-size-sm;
    font-weight: $font-weight-medium;
    animation: float 3s ease-in-out infinite;
    white-space: nowrap;
    
    @include mobile {
      padding: $spacing-xs $spacing-sm;
      font-size: $font-size-xs;
    }
    
    &--1 {
      top: 10%;
      left: -20px;
      color: $color-primary;
      animation-delay: 0s;
      
      @include mobile {
        left: -10px;
        top: 5%;
      }
    }
    
    &--2 {
      top: 45%;
      right: -30px;
      color: $color-success;
      animation-delay: 0.5s;
      
      @include mobile {
        right: -10px;
      }
    }
    
    &--3 {
      bottom: 15%;
      left: 10%;
      color: $color-warning;
      animation-delay: 1s;
      
      @include mobile {
        bottom: 10%;
        left: 5%;
      }
    }
  }
}

// Float animation for AR elements
@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}
</style>
