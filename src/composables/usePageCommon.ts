/**
 * usePageCommon - 共享页面逻辑 Composable
 *
 * 封装三个品牌首页（星扣、夏鼎、XRUGC）的公共逻辑：
 * - 滚动检测与动画触发
 * - 新闻弹窗状态管理
 * - 登录弹窗状态管理
 * - 日期格式化
 * - 博客地址、版本号、构建时间计算属性
 *
 * 验证：需求 1.1、1.2、1.3、1.4、1.5、1.6
 */

import { ref, computed, onMounted, onUnmounted } from 'vue'
import type { Ref, ComputedRef } from 'vue'
import { getRuntimeConfig } from '@/types/runtime'
import type { NewsItem } from '@/types'

// ============================================
// 返回类型接口
// ============================================

export interface UsePageCommonReturn {
  // 状态
  showLoginModal: Ref<boolean>
  showNewsModal: Ref<boolean>
  selectedNews: Ref<NewsItem | null>
  navScrolled: Ref<boolean>
  animatedSections: Ref<Set<HTMLElement>>
  // 计算属性
  blogUrl: ComputedRef<string>
  version: ComputedRef<string>
  buildTime: ComputedRef<string>
  // 方法
  handleOpenLogin: () => void
  handleOpenNewsDetail: (item: NewsItem) => void
  handleScroll: () => void
  formatDate: (dateString: string, locale?: string) => string
}

// ============================================
// 工具函数
// ============================================

/**
 * 判断元素是否在视口内（85% 阈值）
 */
function isInViewport(element: HTMLElement): boolean {
  const rect = element.getBoundingClientRect()
  return rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85
}

// ============================================
// Composable
// ============================================

/**
 * 共享页面逻辑 Composable
 *
 * 自动在 onMounted 注册 scroll 监听并触发初始检测，
 * 在 onUnmounted 移除监听防止内存泄漏。
 *
 * @param animateSelector CSS 选择器，用于查找需要动画的元素，默认 '.animate-on-scroll'
 */
export function usePageCommon(animateSelector = '.animate-on-scroll'): UsePageCommonReturn {
  // ---- 状态 ----
  const showLoginModal = ref<boolean>(false)
  const showNewsModal = ref<boolean>(false)
  const selectedNews = ref<NewsItem | null>(null)
  const navScrolled = ref<boolean>(false)
  const animatedSections = ref<Set<HTMLElement>>(new Set())

  // ---- 计算属性 ----

  /**
   * 博客/WordPress 地址
   * 优先读取运行时注入的 __WORDPRESS_API_URL__，降级到默认值
   */
  const blogUrl = computed<string>(() => {
    const config = getRuntimeConfig()
    return config.__WORDPRESS_API_URL__ || 'https://blog.hxgxonline.com'
  })

  /**
   * 应用版本号，读取运行时注入的 __APP_VERSION__，默认 '1.0.0'
   */
  const version = computed<string>(() => {
    const config = getRuntimeConfig()
    return config.__APP_VERSION__ ?? '1.0.0'
  })

  /**
   * 构建时间，读取运行时注入的 __BUILD_TIME__，默认当天日期
   */
  const buildTime = computed<string>(() => {
    const config = getRuntimeConfig()
    return config.__BUILD_TIME__ ?? new Date().toISOString().split('T')[0]
  })

  // ---- 方法 ----

  /** 打开登录弹窗 */
  const handleOpenLogin = (): void => {
    showLoginModal.value = true
  }

  /**
   * 打开新闻详情弹窗
   * @param item 新闻条目
   */
  const handleOpenNewsDetail = (item: NewsItem): void => {
    selectedNews.value = item
    showNewsModal.value = true
  }

  /**
   * 格式化日期字符串
   *
   * 需求 1.5：有效 ISO 日期字符串返回 locale 格式化结果
   * 需求 1.6：无效日期字符串返回原始字符串，不抛出异常
   *
   * @param dateString ISO 日期字符串
   * @param locale 语言区域，默认 'zh-CN'
   * @returns 格式化后的日期字符串，或原始字符串（无效时）
   */
  const formatDate = (dateString: string, locale = 'zh-CN'): string => {
    try {
      const date = new Date(dateString)
      if (isNaN(date.getTime())) {
        return dateString
      }
      return date.toLocaleDateString(locale, {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
    } catch {
      return dateString
    }
  }

  /**
   * 滚动事件处理器
   *
   * - 更新 navScrolled（导航栏滚动状态）
   * - 检测 animateSelector 元素是否进入视口，进入则添加 'animated' 类并记录
   */
  const handleScroll = (): void => {
    navScrolled.value = window.scrollY > 40

    document.querySelectorAll<HTMLElement>(animateSelector).forEach((element) => {
      if (!animatedSections.value.has(element) && isInViewport(element)) {
        element.classList.add('animated')
        animatedSections.value.add(element)
      }
    })
  }

  // ---- 生命周期 ----

  /** 需求 1.2：挂载时注册 scroll 监听并触发初始检测 */
  onMounted(() => {
    window.addEventListener('scroll', handleScroll)
    handleScroll()
  })

  /** 需求 1.3：卸载时移除 scroll 监听，防止内存泄漏 */
  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
  })

  return {
    showLoginModal,
    showNewsModal,
    selectedNews,
    navScrolled,
    animatedSections,
    blogUrl,
    version,
    buildTime,
    handleOpenLogin,
    handleOpenNewsDetail,
    handleScroll,
    formatDate,
  }
}

export default usePageCommon
