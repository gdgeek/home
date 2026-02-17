/**
 * useBrand Composable
 * 多品牌/多域名架构系统
 * 
 * @description 提供当前品牌配置的响应式访问
 * @requirements 4.1, 4.4, 5.3
 */

import { computed } from 'vue'
import { getCurrentBrandId, getBrandConfig } from '@/config/brandProvider'
import type { BrandConfig, BrandThemeConfig, BrandHeroConfig, BrandFooterConfig, BrandLocale } from '@/types/brand'

export function useBrand() {
  const brandId = getCurrentBrandId()
  const brandConfig = computed<BrandConfig>(() => getBrandConfig(brandId)!)

  return {
    brandConfig,
    brandId: computed(() => brandId),
    locale: computed<BrandLocale>(() => brandConfig.value.locale),
    theme: computed<BrandThemeConfig>(() => brandConfig.value.theme),
    hero: computed<BrandHeroConfig>(() => brandConfig.value.hero),
    footer: computed<BrandFooterConfig>(() => brandConfig.value.footer),
    loginUrl: computed<string>(() => brandConfig.value.loginUrl),
    brandName: computed<string>(() => brandConfig.value.name),
  }
}
