/**
 * useBrand Composable
 * 多品牌/多域名架构系统
 * 
 * @description 提供当前品牌配置的响应式访问
 * @requirements 4.1, 4.4, 5.3
 */

import { computed, readonly } from 'vue'
import { getCurrentBrandConfig, getCurrentBrandId } from '@/config/brandProvider'
import type { BrandConfig, BrandId, BrandThemeConfig, BrandHeroConfig, BrandFooterConfig } from '@/types/brand'

/**
 * useBrand composable
 * 
 * @description 提供当前品牌配置的响应式访问，
 *              使用 computed 缓存配置以优化性能
 * 
 * @returns 品牌配置的响应式属性对象
 * 
 * @example
 * const { brandName, theme, hero, loginUrl } = useBrand()
 * 
 * // 在模板中使用
 * <h1>{{ hero.title }}</h1>
 * <a :href="loginUrl">登录</a>
 * 
 * @requirements 4.1, 4.4, 5.3
 */
export function useBrand() {
  // 品牌配置在应用生命周期内不变，使用 computed 缓存
  const brandConfig = computed<BrandConfig>(() => getCurrentBrandConfig())
  const brandId = computed<BrandId>(() => getCurrentBrandId())
  
  // 便捷访问器 - 提供对配置子对象的直接访问
  const theme = computed<BrandThemeConfig>(() => brandConfig.value.theme)
  const hero = computed<BrandHeroConfig>(() => brandConfig.value.hero)
  const footer = computed<BrandFooterConfig>(() => brandConfig.value.footer)
  const loginUrl = computed<string>(() => brandConfig.value.loginUrl)
  const brandName = computed<string>(() => brandConfig.value.name)
  
  return {
    /** 完整品牌配置（只读） */
    brandConfig: readonly(brandConfig),
    /** 当前品牌ID（只读） */
    brandId: readonly(brandId),
    /** 主题配置（只读） */
    theme: readonly(theme),
    /** Hero区配置（只读） */
    hero: readonly(hero),
    /** 页脚配置（只读） */
    footer: readonly(footer),
    /** 登录URL（只读） */
    loginUrl: readonly(loginUrl),
    /** 品牌名称（只读） */
    brandName: readonly(brandName)
  }
}
