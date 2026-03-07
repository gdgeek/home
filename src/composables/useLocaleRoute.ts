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

const STORAGE_KEY = 'mrugc_user_locale'

export function useLocaleRoute(defaultLocale: SupportedLocale = 'en-US') {
  const { locale } = useI18n({ useScope: 'global' })
  const router = useRouter()
  const route = useRoute()

  // 优先级：URL ?lang= > localStorage > 默认
  function resolveInitialLocale(): SupportedLocale {
    const queryLang = (route.query.lang as string) || ''
    if (queryLang && isSupportedLocale(queryLang)) {
      return queryLang
    }
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved && isSupportedLocale(saved)) {
      return saved as SupportedLocale
    }
    return defaultLocale
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
    if (!isSupportedLocale(code)) return
    activeLang.value = code
    locale.value = code
    localStorage.setItem(STORAGE_KEY, code)
    router.replace({ query: { ...route.query, lang: code } })
  }

  // 监听路由 query 变化（浏览器前进/后退）
  watch(
    () => route.query.lang as string,
    (newLang) => {
      if (newLang && isSupportedLocale(newLang) && newLang !== locale.value) {
        activeLang.value = newLang
        locale.value = newLang
        localStorage.setItem(STORAGE_KEY, newLang)
      }
    }
  )

  return {
    activeLang,
    switchLocale,
  }
}
