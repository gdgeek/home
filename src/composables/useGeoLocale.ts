/**
 * useGeoLocale - 根据用户 IP 自动检测地区并设置语言
 *
 * 使用免费 API 获取用户国家代码，映射到对应 locale。
 * 不确定的地区默认 en-US。
 *
 * 与 useLocaleRoute 配合：检测到语言后通过 ?lang= 同步 URL。
 */

import { useI18n } from 'vue-i18n'
import { useRouter, useRoute } from 'vue-router'
import { isSupportedLocale } from '@/router'

/** 国家代码 → locale 映射（统一5字符标准格式） */
const COUNTRY_LOCALE_MAP: Record<string, string> = {
  CN: 'zh-CN',
  TW: 'zh-TW',
  HK: 'zh-TW',
  MO: 'zh-TW',
  JP: 'ja-JP',
  TH: 'th-TH',
}

const STORAGE_KEY = 'mrugc_user_locale'
const GEO_CACHE_KEY = 'mrugc_geo_country'

export function useGeoLocale() {
  const { locale } = useI18n({ useScope: 'global' })
  const router = useRouter()
  const route = useRoute()

  /** 同步设置 locale + URL ?lang= + localStorage */
  const applyLocale = (code: string) => {
    locale.value = code
    localStorage.setItem(STORAGE_KEY, code)
    if (isSupportedLocale(code)) {
      router.replace({ query: { ...route.query, lang: code } })
    }
  }

  /** 保存用户手动选择的语言 */
  const saveManualLocale = (code: string) => {
    applyLocale(code)
  }

  /** 自动检测并设置语言（仅在 URL 和 localStorage 都没有时生效） */
  const detectAndSetLocale = async () => {
    // URL 已有有效 ?lang= 参数，跳过检测
    const queryLang = (route.query.lang as string) || ''
    if (queryLang && isSupportedLocale(queryLang)) {
      return
    }

    // 用户手动选择过，直接用
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      applyLocale(saved)
      return
    }

    // 检查缓存的地理位置
    const cachedCountry = sessionStorage.getItem(GEO_CACHE_KEY)
    if (cachedCountry) {
      applyLocale(COUNTRY_LOCALE_MAP[cachedCountry] || 'en-US')
      return
    }

    // 调用免费 IP 地理定位 API
    try {
      const res = await fetch('https://ipapi.co/json/', {
        signal: AbortSignal.timeout(3000),
      })
      if (res.ok) {
        const data = await res.json()
        const country = data.country_code || ''
        sessionStorage.setItem(GEO_CACHE_KEY, country)
        applyLocale(COUNTRY_LOCALE_MAP[country] || 'en-US')
      }
    } catch {
      // 网络失败，保持当前语言
    }
  }

  return {
    detectAndSetLocale,
    saveManualLocale,
  }
}
