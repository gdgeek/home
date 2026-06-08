/**
 * 品牌提供者
 * 
 * 品牌判断优先级：
 * 1. 生产环境：Docker 注入 window.__BRAND_ID__（docker-entrypoint.sh）—— 锁定品牌
 * 2. URL 参数：?brand=xxx —— 本地开发动态切换
 * 3. 访问域名映射 —— 单个 Docker 镜像服务多品牌
 * 4. 默认：xiading
 */

import { getBrandConfig } from './brandRegistry'
export { getBrandConfig } from './brandRegistry'
import type { BrandConfig, BrandId } from '@/types/brand'

const DEFAULT_BRAND_ID: BrandId = 'xiading'
const VALID_BRAND_IDS: readonly BrandId[] = ['xingkou', 'xiading', 'xrugc', 'mrpp']

const DOMAIN_BRAND_RULES: readonly {
  hostname: string
  brandId: BrandId
  includeSubdomains?: boolean
}[] = [
  { hostname: 'mrpp.com', brandId: 'mrpp', includeSubdomains: true },
  { hostname: 'xrugc.com', brandId: 'xrugc', includeSubdomains: true },
  { hostname: 'ar-creator.cn', brandId: 'xingkou', includeSubdomains: true },
  { hostname: 'xiading.hxgxonline.com', brandId: 'xiading', includeSubdomains: true }
]

type BrandSourceValue = string | null | undefined

function normalizeHostname(hostname: string): string {
  const normalized = hostname.trim().toLowerCase().replace(/\.$/, '')
  if (!normalized.startsWith('[') && normalized.includes(':')) {
    return normalized.split(':')[0]
  }
  return normalized
}

function getValidBrandId(brandId: BrandSourceValue): BrandId | null {
  if (brandId && VALID_BRAND_IDS.includes(brandId as BrandId)) {
    return brandId as BrandId
  }
  return null
}

export function getBrandFromHostname(hostname: string): BrandId | null {
  const normalized = normalizeHostname(hostname)
  if (!normalized) return null

  for (const rule of DOMAIN_BRAND_RULES) {
    if (normalized === rule.hostname) {
      return rule.brandId
    }

    if (rule.includeSubdomains && normalized.endsWith(`.${rule.hostname}`)) {
      return rule.brandId
    }
  }

  return null
}

function getBrandFromUrl(): BrandId | null {
  if (typeof window === 'undefined') return null
  const params = new URLSearchParams(window.location.search)
  return getValidBrandId(params.get('brand'))
}

export function resolveBrandIdFromSources(sources: {
  injectedBrandId?: BrandSourceValue
  urlBrandId?: BrandSourceValue
  hostname?: BrandSourceValue
}): BrandId {
  const injectedBrand = getValidBrandId(sources.injectedBrandId)
  if (injectedBrand) {
    return injectedBrand
  }

  const urlBrand = getValidBrandId(sources.urlBrandId)
  if (urlBrand) {
    return urlBrand
  }

  if (sources.hostname) {
    const hostBrand = getBrandFromHostname(sources.hostname)
    if (hostBrand) {
      return hostBrand
    }
  }

  return DEFAULT_BRAND_ID
}

function resolveBrandId(): BrandId {
  if (typeof window === 'undefined') {
    return DEFAULT_BRAND_ID
  }

  return resolveBrandIdFromSources({
    injectedBrandId: window.__BRAND_ID__,
    urlBrandId: getBrandFromUrl(),
    hostname: window.location.hostname
  })
}

const _brandId: BrandId = resolveBrandId()

export function getCurrentBrandConfig(): BrandConfig {
  return getBrandConfig(_brandId)!
}

export function getCurrentBrandId(): BrandId {
  return _brandId
}
