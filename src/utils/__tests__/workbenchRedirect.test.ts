import { describe, expect, it } from 'vitest'
import { buildWorkbenchSsoUrl, resolveWorkbenchUrl } from '../workbenchRedirect'

describe('resolveWorkbenchUrl', () => {
  it.each([
    ['xiading.cc', 'https://d.xiading.cc'],
    ['XIADING.CC.', 'https://d.xiading.cc'],
    ['xiading.hxgxonline.com', 'https://d.xiading.hxgxonline.com'],
    ['xiading.hxgxonline.com:443', 'https://d.xiading.hxgxonline.com'],
  ])('maps the homepage host %s to %s', (hostname, expected) => {
    expect(resolveWorkbenchUrl('https://configured.example.com', hostname)).toBe(expected)
  })

  it('keeps the configured URL for other homepage hosts', () => {
    expect(resolveWorkbenchUrl('https://d.xrugc.com', 'xrugc.com')).toBe('https://d.xrugc.com')
  })

  it('returns undefined when no mapping or configured URL exists', () => {
    expect(resolveWorkbenchUrl(undefined, 'localhost')).toBeUndefined()
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
