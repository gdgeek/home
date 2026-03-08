/**
 * API 请求缓存与去重模块
 *
 * _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5_
 */

const DEFAULT_TTL = 300_000; // 5 分钟

interface CacheEntry<T> {
  data: T;
  expiresAt: number;
}

export class ApiCache {
  private cache = new Map<string, CacheEntry<unknown>>();
  private pending = new Map<string, Promise<unknown>>();

  /**
   * 获取缓存数据，若无缓存则调用 fetcher 并缓存结果。
   * 并发请求同一 key 时只发起一次网络请求（请求去重）。
   * 失败请求不缓存。
   */
  async get<T>(key: string, fetcher: () => Promise<T>, ttl = DEFAULT_TTL): Promise<T> {
    // 命中有效缓存
    const entry = this.cache.get(key) as CacheEntry<T> | undefined;
    if (entry && Date.now() < entry.expiresAt) {
      return entry.data;
    }

    // 请求去重：已有进行中的请求则复用
    if (this.pending.has(key)) {
      return this.pending.get(key) as Promise<T>;
    }

    // 发起新请求
    const promise = fetcher()
      .then((data) => {
        this.cache.set(key, { data, expiresAt: Date.now() + ttl });
        this.pending.delete(key);
        return data;
      })
      .catch((err) => {
        // 失败不缓存，移除 pending
        this.pending.delete(key);
        throw err;
      });

    this.pending.set(key, promise as Promise<unknown>);
    return promise;
  }

  /**
   * 清除缓存。不传 key 时清除全部。
   */
  clear(key?: string): void {
    if (key !== undefined) {
      this.cache.delete(key);
    } else {
      this.cache.clear();
    }
  }
}

/** 全局单例 */
const apiCache = new ApiCache();
export default apiCache;
