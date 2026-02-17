/**
 * 品牌提供者
 * 
 * 品牌判断：
 * 1. 生产环境：Docker 注入 window.__BRAND_ID__（docker-entrypoint.sh）
 * 2. 本地开发：.env 中的 VITE_BRAND_ID
 * 3. 默认：xingkou
 */

import { getBrandConfig } from './brandRegistry'
export { getBrandConfig } from './brandRegistry'
import type { BrandConfig, BrandId } from '@/types/brand'

const DEFAULT_BRAND_ID: BrandId = 'xingkou'
const VALID_BRAND_IDS: readonly string[] = ['xingkou', 'xiading']

function resolveBrandId(): BrandId {
  // 1. Docker 注入（生产环境）
  if (typeof window !== 'undefined') {
    const injected = (window as any).__BRAND_ID__
    if (injected && VALID_BRAND_IDS.includes(injected)) {
      return injected as BrandId
    }
  }

  // 2. Vite 环境变量（本地开发）
  const envBrand = import.meta.env.VITE_BRAND_ID || ''
  if (envBrand && VALID_BRAND_IDS.includes(envBrand)) {
    return envBrand as BrandId
  }

  return DEFAULT_BRAND_ID
}

const _brandId: BrandId = resolveBrandId()

export function getCurrentBrandConfig(): BrandConfig {
  return getBrandConfig(_brandId)!
}

export function getCurrentBrandId(): BrandId {
  return _brandId
}
