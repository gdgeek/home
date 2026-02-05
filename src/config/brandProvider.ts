/**
 * 品牌提供者
 * 多品牌/多域名架构系统
 * 
 * @description 根据目标域名环境变量提供当前品牌配置
 * @requirements 1.1, 1.2, 1.3, 1.4
 */

import { getBrandConfig, isValidBrandId } from './brandRegistry'
import type { BrandConfig, BrandId } from '@/types/brand'

// ============================================
// 常量定义
// ============================================

/**
 * 默认品牌ID
 * 当环境变量未设置或无效时使用
 */
const DEFAULT_BRAND_ID: BrandId = 'xingkou'

/**
 * 域名到品牌ID的映射
 */
const DOMAIN_BRAND_MAP: Record<string, BrandId> = {
  'd.xiading.hxgxonline.com': 'xiading',
  'xiading.hxgxonline.com': 'xiading',
  'd.ar-creator.cn': 'xingkou',
  'ar-creator.cn': 'xingkou',
}

// ============================================
// 辅助函数
// ============================================

/**
 * 从域名URL中提取主机名
 */
function extractHostname(url: string): string {
  try {
    const urlObj = new URL(url)
    return urlObj.hostname
  } catch {
    // 如果不是有效URL，尝试直接作为主机名处理
    return url.replace(/^https?:\/\//, '').replace(/\/.*$/, '')
  }
}

/**
 * 根据目标域名获取品牌ID
 */
function getBrandIdFromDomain(targetDomain: string): BrandId {
  const hostname = extractHostname(targetDomain)
  return DOMAIN_BRAND_MAP[hostname] || DEFAULT_BRAND_ID
}

// ============================================
// 品牌配置获取函数
// ============================================

/**
 * 获取当前品牌配置
 * 
 * @description 从环境变量 VITE_TARGET_DOMAIN 读取目标域名，
 *              根据域名映射返回对应的品牌配置。
 * 
 * @returns 当前品牌的完整配置对象
 * 
 * @example
 * const config = getCurrentBrandConfig()
 * console.log(config.name) // 根据目标域名返回对应品牌名称
 * 
 * @requirements 1.1, 1.2, 1.3, 1.4
 */
export function getCurrentBrandConfig(): BrandConfig {
  const targetDomain = import.meta.env.VITE_TARGET_DOMAIN || ''
  const brandId = getBrandIdFromDomain(targetDomain)
  
  return getBrandConfig(brandId)!
}

/**
 * 获取当前品牌ID
 * 
 * @description 从环境变量读取目标域名，返回对应的品牌ID
 * 
 * @returns 当前有效的品牌ID
 * 
 * @example
 * const brandId = getCurrentBrandId()
 * console.log(brandId) // 'xingkou' 或 'xiading'
 * 
 * @requirements 1.1, 1.2, 1.3
 */
export function getCurrentBrandId(): BrandId {
  const targetDomain = import.meta.env.VITE_TARGET_DOMAIN || ''
  return getBrandIdFromDomain(targetDomain)
}

/**
 * 获取默认品牌ID
 * 
 * @description 返回系统默认的品牌ID常量
 * 
 * @returns 默认品牌ID
 */
export function getDefaultBrandId(): BrandId {
  return DEFAULT_BRAND_ID
}

/**
 * 获取目标域名
 * 
 * @description 返回当前配置的目标域名
 * 
 * @returns 目标域名URL
 */
export function getTargetDomain(): string {
  return import.meta.env.VITE_TARGET_DOMAIN || ''
}
