/**
 * 路由配置
 * 根据品牌ID动态加载对应的视图组件
 * 语言通过 ?lang=xx-XX query 参数传递
 */

import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { getCurrentBrandId } from '@/config/brandProvider'

const brandId = getCurrentBrandId()

/** 支持的语言代码（统一5字符标准格式） */
export const SUPPORTED_LOCALES = ['zh-CN', 'zh-TW', 'en-US', 'th-TH', 'ja-JP'] as const
export type SupportedLocale = typeof SUPPORTED_LOCALES[number]

export function isSupportedLocale(value: string): value is SupportedLocale {
  return (SUPPORTED_LOCALES as readonly string[]).includes(value)
}

function getHomeComponent() {
  switch (brandId) {
    case 'xiading':
      return () => import('@/views/xiading/XiadingHomePage.vue')
    case 'xrugc':
      return () => import('@/views/xrugc/XrugcHomePage.vue')
    case 'mrpp':
      return () => import('@/views/mrpp/MrppHomePage.vue')
    default:
      return () => import('@/views/xingkou/XingkouHomePage.vue')
  }
}

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: getHomeComponent()
  },
  {
    path: '/devlog',
    name: 'DevlogList',
    component: () => import('@/views/devlog/DevlogListPage.vue')
  },
  {
    path: '/devlog/:slug',
    name: 'DevlogDetail',
    component: () => import('@/views/devlog/DevlogDetailPage.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) return savedPosition
    return { top: 0 }
  }
})

export default router
