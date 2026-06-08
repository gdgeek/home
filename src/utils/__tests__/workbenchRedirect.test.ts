import { describe, expect, it } from 'vitest'
import { buildWorkbenchSsoUrl } from '../workbenchRedirect'

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
