import { describe, it, expect, vi, afterEach } from 'vitest'
import * as fc from 'fast-check'

/**
 * Validates: Requirements 15.2
 *
 * Property 7: brandProvider 品牌 ID 解析优先级
 * 对任意 window.__BRAND_ID__、URL brand 参数、域名和默认值的组合，
 * BrandProvider 解析品牌 ID 的优先级应始终满足：
 * window.__BRAND_ID__ > URL ?brand 参数 > 域名映射 > 默认值
 */

const VALID_BRANDS = ['xingkou', 'xiading', 'xrugc', 'mrpp'] as const

async function loadBrandProvider() {
  vi.resetModules()
  return import('../brandProvider')
}

describe('brandProvider - brand resolution priority', () => {
  afterEach(() => {
    vi.resetModules()
    delete (window as unknown as Record<string, unknown>).__BRAND_ID__
    window.history.replaceState({}, '', '/')
  })

  it('window.__BRAND_ID__ takes priority over URL brand parameter', async () => {
    ;(window as unknown as Record<string, unknown>).__BRAND_ID__ = 'xiading'
    window.history.replaceState({}, '', '/?brand=xrugc')
    const { getCurrentBrandId } = await loadBrandProvider()
    expect(getCurrentBrandId()).toBe('xiading')
  })

  it('URL brand parameter is used when window.__BRAND_ID__ is absent', async () => {
    delete (window as unknown as Record<string, unknown>).__BRAND_ID__
    window.history.replaceState({}, '', '/?brand=xrugc')
    const { getCurrentBrandId } = await loadBrandProvider()
    expect(getCurrentBrandId()).toBe('xrugc')
  })

  it('domain brand is used when injected and URL brands are absent', async () => {
    const { resolveBrandIdFromSources } = await loadBrandProvider()
    expect(resolveBrandIdFromSources({ hostname: 'mrpp.com' })).toBe('mrpp')
  })

  it('URL brand parameter takes priority over domain mapping', async () => {
    const { resolveBrandIdFromSources } = await loadBrandProvider()
    expect(resolveBrandIdFromSources({ urlBrandId: 'xrugc', hostname: 'mrpp.com' })).toBe('xrugc')
  })

  it('defaults to xiading when neither is set', async () => {
    delete (window as unknown as Record<string, unknown>).__BRAND_ID__
    window.history.replaceState({}, '', '/')
    const { getCurrentBrandId } = await loadBrandProvider()
    expect(getCurrentBrandId()).toBe('xiading')
  })

  it('invalid window.__BRAND_ID__ falls through to URL brand parameter', async () => {
    ;(window as unknown as Record<string, unknown>).__BRAND_ID__ = 'invalid-brand'
    window.history.replaceState({}, '', '/?brand=xiading')
    const { getCurrentBrandId } = await loadBrandProvider()
    expect(getCurrentBrandId()).toBe('xiading')
  })

  it('invalid window.__BRAND_ID__ and invalid URL brand parameter fall through to domain mapping', async () => {
    const { resolveBrandIdFromSources } = await loadBrandProvider()
    expect(
      resolveBrandIdFromSources({
        injectedBrandId: 'bad',
        urlBrandId: 'also-bad',
        hostname: 'ar-creator.cn'
      })
    ).toBe('xingkou')
  })

  it('invalid window.__BRAND_ID__ and invalid URL brand parameter defaults to xiading', async () => {
    ;(window as unknown as Record<string, unknown>).__BRAND_ID__ = 'bad'
    window.history.replaceState({}, '', '/?brand=also-bad')
    const { getCurrentBrandId } = await loadBrandProvider()
    expect(getCurrentBrandId()).toBe('xiading')
  })

  // Property test: any valid brand set in window.__BRAND_ID__ is resolved correctly
  it('property: any valid brand in window.__BRAND_ID__ is resolved correctly', async () => {
    const { resolveBrandIdFromSources } = await loadBrandProvider()
    await fc.assert(
      fc.property(fc.constantFrom(...VALID_BRANDS), (brandId) => {
        expect(
          resolveBrandIdFromSources({
            injectedBrandId: brandId,
            urlBrandId: 'xrugc',
            hostname: 'mrpp.com'
          })
        ).toBe(brandId)
      })
    )
  })

  describe('domain mapping', () => {
    it.each([
      ['mrpp.com', 'mrpp'],
      ['MRPP.COM.', 'mrpp'],
      ['www.mrpp.com', 'mrpp'],
      ['console.preview.mrpp.com', 'mrpp'],
      ['xrugc.com', 'xrugc'],
      ['www.xrugc.com', 'xrugc'],
      ['studio.preview.xrugc.com', 'xrugc'],
      ['ar-creator.cn', 'xingkou'],
      ['www.ar-creator.cn', 'xingkou'],
      ['studio.preview.ar-creator.cn', 'xingkou'],
      ['xiading.cc', 'xiading'],
      ['www.xiading.cc', 'xiading'],
      ['xiading.hxgxonline.com', 'xiading'],
      ['www.xiading.hxgxonline.com', 'xiading'],
      ['studio.xiading.hxgxonline.com:5173', 'xiading']
    ])('maps %s to %s', async (hostname, brandId) => {
      const { getBrandFromHostname } = await loadBrandProvider()
      expect(getBrandFromHostname(hostname)).toBe(brandId)
    })

    it.each([
      'not-ar-creator.cn',
      'mrpp.com.example.com',
      'xrugc.com.example.com',
      'ar-creator.cn.example.com',
      'xiading.cc.example.com',
      'xiading.hxgxonline.com.example.com'
    ])('does not map unsupported host %s', async (hostname) => {
      const { getBrandFromHostname } = await loadBrandProvider()
      expect(getBrandFromHostname(hostname)).toBeNull()
    })
  })
})
