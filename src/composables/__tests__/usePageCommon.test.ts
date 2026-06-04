/**
 * Validates: Requirements 1.2, 1.3, 1.5, 1.6
 *
 * Tests for usePageCommon composable:
 * - Scroll listener registered on mount, removed on unmount
 * - formatDate returns non-empty string for valid ISO dates (property test)
 * - formatDate returns original string for invalid dates (boundary test)
 * - handleOpenLogin, handleOpenNewsDetail, handleScroll behavior
 * - Computed properties (blogUrl, version) from runtime config
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent } from 'vue'
import * as fc from 'fast-check'

vi.mock('@/types/runtime', () => ({
  getRuntimeConfig: () => ({
    __WORDPRESS_API_URL__: 'https://test.blog.com',
    __APP_VERSION__: '2024-01-01 08:00:00 GMT+8',
    __BUILD_TIME__: '2024-01-01T08:00:00+08:00',
  }),
}))

import { usePageCommon } from '../usePageCommon'

function withSetup<T>(composable: () => T): [T, ReturnType<typeof mount>] {
  let result!: T
  const TestComponent = defineComponent({
    setup() {
      result = composable()
      return {}
    },
    template: '<div></div>',
  })
  const wrapper = mount(TestComponent)
  return [result, wrapper]
}

describe('usePageCommon', () => {
  beforeEach(() => {
    vi.spyOn(window, 'addEventListener')
    vi.spyOn(window, 'removeEventListener')
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  // ============================================
  // Lifecycle - scroll listener (Requirements 1.2, 1.3)
  // ============================================

  describe('lifecycle - scroll listener', () => {
    /**
     * Validates: Requirements 1.2
     */
    it('registers scroll listener on mount', () => {
      const [, wrapper] = withSetup(() => usePageCommon())
      expect(window.addEventListener).toHaveBeenCalledWith('scroll', expect.any(Function))
      wrapper.unmount()
    })

    /**
     * Validates: Requirements 1.3
     */
    it('removes scroll listener on unmount', () => {
      const [, wrapper] = withSetup(() => usePageCommon())
      wrapper.unmount()
      expect(window.removeEventListener).toHaveBeenCalledWith('scroll', expect.any(Function))
    })
  })

  // ============================================
  // handleOpenLogin
  // ============================================

  describe('handleOpenLogin', () => {
    it('sets showLoginModal to true', () => {
      const [result, wrapper] = withSetup(() => usePageCommon())
      expect(result.showLoginModal.value).toBe(false)
      result.handleOpenLogin()
      expect(result.showLoginModal.value).toBe(true)
      wrapper.unmount()
    })
  })

  // ============================================
  // handleOpenNewsDetail
  // ============================================

  describe('handleOpenNewsDetail', () => {
    it('sets selectedNews and showNewsModal', () => {
      const [result, wrapper] = withSetup(() => usePageCommon())
      const newsItem = {
        id: 1,
        title: 'Test',
        excerpt: '',
        content: '',
        date: '2024-01-01',
        link: '#',
        category: { id: 1, name: 'Test', slug: 'test' },
      }
      result.handleOpenNewsDetail(newsItem)
      expect(result.selectedNews.value).toStrictEqual(newsItem)
      expect(result.showNewsModal.value).toBe(true)
      wrapper.unmount()
    })
  })

  // ============================================
  // handleScroll
  // ============================================

  describe('handleScroll', () => {
    it('sets navScrolled true when scrollY > 40', () => {
      const [result, wrapper] = withSetup(() => usePageCommon())
      Object.defineProperty(window, 'scrollY', { value: 100, configurable: true })
      result.handleScroll()
      expect(result.navScrolled.value).toBe(true)
      wrapper.unmount()
    })

    it('sets navScrolled false when scrollY <= 40', () => {
      const [result, wrapper] = withSetup(() => usePageCommon())
      Object.defineProperty(window, 'scrollY', { value: 10, configurable: true })
      result.handleScroll()
      expect(result.navScrolled.value).toBe(false)
      wrapper.unmount()
    })
  })

  // ============================================
  // formatDate (Requirements 1.5, 1.6)
  // ============================================

  describe('formatDate', () => {
    /**
     * Validates: Requirements 1.6
     */
    it('returns original string for invalid date', () => {
      const [result, wrapper] = withSetup(() => usePageCommon())
      expect(result.formatDate('not-a-date')).toBe('not-a-date')
      expect(result.formatDate('')).toBe('')
      wrapper.unmount()
    })

    /**
     * Validates: Requirements 1.5
     */
    it('returns non-empty string for valid ISO date', () => {
      const [result, wrapper] = withSetup(() => usePageCommon())
      const formatted = result.formatDate('2024-03-15T10:00:00')
      expect(formatted).toBeTruthy()
      expect(typeof formatted).toBe('string')
      wrapper.unmount()
    })

    /**
     * Property test: any valid ISO date string returns a non-empty formatted string
     * Validates: Requirements 1.5
     */
    it('property: valid ISO date strings always return non-empty formatted string', () => {
      const [result, wrapper] = withSetup(() => usePageCommon())
      fc.assert(
        fc.property(
          fc.date({ min: new Date('2000-01-01'), max: new Date('2099-12-31') }).filter(
            (d) => !isNaN(d.getTime())
          ),
          (date) => {
            const iso = date.toISOString()
            const formatted = result.formatDate(iso)
            expect(formatted).toBeTruthy()
            expect(typeof formatted).toBe('string')
          }
        ),
        { numRuns: 100 }
      )
      wrapper.unmount()
    })

    /**
     * Property test: invalid date strings are returned unchanged
     * Validates: Requirements 1.6
     */
    it('property: invalid date strings are returned unchanged', () => {
      const [result, wrapper] = withSetup(() => usePageCommon())
      fc.assert(
        fc.property(
          fc.string().filter((s) => isNaN(new Date(s).getTime())),
          (invalidDate) => {
            expect(result.formatDate(invalidDate)).toBe(invalidDate)
          }
        ),
        { numRuns: 50 }
      )
      wrapper.unmount()
    })
  })

  // ============================================
  // Computed properties
  // ============================================

  describe('computed properties', () => {
    it('blogUrl returns value from runtime config', () => {
      const [result, wrapper] = withSetup(() => usePageCommon())
      expect(result.blogUrl.value).toBe('https://test.blog.com')
      wrapper.unmount()
    })

    it('version returns value from runtime config', () => {
      const [result, wrapper] = withSetup(() => usePageCommon())
      expect(result.version.value).toBe('2024-01-01 08:00:00 GMT+8')
      wrapper.unmount()
    })
  })
})
