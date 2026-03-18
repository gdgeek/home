/**
 * 品牌提供者
 * 
 * 品牌判断优先级：
 * 1. 生产环境：Docker 注入 window.__BRAND_ID__（docker-entrypoint.sh）—— 锁定品牌
 * 2. URL 参数：?brand=xxx —— 本地开发动态切换
 * 3. 默认：xingkou
 */

import { getBrandConfig } from './brandRegistry'
export { getBrandConfig } from './brandRegistry'
import type { BrandConfig, BrandId } from '@/types/brand'

const DEFAULT_BRAND_ID: BrandId = 'xiading'
const VALID_BRAND_IDS: readonly string[] = ['xingkou', 'xiading', 'xrugc', 'mrpp']

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
    const injected = window.__BRAND_ID__
    if (injected && VALID_BRAND_IDS.includes(injected)) {
      return injected as BrandId
    }
  }

  // 2. URL 参数 ?brand=xxx —— 本地开发动态切换
  const urlBrand = getBrandFromUrl()
  if (urlBrand) {
    return urlBrand
  }

  // 3. 默认品牌
  return DEFAULT_BRAND_ID
}

const _brandId: BrandId = resolveBrandId()

export function getCurrentBrandConfig(): BrandConfig {
  return getBrandConfig(_brandId)!
}

export function getCurrentBrandId(): BrandId {
  return _brandId
}
