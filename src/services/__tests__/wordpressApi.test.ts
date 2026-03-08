import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import * as fc from 'fast-check'

/**
 * Validates: Requirements 15.3, 16.3
 *
 * Property 8: wordpressApi transformPost 数据转换完整性
 * 对任意符合 WordPress REST API 格式的有效文章响应对象，
 * transformPost 函数应返回包含 id、title、content、date、excerpt 字段的 NewsItem 对象，
 * 且不抛出异常。
 */

// Mock axios before any imports
vi.mock('axios')

beforeEach(() => {
  ;(window as any).__WORDPRESS_API_URL__ = 'http://test.example.com/wp-json/wp/v2'
  vi.clearAllMocks()
})

afterEach(() => {
  delete (window as any).__WORDPRESS_API_URL__
  vi.resetModules()
})

// ============================================
// Arbitraries for WP API shapes
// ============================================

const wpCategoryArb = fc.record({
  id: fc.integer({ min: 1, max: 9999 }),
  name: fc.string({ minLength: 1, maxLength: 50 }),
  slug: fc.string({ minLength: 1, maxLength: 50 }),
  count: fc.integer({ min: 0 }),
  description: fc.string(),
  parent: fc.constant(0),
})

const wpPostArb = fc.record({
  id: fc.integer({ min: 1, max: 99999 }),
  date: fc.constant('2024-01-15T10:00:00'),
  link: fc.webUrl(),
  title: fc.record({ rendered: fc.string({ minLength: 1, maxLength: 200 }) }),
  excerpt: fc.record({ rendered: fc.string({ minLength: 0, maxLength: 500 }) }),
  content: fc.record({ rendered: fc.string({ minLength: 0, maxLength: 5000 }) }),
  categories: fc.array(fc.integer({ min: 1, max: 100 }), { minLength: 0, maxLength: 3 }),
  featured_media: fc.integer({ min: 0 }),
})

// ============================================
// Helper: get a fresh wordpressApi instance
// ============================================

async function getFreshApi() {
  vi.resetModules()
  const mod = await import('../wordpressApi')
  return mod.wordpressApi
}

async function getMockedAxios() {
  const axiosMod = await import('axios')
  return vi.mocked(axiosMod.default)
}

// ============================================
// Tests
// ============================================

