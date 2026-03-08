import { describe, it, expect, vi, afterEach } from 'vitest'
import * as fc from 'fast-check'

/**
 * Validates: Requirements 15.2
 *
 * Property 7: brandProvider 品牌 ID 解析优先级
 * 对任意 window.__BRAND_ID__、VITE_BRAND_ID 环境变量和默认值的组合，
 * BrandProvider 解析品牌 ID 的优先级应始终满足：
 * window.__BRAND_ID__ > VITE_BRAND_ID > 默认值
 */

const VALID_BRANDS = ['xingkou', 'xiading', 'xrugc'] as const

describe('brandProvider - brand resolution priority', () => {
  afterEach(() => {
    vi.resetModules()
    delete (window as any).__BRAND_ID__
    vi.unstubAllEnvs()
  })

  it('window.__BRAND_ID__ takes priority over VITE_BRAND_ID', async () => {
    ;(window as any).__BRAND_ID__ = 'xiading'
    vi.stubEnv('VITE_BRAND_ID', 'xrugc')
    vi.resetModules()
    const { getCurrentBrandId } = await import('../brandProvider')
    expect(getCurrentBrandId()).toBe('xiading')
  })

  it('VITE_BRAND_ID is used when window.__BRAND_ID__ is absent', async () => {
    delete (window as any).__BRAND_ID__
    vi.stubEnv('VITE_BRAND_ID', 'xrugc')
    vi.resetModules()
    const { getCurrentBrandId } = await import('../brandProvider')
    expect(getCurrentBrandId()).toBe('xrugc')
  })

  it('defaults to xingkou when neither is set', async () => {
    delete (window as any).__BRAND_ID__
    vi.stubEnv('VITE_BRAND_ID', '')
    vi.resetModules()
    const { getCurrentBrandId } = await import('../brandProvider')
    expect(getCurrentBrandId()).toBe('xingkou')
  })

  it('invalid window.__BRAND_ID__ falls through to VITE_BRAND_ID', async () => {
    ;(window as any).__BRAND_ID__ = 'invalid-brand'
    vi.stubEnv('VITE_BRAND_ID', 'xiading')
    vi.resetModules()
    const { getCurrentBrandId } = await import('../brandProvider')
    expect(getCurrentBrandId()).toBe('xiading')
  })

  it('invalid window.__BRAND_ID__ and invalid VITE_BRAND_ID defaults to xingkou', async () => {
    ;(window as any).__BRAND_ID__ = 'bad'
    vi.stubEnv('VITE_BRAND_ID', 'also-bad')
    vi.resetModules()
    const { getCurrentBrandId } = await import('../brandProvider')
    expect(getCurrentBrandId()).toBe('xingkou')
  })

  // Property test: any valid brand set in window.__BRAND_ID__ is resolved correctly
  it('property: any valid brand in window.__BRAND_ID__ is resolved correctly', async () => {
    await fc.assert(
      fc.asyncProperty(fc.constantFrom(...VALID_BRANDS), async (brandId) => {
        ;(window as any).__BRAND_ID__ = brandId
        vi.resetModules()
        const { getCurrentBrandId } = await import('../brandProvider')
        expect(getCurrentBrandId()).toBe(brandId)
        delete (window as any).__BRAND_ID__
      })
    )
  })
})
