<template>
  <header class="header-nav" :class="{ 'header-nav--scrolled': isScrolled }">
    <div class="container header-nav__container">
      <!-- Logo -->
      <div class="header-nav__logo">
        <span class="header-nav__logo-icon">✦</span>
        <span class="header-nav__logo-text">星扣AR教育版</span>
      </div>
      
      <!-- Navigation Links -->
      <nav class="header-nav__links hidden-mobile">
        <a href="#" class="header-nav__link">产品介绍</a>
        <a href="#case-section" class="header-nav__link">教学案例</a>
        <a href="#" class="header-nav__link">帮助中心</a>
      </nav>
      
      <!-- Login Button -->
      <div class="header-nav__actions">
        <el-button
          type="primary"
          size="default"
          class="header-nav__login-btn"
          @click="handleLoginClick"
        >
          <el-icon class="header-nav__login-icon">
            <UserFilled />
          </el-icon>
          <span class="hidden-mobile">登录</span>
        </el-button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { ElButton, ElIcon } from 'element-plus'
import { UserFilled } from '@element-plus/icons-vue'

const emit = defineEmits<{
  (e: 'openLogin'): void
}>()

const isScrolled = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

const handleLoginClick = () => {
  emit('openLogin')
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;

.header-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: $z-index-fixed;
  padding: $spacing-md 0;
  background: transparent;
  transition: $transition-base;
  
  &--scrolled {
    background: rgba($color-bg-white, 0.95);
    backdrop-filter: blur(10px);
    box-shadow: $shadow-sm;
    padding: $spacing-sm 0;
  }
  
  &__container {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  
  &__logo {
    display: flex;
    align-items: center;
    gap: $spacing-sm;
    cursor: pointer;
  }
  
  &__logo-icon {
    font-size: 24px;
    color: $color-primary;
  }
  
  &__logo-text {
    font-size: $font-size-lg;
    font-weight: $font-weight-bold;
    color: $color-text-primary;
    
    @include mobile {
      font-size: $font-size-base;
    }
  }
  
  &__links {
    display: flex;
    align-items: center;
    gap: $spacing-xl;
  }
  
  &__link {
    font-size: $font-size-sm;
    color: $color-text-regular;
    text-decoration: none;
    transition: $transition-fast;
    
    &:hover {
      color: $color-primary;
    }
  }
  
  &__actions {
    display: flex;
    align-items: center;
  }
  
  &__login-btn {
    display: flex;
    align-items: center;
    gap: $spacing-xs;
    background: $gradient-cta;
    border-color: $color-success;
    border-radius: $border-radius-round;
    padding: $spacing-sm $spacing-lg;
    
    &:hover {
      background: linear-gradient(135deg, #16A34A 0%, #15803D 100%);
      border-color: #16A34A;
    }
    
    @include mobile {
      padding: $spacing-sm;
      min-width: 40px;
    }
  }
  
  &__login-icon {
    font-size: 16px;
  }
}

// 移动端隐藏文字
@include mobile {
  .hidden-mobile {
    display: none !important;
  }
}
</style>