describe('wordpressApi', () => {
  describe('getCategories', () => {
    it('returns empty array when baseURL is not set', async () => {
      delete (window as any).__WORDPRESS_API_URL__
      const api = await getFreshApi()
      const result = await api.getCategories()
      expect(result).toEqual([])
    })

    it('transforms WP categories to NewsCategory format', async () => {
      const mockCategories = [
        { id: 1, name: '官方新闻', slug: 'official', count: 5, description: '', parent: 0 },
        { id: 2, name: '行业动态', slug: 'industry', count: 3, description: '', parent: 0 },
      ]
      const axios = await getMockedAxios()
      axios.get = vi.fn().mockResolvedValue({ data: mockCategories })
      const api = await getFreshApi()
      const result = await api.getCategories()
      expect(result).toHaveLength(2)
      expect(result[0]).toMatchObject({ id: 1, name: '官方新闻', slug: 'official' })
      expect(result[1]).toMatchObject({ id: 2, name: '行业动态', slug: 'industry' })
    })

    it('returns empty array on network error', async () => {
      const axios = await getMockedAxios()
      axios.get = vi.fn().mockRejectedValue(new Error('Network error'))
      const api = await getFreshApi()
      const result = await api.getCategories()
      expect(result).toEqual([])
    })
  })

  describe('getNews', () => {
    it('returns empty array when baseURL is not set', async () => {
      delete (window as any).__WORDPRESS_API_URL__
      const api = await getFreshApi()
      const result = await api.getNews()
      expect(result).toEqual([])
    })

    it('returns empty array on network error', async () => {
      const axios = await getMockedAxios()
      axios.get = vi.fn().mockRejectedValue(new Error('Network error'))
      const api = await getFreshApi()
      const result = await api.getNews()
      expect(result).toEqual([])
    })

    it('transforms WP posts to NewsItem format', async () => {
      const mockPosts = [
        {
          id: 42,
          date: '2024-03-01T09:00:00',
          link: 'http://test.example.com/post/42',
          title: { rendered: '<b>Test Post</b>' },
          excerpt: { rendered: '<p>Short excerpt</p>' },
          content: { rendered: '<p>Full content here</p>' },
          categories: [1],
          featured_media: 0,
        },
      ]
      const axios = await getMockedAxios()
      axios.get = vi.fn()
        .mockResolvedValueOnce({ data: [] })       // categories call
        .mockResolvedValueOnce({ data: mockPosts }) // posts call
      const api = await getFreshApi()
      const result = await api.getNews()
      expect(result).toHaveLength(1)
      const item = result[0]
      expect(item.id).toBe(42)
      expect(item.title).toBe('Test Post')          // HTML stripped
      expect(item.excerpt).toBe('Short excerpt')    // HTML stripped
      expect(item.content).toBe('<p>Full content here</p>') // content kept as HTML
      expect(item.date).toBe('2024-03-01T09:00:00')
      expect(item.link).toBe('http://test.example.com/post/42')
      expect(item.category).toBeDefined()
      expect(typeof item.category.name).toBe('string')
    })

    it('uses category from categoriesMap when available', async () => {
      const mockCategories = [
        { id: 5, name: '校园案例', slug: 'campus', count: 2, description: '', parent: 0 },
      ]
      const mockPosts = [
        {
          id: 10,
          date: '2024-01-01T00:00:00',
          link: 'http://test.example.com/post/10',
          title: { rendered: 'Campus Post' },
          excerpt: { rendered: '' },
          content: { rendered: '<p>content</p>' },
          categories: [5],
          featured_media: 0,
        },
      ]
      const axios = await getMockedAxios()
      axios.get = vi.fn()
        .mockResolvedValueOnce({ data: mockCategories }) // categories call
        .mockResolvedValueOnce({ data: mockPosts })      // posts call
      const api = await getFreshApi()
      const result = await api.getNews()
      expect(result[0].category.id).toBe(5)
      expect(result[0].category.name).toBe('校园案例')
    })

    // Property test: for any valid WP post array, getNews returns NewsItems with required fields
    // Validates: Requirements 15.3, 16.3
    it('property: any valid WP post array produces NewsItems with required fields', async () => {
      await fc.assert(
        fc.asyncProperty(
          fc.array(wpPostArb, { minLength: 1, maxLength: 5 }),
          async (posts) => {
            const axios = await getMockedAxios()
            axios.get = vi.fn()
              .mockResolvedValueOnce({ data: [] })       // categories call
              .mockResolvedValueOnce({ data: posts })    // posts call
            const api = await getFreshApi()
            const result = await api.getNews()
            expect(result).toHaveLength(posts.length)
            for (const item of result) {
              // Required fields per Property 8 / Requirement 15.3
              expect(typeof item.id).toBe('number')
              expect(typeof item.title).toBe('string')
              expect(typeof item.excerpt).toBe('string')
              expect(typeof item.content).toBe('string')
              expect(typeof item.date).toBe('string')
              expect(typeof item.link).toBe('string')
              expect(item.category).toBeDefined()
              expect(typeof item.category.name).toBe('string')
            }
          }
        ),
        { numRuns: 20 }
      )
    })

    // Property test: for any valid WP category array, getCategories returns NewsCategory with required fields
    it('property: any valid WP category array produces NewsCategory with required fields', async () => {
      await fc.assert(
        fc.asyncProperty(
          fc.array(wpCategoryArb, { minLength: 1, maxLength: 10 }),
          async (categories) => {
            const axios = await getMockedAxios()
            axios.get = vi.fn().mockResolvedValue({ data: categories })
            const api = await getFreshApi()
            const result = await api.getCategories()
            expect(result).toHaveLength(categories.length)
            for (const cat of result) {
              expect(typeof cat.id).toBe('number')
              expect(typeof cat.name).toBe('string')
              expect(typeof cat.slug).toBe('string')
            }
          }
        ),
        { numRuns: 20 }
      )
    })
  })
})
