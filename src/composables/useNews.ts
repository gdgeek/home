/**
 * useNews Composable
 * 封装新闻数据获取逻辑和状态管理
 * 
 * _Requirements: 8.1, 8.2, 8.3, 8.4_
 */

import { ref, onMounted } from 'vue'
import { wordpressApi } from '@/services/wordpressApi'
import type { NewsItem, NewsQueryParams } from '@/types'

/**
 * useNews composable返回类型
 */
export interface UseNewsReturn {
  /** 新闻列表数据 */
  news: ReturnType<typeof ref<NewsItem[]>>
  /** 加载状态 */
  loading: ReturnType<typeof ref<boolean>>
  /** 错误信息 */
  error: ReturnType<typeof ref<string | null>>
  /** 获取新闻数据 */
  fetchNews: (params?: NewsQueryParams) => Promise<void>
  /** 重试获取新闻 */
  retry: () => Promise<void>
}

/**
 * 新闻数据获取和状态管理composable
 * 
 * @param autoFetch 是否在挂载时自动获取数据，默认为true
 * @returns UseNewsReturn
 * 
 * @example
 * ```vue
 * <script setup lang="ts">
 * import { useNews } from '@/composables/useNews'
 * 
 * const { news, loading, error, retry } = useNews()
 * </script>
 * ```
 */
export function useNews(autoFetch: boolean = true): UseNewsReturn {
  // 响应式状态
  const news = ref<NewsItem[]>([])
  const loading = ref<boolean>(false)
  const error = ref<string | null>(null)

  // 保存最后一次请求的参数，用于重试
  let lastParams: NewsQueryParams | undefined

  /**
   * 获取新闻数据
   * 
   * _Requirements: 8.1_ - 页面加载完成时从WordPress_API获取新闻数据
   * _Requirements: 8.2_ - WordPress_API返回数据成功时显示新闻列表
   * _Requirements: 8.3_ - WordPress_API请求失败时显示友好的错误提示信息
   * _Requirements: 8.4_ - 新闻数据加载中时显示加载状态指示器
   * 
   * @param params 查询参数
   */
  const fetchNews = async (params?: NewsQueryParams): Promise<void> => {
    // 保存参数用于重试
    lastParams = params

    // 设置加载状态 (_Requirements: 8.4_)
    loading.value = true
    error.value = null

    try {
      // 调用WordPress API获取新闻 (_Requirements: 8.1_)
      const result = await wordpressApi.getNews(params)
      
      // 成功：设置新闻数据，清除错误 (_Requirements: 8.2_)
      news.value = result
      error.value = null
    } catch (err) {
      // 失败：设置错误信息 (_Requirements: 8.3_)
      console.error('Failed to fetch news:', err)
      
      // 提取错误信息
      if (err && typeof err === 'object' && 'message' in err) {
        error.value = (err as { message: string }).message
      } else {
        error.value = '新闻加载失败，请稍后重试'
      }
      
      // 保留之前的数据（如果有）
      // news.value 保持不变
    } finally {
      // 无论成功失败，都结束加载状态
      loading.value = false
    }
  }

  /**
   * 重试获取新闻
   * 使用上次的参数重新请求
   */
  const retry = async (): Promise<void> => {
    await fetchNews(lastParams)
  }

  // 在组件挂载时自动获取数据 (_Requirements: 8.1_)
  onMounted(() => {
    if (autoFetch) {
      fetchNews()
    }
  })

  return {
    news,
    loading,
    error,
    fetchNews,
    retry
  }
}

/**
 * 默认导出
 */
export default useNews
