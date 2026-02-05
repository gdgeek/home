/**
 * 品牌路由配置
 * 多品牌/多域名架构系统
 * 
 * @description 根据品牌ID动态加载对应的视图组件
 * @requirements 1.1, 1.4
 */

import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { getCurrentBrandId } from '@/config/brandProvider'

// ============================================
// 路由配置
// ============================================

/**
 * 路由定义
 * 
 * @description 根据当前品牌ID动态加载对应的首页视图
 * - xiading 品牌: 加载 XiadingHomePage
 * - 其他品牌: 加载默认 HomePage
 * 
 * @requirements 1.1, 1.4
 */
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => {
      const brandId = getCurrentBrandId()
      if (brandId === 'xiading') {
        return import('@/views/xiading/XiadingHomePage.vue')
      }
      // 星扣品牌使用新的绿色风格页面
      return import('@/views/xingkou/XingkouHomePage.vue')
    }
  }
]

/**
 * 创建路由实例
 * 
 * @description 使用 HTML5 History 模式
 */
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(_to, _from, savedPosition) {
    // 如果有保存的位置（如浏览器后退），恢复到该位置
    if (savedPosition) {
      return savedPosition
    }
    // 否则滚动到页面顶部
    return { top: 0 }
  }
})

export default router
