<script setup lang="ts">
/**
 * 多品牌架构 - 主应用组件
 * 
 * @description 应用根组件，使用路由渲染品牌对应视图并应用品牌主题
 * @requirements 1.1, 1.4, 11.1, 11.2, 5.3
 */
import { computed, onMounted } from 'vue'
import { useBrand } from '@/composables/useBrand'
import { getRuntimeConfig } from '@/types/runtime'

// 获取品牌主题配置
const { theme, brandName } = useBrand()

const appVersion = computed(() => {
  const config = getRuntimeConfig()
  return config.__APP_VERSION__ ?? config.__BUILD_TIME__ ?? 'dev'
})

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
  document.title = brandName.value

  // 动态设置 favicon
  const favicon = document.querySelector('link[rel="icon"]') as HTMLLinkElement
  if (favicon && theme.value.faviconPath) {
    favicon.href = theme.value.faviconPath
    favicon.type = 'image/webp'
  }
})
</script>

<template>
  <div id="app">
    <router-view />
    <div class="app-version" aria-label="Application version">
      v{{ appVersion }}
    </div>
  </div>
</template>

<style scoped>
#app {
  min-height: 100vh;
}

.app-version {
  position: fixed;
  right: 10px;
  bottom: 8px;
  z-index: 2147483647;
  max-width: min(360px, calc(100vw - 20px));
  padding: 4px 8px;
  border: 1px solid rgba(148, 163, 184, 0.28);
  border-radius: 6px;
  background: rgba(15, 23, 42, 0.68);
  color: rgba(255, 255, 255, 0.82);
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace;
  font-size: 11px;
  line-height: 1.35;
  overflow-wrap: anywhere;
  pointer-events: none;
  backdrop-filter: blur(8px);
}
</style>
