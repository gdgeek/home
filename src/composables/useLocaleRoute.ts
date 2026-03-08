/**
 * useLocaleRoute - URL ?lang= 参数与 i18n 双向同步
 *
 * 功能：
 * - 页面加载时从 ?lang=xx-XX 初始化 i18n 语言
 * - 切换语言时同步更新 URL query（不刷新页面）
 * - 刷新页面后从 URL 恢复语言
 * - 与导航栏语言按钮的 activeLang 关联
 */

import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter, useRoute } from 'vue-router'
import { isSupportedLocale, type SupportedLocale } from '@/router'

const STORAGE_KEY = 'xrugc_user_locale'

/**
 * 与 vue-i18n 兼容的语言代码类型
 * 支持短格式（'en'、'zh-CN'、'zh-TW'、'ja'、'th'）和标准5字符格式（'en-US'、'zh-CN' 等）
 */
export type LocaleCode =
  | SupportedLocale
  | 'en'
  | 'zh-CN'
  | 'zh-TW'
  | 'ja'
  | 'th'
  | string

/** 将短格式语言代码映射到标准5字符格式 */
const LOCALE_ALIAS_MAP: Record<string, SupportedLocale> = {
  'en': 'en-US',
  'zh-CN': 'zh-CN',
  'zh-TW': 'zh-TW',
  'ja': 'ja-JP',
  'th': 'th-TH',
}

/** 将任意语言代码规范化为 SupportedLocale，不匹配时返回 null */
function normalizeLocale(code: string): SupportedLocale | null {
  if (isSupportedLocale(code)) return code
  const mapped = LOCALE_ALIAS_MAP[code]
  return mapped ?? null
}

export function useLocaleRoute(defaultLocale: LocaleCode = 'en-US') {
  const { locale } = useI18n({ useScope: 'global' })
  const router = useRouter()
  const route = useRoute()

  // 将 defaultLocale 规范化为 SupportedLocale（处理短格式如 'en'）
  const normalizedDefault: SupportedLocale =
    normalizeLocale(defaultLocale) ?? 'en-US'

  // 优先级：URL ?lang= > localStorage > 默认
  function resolveInitialLocale(): SupportedLocale {
    const queryLang = (route.query.lang as string) || ''
    const normalizedQuery = queryLang ? normalizeLocale(queryLang) : null
    if (normalizedQuery) {
      return normalizedQuery
    }
    const saved = localStorage.getItem(STORAGE_KEY)
    const normalizedSaved = saved ? normalizeLocale(saved) : null
    if (normalizedSaved) {
      return normalizedSaved
    }
    return normalizedDefault
  }

  const initial = resolveInitialLocale()
  const activeLang = ref<string>(initial)

  // 初始化 i18n
  locale.value = initial

  // 如果 URL 没有 ?lang 或不匹配，静默补上
  const queryLang = (route.query.lang as string) || ''
  if (!queryLang || !isSupportedLocale(queryLang)) {
    router.replace({ query: { ...route.query, lang: initial } })
  }

  /** 切换语言 — 更新 URL + i18n + localStorage */
  const switchLocale = (code: string) => {
    const normalized = normalizeLocale(code)
    if (!normalized) return
    activeLang.value = normalized
    locale.value = normalized
    localStorage.setItem(STORAGE_KEY, normalized)
    router.replace({ query: { ...route.query, lang: normalized } })
  }

  // 监听路由 query 变化（浏览器前进/后退）
  watch(
    () => route.query.lang as string,
    (newLang) => {
      const normalized = newLang ? normalizeLocale(newLang) : null
      if (normalized && normalized !== locale.value) {
        activeLang.value = normalized
        locale.value = normalized
        localStorage.setItem(STORAGE_KEY, normalized)
      }
    }
  )

  return {
    activeLang,
    switchLocale,
  }
}
