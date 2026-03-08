/**
 * 品牌提供者
 * 
 * 品牌判断优先级：
 * 1. 生产环境：Docker 注入 window.__BRAND_ID__（docker-entrypoint.sh）—— 锁定品牌
 * 2. 本地开发：.env 中的 VITE_BRAND_ID —— 锁定品牌
 * 3. URL 参数：?brand=xxx —— 动态切换（仅在前两者都未设置时生效）
 * 4. 默认：xingkou
 */

import { getBrandConfig } from './brandRegistry'
export { getBrandConfig } from './brandRegistry'
import type { BrandConfig, BrandId } from '@/types/brand'

const DEFAULT_BRAND_ID: BrandId = 'xingkou'
const VALID_BRAND_IDS: readonly string[] = ['xingkou', 'xiading', 'xrugc']

function getBrandFromUrl(): BrandId | null {
  if (typeof window === 'undefined') return null
  const params = new URLSearchParams(window.location.search)
  const brandParam = params.get('brand')
  if (brandParam && VALID_BRAND_IDS.includes(brandParam)) {
    return brandParam as BrandId
  }
  return null
}

function resolveBrandId(): BrandId {
  // 1. Docker 注入（生产环境）—— 锁定品牌
  if (typeof window !== 'undefined') {
    const injected = (window as unknown as Record<string, unknown>).__BRAND_ID__
    if (injected && VALID_BRAND_IDS.includes(injected as string)) {
      return injected as BrandId
    }
  }

  // 2. Vite 环境变量（本地开发）—— 锁定品牌
  const envBrand = import.meta.env.VITE_BRAND_ID || ''
  if (envBrand && VALID_BRAND_IDS.includes(envBrand)) {
    return envBrand as BrandId
  }

  // 3. URL 参数 ?brand=xxx —— 动态切换（仅在未锁定时）
  const urlBrand = getBrandFromUrl()
  if (urlBrand) {
    return urlBrand
  }

  // 4. 默认品牌
  return DEFAULT_BRAND_ID
}

const _brandId: BrandId = resolveBrandId()

export function getCurrentBrandConfig(): BrandConfig {
  return getBrandConfig(_brandId)!
}

export function getCurrentBrandId(): BrandId {
  return _brandId
}
