/**
 * 路由配置
 * 根据品牌ID动态加载对应的视图组件
 */

import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { getCurrentBrandId } from '@/config/brandProvider'

const brandId = getCurrentBrandId()

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: brandId === 'xiading'
      ? () => import('@/views/xiading/XiadingHomePage.vue')
      : () => import('@/views/xingkou/XingkouHomePage.vue')
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
