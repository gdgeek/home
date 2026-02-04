/**
 * useBaseInfo Composable
 * 封装基础信息获取逻辑和默认值处理
 * 
 * _Requirements: 9.1, 9.2, 9.3_
 */

import { ref, onMounted } from 'vue'
import { backendApi, getDefaultBaseInfo } from '@/services/backendApi'
import type { BaseInfo } from '@/types'

/**
 * useBaseInfo composable返回类型
 */
export interface UseBaseInfoReturn {
  /** 基础信息数据 */
  baseInfo: ReturnType<typeof ref<BaseInfo>>
  /** 加载状态 */
  loading: ReturnType<typeof ref<boolean>>
  /** 错误信息 */
  error: ReturnType<typeof ref<string | null>>
  /** 获取基础信息 */
  fetchBaseInfo: () => Promise<void>
}

/**
 * 基础信息获取和状态管理composable
 * 
 * @param autoFetch 是否在挂载时自动获取数据，默认为true
 * @returns UseBaseInfoReturn
 * 
 * @example
 * ```vue
 * <script setup lang="ts">
 * import { useBaseInfo } from '@/composables/useBaseInfo'
 * 
 * const { baseInfo, loading, error, fetchBaseInfo } = useBaseInfo()
 * </script>
 * ```
 */
export function useBaseInfo(autoFetch: boolean = true): UseBaseInfoReturn {
  // 响应式状态
  // 初始化时使用默认值，确保页面可以正常渲染 (_Requirements: 9.3_)
  const baseInfo = ref<BaseInfo>(getDefaultBaseInfo())
  const loading = ref<boolean>(false)
  const error = ref<string | null>(null)

  /**
   * 获取基础信息
   * 
   * _Requirements: 9.1_ - 页面初始化时从Backend_API获取基础信息
   * _Requirements: 9.2_ - Backend_API返回数据成功时使用返回的配置信息渲染页面
   * _Requirements: 9.3_ - Backend_API请求失败时使用默认配置信息并显示提示
   */
  const fetchBaseInfo = async (): Promise<void> => {
    // 设置加载状态
    loading.value = true
    error.value = null

    try {
      // 调用Backend API获取基础信息 (_Requirements: 9.1_)
      const result = await backendApi.getBaseInfo()
      
      // 成功：更新基础信息 (_Requirements: 9.2_)
      baseInfo.value = result
      error.value = null
    } catch (err) {
      // 失败：保持默认值，设置错误信息 (_Requirements: 9.3_)
      console.error('Failed to fetch base info:', err)
      
      // 提取错误信息
      if (err && typeof err === 'object' && 'message' in err) {
        error.value = (err as { message: string }).message
      } else {
        error.value = '基础信息加载失败，使用默认配置'
      }
      
      // 保持默认值，确保页面正常显示 (_Requirements: 9.3_)
      // baseInfo.value 保持初始化时的默认值
    } finally {
      // 无论成功失败，都结束加载状态
      loading.value = false
    }
  }

  // 在组件挂载时自动获取数据 (_Requirements: 9.1_)
  onMounted(() => {
    if (autoFetch) {
      fetchBaseInfo()
    }
  })

  return {
    baseInfo,
    loading,
    error,
    fetchBaseInfo
  }
}

/**
 * 默认导出
 */
export default useBaseInfo
