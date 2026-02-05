<script setup lang="ts">
/**
 * 多品牌架构 - 主应用组件
 * 
 * @description 应用根组件，使用路由渲染品牌对应视图并应用品牌主题
 * @requirements 1.1, 1.4, 11.1, 11.2, 5.3
 */
import { onMounted } from 'vue'
import { useBrand } from '@/composables/useBrand'

// 获取品牌主题配置
const { theme } = useBrand()

/**
 * 应用品牌主题CSS变量
 * @requirements 5.3, 5.4
 */
const applyBrandTheme = () => {
  const root = document.documentElement
  root.style.setProperty('--brand-primary-color', theme.value.primaryColor)
  root.style.setProperty('--brand-secondary-color', theme.value.secondaryColor)
  root.style.setProperty('--brand-cta-color', theme.value.ctaColor)
  root.style.setProperty('--brand-background-color', theme.value.backgroundColor)
  root.style.setProperty('--brand-text-color', theme.value.textColor)
}

onMounted(() => {
  applyBrandTheme()
})
</script>

<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style scoped>
#app {
  min-height: 100vh;
}
</style>
