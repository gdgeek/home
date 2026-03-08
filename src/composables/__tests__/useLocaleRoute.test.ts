/**
 * Validates: Requirements 15.5
 *
 * Tests for useLocaleRoute composable:
 * - switchLocale updates activeLang and calls router.replace with correct lang param
 * - Alias codes are normalized to full locale codes
 * - Unsupported codes are ignored
 * - Locale is persisted to localStorage
 * - Initialization from URL ?lang= param
 * - Property test: for any valid locale code, switchLocale sets URL lang param consistently
 */

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { ref } from 'vue'
import * as fc from 'fast-check'

// Mock vue-router
const mockReplace = vi.fn()
const mockRoute = { query: {} as Record<string, string> }
vi.mock('vue-router', () => ({
  useRouter: () => ({ replace: mockReplace }),
  useRoute: () => mockRoute,
}))

// Mock vue-i18n
const mockLocale = ref('en-US')
vi.mock('vue-i18n', () => ({
  useI18n: () => ({ locale: mockLocale }),
}))

// Mock @/router
vi.mock('@/router', () => ({
  isSupportedLocale: (v: string) => ['zh-CN', 'zh-TW', 'en-US', 'th-TH', 'ja-JP'].includes(v),
  SUPPORTED_LOCALES: ['zh-CN', 'zh-TW', 'en-US', 'th-TH', 'ja-JP'],
}))

// Import AFTER mocks
import { useLocaleRoute } from '../useLocaleRoute'

const SUPPORTED_LOCALES = ['zh-CN', 'zh-TW', 'en-US', 'th-TH', 'ja-JP'] as const

const ALIAS_MAP: Record<string, string> = {
  'en': 'en-US',
  'zh-CN': 'zh-CN',
  'zh-TW': 'zh-TW',
  'ja': 'ja-JP',
  'th': 'th-TH',
}

describe('useLocaleRoute', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockLocale.value = 'en-US'
    mockRoute.query = {}
    localStorage.clear()
  })

  describe('switchLocale', () => {
    it('updates activeLang and locale when switching to a supported locale', () => {
      const { activeLang, switchLocale } = useLocaleRoute('en-US')
      switchLocale('zh-CN')
      expect(activeLang.value).toBe('zh-CN')
      expect(mockLocale.value).toBe('zh-CN')
    })

    it('calls router.replace with correct lang query param', () => {
      const { switchLocale } = useLocaleRoute('en-US')
      switchLocale('zh-TW')
      expect(mockReplace).toHaveBeenCalledWith(
        expect.objectContaining({ query: expect.objectContaining({ lang: 'zh-TW' }) })
      )
    })

    it('normalizes alias codes: "en" → "en-US"', () => {
      const { activeLang, switchLocale } = useLocaleRoute('en-US')
      switchLocale('en')
      expect(activeLang.value).toBe('en-US')
      expect(mockReplace).toHaveBeenCalledWith(
        expect.objectContaining({ query: expect.objectContaining({ lang: 'en-US' }) })
      )
    })

    it('normalizes alias codes: "ja" → "ja-JP"', () => {
      const { activeLang, switchLocale } = useLocaleRoute('en-US')
      switchLocale('ja')
      expect(activeLang.value).toBe('ja-JP')
    })

    it('normalizes alias codes: "th" → "th-TH"', () => {
      const { activeLang, switchLocale } = useLocaleRoute('en-US')
      switchLocale('th')
      expect(activeLang.value).toBe('th-TH')
    })

    it('does nothing for unsupported locale codes', () => {
      const { activeLang, switchLocale } = useLocaleRoute('en-US')
      const before = activeLang.value
      switchLocale('xx-XX')
      expect(activeLang.value).toBe(before)
      expect(mockReplace).not.toHaveBeenCalledWith(
        expect.objectContaining({ query: expect.objectContaining({ lang: 'xx-XX' }) })
      )
    })

    it('saves locale to localStorage', () => {
      const { switchLocale } = useLocaleRoute('en-US')
      switchLocale('zh-CN')
      expect(localStorage.getItem('xrugc_user_locale')).toBe('zh-CN')
    })
  })

  describe('initialization', () => {
    it('uses URL ?lang param as initial locale', () => {
      mockRoute.query = { lang: 'zh-TW' }
      const { activeLang } = useLocaleRoute('en-US')
      expect(activeLang.value).toBe('zh-TW')
    })

    it('falls back to defaultLocale when no URL param or storage', () => {
      mockRoute.query = {}
      localStorage.clear()
      const { activeLang } = useLocaleRoute('zh-CN')
      expect(activeLang.value).toBe('zh-CN')
    })

    it('falls back to localStorage when no URL param', () => {
      mockRoute.query = {}
      localStorage.setItem('xrugc_user_locale', 'ja-JP')
      const { activeLang } = useLocaleRoute('en-US')
      expect(activeLang.value).toBe('ja-JP')
    })
  })

  describe('property tests', () => {
    /**
     * Property: for any valid locale code (supported or alias),
     * switchLocale sets the URL ?lang= param to the normalized value,
     * and activeLang reflects the same normalized value.
     *
     * Validates: Requirements 15.5
     */
    it('property: switchLocale with any valid locale sets URL lang param to normalized value', () => {
      const allCodes = [...SUPPORTED_LOCALES, ...Object.keys(ALIAS_MAP)]
      fc.assert(
        fc.property(fc.constantFrom(...allCodes), (code) => {
          vi.clearAllMocks()
          mockRoute.query = {}
          const { switchLocale, activeLang } = useLocaleRoute('en-US')
          switchLocale(code)
          const expected = ALIAS_MAP[code] ?? code
          expect(activeLang.value).toBe(expected)
          expect(mockReplace).toHaveBeenCalledWith(
            expect.objectContaining({ query: expect.objectContaining({ lang: expected }) })
          )
        })
      )
    })
  })
})
