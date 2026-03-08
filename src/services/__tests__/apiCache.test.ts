import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import * as fc from 'fast-check'
import { ApiCache } from '../apiCache'

/**
 * Validates: Requirements 7.1, 7.2, 7.3, 7.5, 15.6, 16.4
 *
 * Property 9: ApiCache TTL 内幂等性
 * 对任意 key、value 和 TTL，在 TTL 内多次读取返回相同结果，fetcher 只调用一次。
 *
 * Property 10: ApiCache 并发请求去重
 * 对任意 key 和并发数 N，同时发起 N 个请求只调用一次 fetcher，所有结果相同。
 */

describe('ApiCache', () => {
  let cache: ApiCache

  beforeEach(() => {
    cache = new ApiCache()
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  // ============================================
  // Basic caching
  // ============================================

  describe('basic caching', () => {
    it('calls fetcher once and caches result', async () => {
      const fetcher = vi.fn().mockResolvedValue('data')
      const r1 = await cache.get('key', fetcher)
      const r2 = await cache.get('key', fetcher)
      expect(r1).toBe('data')
      expect(r2).toBe('data')
      expect(fetcher).toHaveBeenCalledTimes(1)
    })

    it('returns cached value within TTL', async () => {
      const fetcher = vi.fn().mockResolvedValue(42)
      await cache.get('k', fetcher, 5000)
      vi.advanceTimersByTime(4999)
      await cache.get('k', fetcher, 5000)
      expect(fetcher).toHaveBeenCalledTimes(1)
    })
  })

  // ============================================
  // TTL expiry (Requirement 7.3)
  // ============================================

  describe('TTL expiry', () => {
    it('re-fetches after TTL expires', async () => {
      const fetcher = vi.fn()
        .mockResolvedValueOnce('first')
        .mockResolvedValueOnce('second')

      const r1 = await cache.get('key', fetcher, 1000)
      expect(r1).toBe('first')

      vi.advanceTimersByTime(1001)

      const r2 = await cache.get('key', fetcher, 1000)
      expect(r2).toBe('second')
      expect(fetcher).toHaveBeenCalledTimes(2)
    })
  })

  // ============================================
  // Request deduplication (Requirement 7.2)
  // ============================================

  describe('request deduplication', () => {
    it('concurrent requests for same key only call fetcher once', async () => {
      let resolvePromise!: (v: string) => void
      const fetcher = vi.fn().mockReturnValue(
        new Promise<string>((res) => { resolvePromise = res })
      )

      const promises = Array.from({ length: 5 }, () => cache.get('key', fetcher))
      resolvePromise('result')
      const results = await Promise.all(promises)

      expect(fetcher).toHaveBeenCalledTimes(1)
      expect(results).toEqual(['result', 'result', 'result', 'result', 'result'])
    })
  })

  // ============================================
  // Failed requests not cached (Requirement 7.5)
  // ============================================

  describe('failed requests', () => {
    it('does not cache failed requests', async () => {
      const fetcher = vi.fn()
        .mockRejectedValueOnce(new Error('fail'))
        .mockResolvedValueOnce('success')

      await expect(cache.get('key', fetcher)).rejects.toThrow('fail')
      const result = await cache.get('key', fetcher)
      expect(result).toBe('success')
      expect(fetcher).toHaveBeenCalledTimes(2)
    })

    it('allows retry after failure', async () => {
      const fetcher = vi.fn()
        .mockRejectedValueOnce(new Error('network error'))
        .mockResolvedValueOnce('recovered')

      try { await cache.get('key', fetcher) } catch {}
      const result = await cache.get('key', fetcher)
      expect(result).toBe('recovered')
    })
  })

  // ============================================
  // clear() (Requirement 7.1)
  // ============================================

  describe('clear', () => {
    it('clear(key) removes specific entry', async () => {
      const fetcher = vi.fn().mockResolvedValue('data')
      await cache.get('a', fetcher)
      await cache.get('b', fetcher)
      cache.clear('a')
      await cache.get('a', fetcher)
      await cache.get('b', fetcher)
      expect(fetcher).toHaveBeenCalledTimes(3) // a fetched twice, b once
    })

    it('clear() removes all entries', async () => {
      const fetcher = vi.fn().mockResolvedValue('data')
      await cache.get('a', fetcher)
      await cache.get('b', fetcher)
      cache.clear()
      await cache.get('a', fetcher)
      await cache.get('b', fetcher)
      expect(fetcher).toHaveBeenCalledTimes(4)
    })
  })

  // ============================================
  // Property tests
  // ============================================

  describe('property tests', () => {
    /**
     * Property 9: TTL 内多次读取返回相同结果（幂等性）
     * Validates: Requirements 7.1, 15.6, 16.4
     */
    it('property: reads within TTL are idempotent', async () => {
      await fc.assert(
        fc.asyncProperty(
          fc.string({ minLength: 1 }),
          fc.integer({ min: 1, max: 100 }),
          fc.integer({ min: 1000, max: 60000 }),
          async (key, value, ttl) => {
            const localCache = new ApiCache()
            const fetcher = vi.fn().mockResolvedValue(value)
            const r1 = await localCache.get(key, fetcher, ttl)
            const r2 = await localCache.get(key, fetcher, ttl)
            const r3 = await localCache.get(key, fetcher, ttl)
            expect(r1).toBe(value)
            expect(r2).toBe(value)
            expect(r3).toBe(value)
            expect(fetcher).toHaveBeenCalledTimes(1)
          }
        ),
        { numRuns: 50 }
      )
    })

    /**
     * Property 10: 并发请求去重，只发起一次网络请求
     * Validates: Requirements 7.2, 15.6, 16.4
     */
    it('property: N concurrent requests for same key call fetcher exactly once', async () => {
      await fc.assert(
        fc.asyncProperty(
          fc.string({ minLength: 1 }),
          fc.integer({ min: 2, max: 10 }),
          async (key, concurrency) => {
            const localCache = new ApiCache()
            let resolveIt!: (v: number) => void
            const fetcher = vi.fn().mockReturnValue(
              new Promise<number>((res) => { resolveIt = res })
            )
            const promises = Array.from({ length: concurrency }, () =>
              localCache.get(key, fetcher)
            )
            resolveIt(42)
            const results = await Promise.all(promises)
            expect(fetcher).toHaveBeenCalledTimes(1)
            expect(results.every((r) => r === 42)).toBe(true)
          }
        ),
        { numRuns: 20 }
      )
    })
  })
})
