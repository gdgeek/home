import { describe, expect, it } from 'vitest'
import { buildWorkbenchSsoUrl, resolveWorkbenchUrl } from '../workbenchRedirect'

describe('resolveWorkbenchUrl', () => {
  it.each([
    ['xrugc.com', 'https://d.xrugc.com'],
    ['www.xrugc.com', 'https://d.xrugc.com'],
    ['studio.preview.xrugc.com', 'https://d.xrugc.com'],
    ['dev.xrugc.com', 'https://d.dev.xrugc.com'],
    ['www.dev.xrugc.com', 'https://d.dev.xrugc.com'],
    ['mrpp.com', 'https://d.mrpp.com'],
    ['www.mrpp.com', 'https://d.mrpp.com'],
    ['ar-creator.cn', 'https://d.ar-creator.cn'],
    ['www.ar-creator.cn', 'https://d.ar-creator.cn'],
    ['xingkou.net', 'https://d.xingkou.net'],
    ['www.xingkou.net', 'https://d.xingkou.net'],
    ['bujiaban.com', 'https://www.bujiaban.com'],
    ['www.bujiaban.com', 'https://www.bujiaban.com'],
    ['xiading.cc', 'https://d.xiading.cc'],
    ['www.xiading.cc', 'https://d.xiading.cc'],
    ['XIADING.CC.', 'https://d.xiading.cc'],
    ['xiading.hxgxonline.com', 'https://d.xiading.hxgxonline.com'],
    ['www.xiading.hxgxonline.com', 'https://d.xiading.hxgxonline.com'],
    ['xiading.hxgxonline.com:443', 'https://d.xiading.hxgxonline.com'],
    ['dev.xiading.hxgxonline.com', 'https://d.dev.xiading.hxgxonline.com'],
    ['www.dev.xiading.hxgxonline.com', 'https://d.dev.xiading.hxgxonline.com'],
  ])('maps the homepage host %s to %s', (hostname, expected) => {
    expect(resolveWorkbenchUrl(hostname)).toBe(expected)
  })

  it('uses the JSON default for an unconfigured hostname', () => {
    expect(resolveWorkbenchUrl('unknown.example.com')).toBe('https://d.xrugc.com')
  })

  it('inherits the configured URL for nested subdomains', () => {
    expect(resolveWorkbenchUrl('studio.xiading.cc')).toBe('https://d.xiading.cc')
  })

  it.each([
    'fake-xiading.cc',
    'xrugc.com.example.com',
    'xiading.cc.example.com',
  ])('does not match an unrelated hostname containing %s', (hostname) => {
    expect(resolveWorkbenchUrl(hostname)).toBe('https://d.xrugc.com')
  })
})

describe('buildWorkbenchSsoUrl', () => {
  it('passes refreshToken and lang to the workbench SSO route', () => {
    const result = buildWorkbenchSsoUrl(
      'https://app.example.com/',
      'ref+token==',
      'zh-TW'
    )
    const url = new URL(result)
    const hashParams = new URLSearchParams(url.hash.slice(1))

    expect(`${url.origin}${url.pathname}`).toBe('https://app.example.com/sso')
    expect(url.searchParams.has('refreshToken')).toBe(false)
    expect(hashParams.get('refreshToken')).toBe('ref+token==')
    expect(hashParams.get('lang')).toBe('zh-TW')
  })

  it('keeps a path-based workbench base URL', () => {
    const result = buildWorkbenchSsoUrl(
      'https://example.com/workbench/',
      'refresh-token',
      'en-US'
    )
    const url = new URL(result)
    const hashParams = new URLSearchParams(url.hash.slice(1))

    expect(url.pathname).toBe('/workbench/sso')
    expect(hashParams.get('lang')).toBe('en-US')
  })

  it('omits lang when no locale is available', () => {
    const result = buildWorkbenchSsoUrl(
      'https://app.example.com',
      'refresh-token'
    )
    const url = new URL(result)
    const hashParams = new URLSearchParams(url.hash.slice(1))

    expect(hashParams.get('refreshToken')).toBe('refresh-token')
    expect(hashParams.has('lang')).toBe(false)
  })
})
