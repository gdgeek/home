import { describe, it, expect, vi, afterEach } from 'vitest'
import * as fc from 'fast-check'

/**
 * Validates: Requirements 15.2
 *
 * Property 7: brandProvider 品牌 ID 解析优先级
 * 对任意 window.__BRAND_ID__、URL brand 参数和默认值的组合，
 * BrandProvider 解析品牌 ID 的优先级应始终满足：
 * window.__BRAND_ID__ > URL ?brand 参数 > 默认值
 */

const VALID_BRANDS = ['xingkou', 'xiading', 'xrugc', 'mrpp'] as const

describe('brandProvider - brand resolution priority', () => {
  afterEach(() => {
    vi.resetModules()
    delete (window as unknown as Record<string, unknown>).__BRAND_ID__
    window.history.replaceState({}, '', '/')
  })

  it('window.__BRAND_ID__ takes priority over URL brand parameter', async () => {
    ;(window as unknown as Record<string, unknown>).__BRAND_ID__ = 'xiading'
    window.history.replaceState({}, '', '/?brand=xrugc')
    vi.resetModules()
    const { getCurrentBrandId } = await import('../brandProvider')
    expect(getCurrentBrandId()).toBe('xiading')
  })

  it('URL brand parameter is used when window.__BRAND_ID__ is absent', async () => {
    delete (window as unknown as Record<string, unknown>).__BRAND_ID__
    window.history.replaceState({}, '', '/?brand=xrugc')
    vi.resetModules()
    const { getCurrentBrandId } = await import('../brandProvider')
    expect(getCurrentBrandId()).toBe('xrugc')
  })

  it('defaults to xiading when neither is set', async () => {
    delete (window as unknown as Record<string, unknown>).__BRAND_ID__
    window.history.replaceState({}, '', '/')
    vi.resetModules()
    const { getCurrentBrandId } = await import('../brandProvider')
    expect(getCurrentBrandId()).toBe('xiading')
  })

  it('invalid window.__BRAND_ID__ falls through to URL brand parameter', async () => {
    ;(window as unknown as Record<string, unknown>).__BRAND_ID__ = 'invalid-brand'
    window.history.replaceState({}, '', '/?brand=xiading')
    vi.resetModules()
    const { getCurrentBrandId } = await import('../brandProvider')
    expect(getCurrentBrandId()).toBe('xiading')
  })

  it('invalid window.__BRAND_ID__ and invalid URL brand parameter defaults to xiading', async () => {
    ;(window as unknown as Record<string, unknown>).__BRAND_ID__ = 'bad'
    window.history.replaceState({}, '', '/?brand=also-bad')
    vi.resetModules()
    const { getCurrentBrandId } = await import('../brandProvider')
    expect(getCurrentBrandId()).toBe('xiading')
  })

  // Property test: any valid brand set in window.__BRAND_ID__ is resolved correctly
  it('property: any valid brand in window.__BRAND_ID__ is resolved correctly', async () => {
    await fc.assert(
      fc.asyncProperty(fc.constantFrom(...VALID_BRANDS), async (brandId) => {
        ;(window as unknown as Record<string, unknown>).__BRAND_ID__ = brandId
        vi.resetModules()
        const { getCurrentBrandId } = await import('../brandProvider')
        expect(getCurrentBrandId()).toBe(brandId)
        delete (window as unknown as Record<string, unknown>).__BRAND_ID__
      })
    )
  })
})
