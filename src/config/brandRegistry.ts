/**
 * 品牌注册表
 * 多品牌/多域名架构系统
 * 
 * @description 存储所有品牌配置，提供品牌配置查询和验证功能
 * @requirements 2.1, 2.2, 2.3
 */

import type { BrandConfig, BrandId, BrandRegistry } from '@/types/brand'

// ============================================
// 品牌注册表 - 存储所有品牌配置
// ============================================

/**
 * 品牌注册表
 * 
 * @description 存储所有支持品牌的完整配置信息
 *              新增品牌时需要在此处添加对应的配置
 * 
 * 注意：完整的品牌配置将在 Task 2.2 和 Task 2.3 中添加
 *       当前使用占位配置以满足类型要求
 */
const brandRegistry: BrandRegistry = {
  // 星扣AR教育版配置
  xingkou: {
    id: 'xingkou',
    name: '星扣AR创作平台·教育版',
    loginUrl: 'https://edu.xingkou.com/login',
    theme: {
      primaryColor: '#1E40AF',
      secondaryColor: '#2563EB',
      ctaColor: '#22C55E',
      backgroundColor: '#EFF6FF',
      textColor: '#1E3A8A',
      logoPath: '/images/xingkou-logo.svg',
      logoAlt: '星扣AR教育版'
    },
    hero: {
      title: '星扣AR创作平台 — 让知识"立"起来，让创意"活"起来',
      subtitle: '专为教育场景打造的AR内容创作平台，让教师轻松制作沉浸式教学内容，让学生在互动中探索知识的无限可能。',
      primaryButtonText: '立即开始创作',
      secondaryButtonText: '查看教学案例',
      highlights: ['课本变立体', '实验零风险', '创意可落地', '知识可互动']
    },
    footer: {
      copyright: '© 2024 星扣科技 版权所有',
      contactInfo: {
        phone: '400-xxx-xxxx',
        email: 'edu@xingkou.com',
        wechat: 'xingkou_edu'
      },
      navigation: [
        {
          title: '平台服务',
          links: [
            { text: 'AR创作工具', url: '#' },
            { text: '素材资源库', url: '#' },
            { text: '作品管理', url: '#' },
            { text: '帮助中心', url: '#' }
          ]
        },
        {
          title: '关于我们',
          links: [
            { text: '公司介绍', url: '#' },
            { text: '联系我们', url: '#' },
            { text: '加入我们', url: '#' },
            { text: '合作伙伴', url: '#' }
          ]
        }
      ]
    }
  },
  
  // 夏鼎配置 - 蓝色科技感主题
  xiading: {
    id: 'xiading',
    name: '夏鼎',
    loginUrl: 'https://xiading.com/login',
    theme: {
      primaryColor: '#0EA5E9',
      secondaryColor: '#06B6D4',
      ctaColor: '#10B981',
      backgroundColor: '#F0F9FF',
      textColor: '#0C4A6E',
      logoPath: '/images/xiading-logo.svg',
      logoAlt: '夏鼎'
    },
    hero: {
      title: '夏鼎 — 数字科技，赋能未来',
      subtitle: '专注于前沿数字技术应用，为企业提供智能化解决方案，引领数字化转型新时代。',
      primaryButtonText: '开始探索',
      secondaryButtonText: '了解更多',
      highlights: ['智能分析', '数据驱动', '技术领先', '创新赋能']
    },
    footer: {
      copyright: '© 2024 夏鼎科技 版权所有',
      contactInfo: {
        phone: '400-xxx-xxxx',
        email: 'contact@xiading.com',
        wechat: 'xiading_tech'
      },
      navigation: [
        {
          title: '产品服务',
          links: [
            { text: '智能平台', url: '#' },
            { text: '数据分析', url: '#' },
            { text: '技术咨询', url: '#' },
            { text: '帮助中心', url: '#' }
          ]
        },
        {
          title: '关于我们',
          links: [
            { text: '公司介绍', url: '#' },
            { text: '联系我们', url: '#' },
            { text: '加入我们', url: '#' },
            { text: '合作伙伴', url: '#' }
          ]
        }
      ]
    }
  }
}

// ============================================
// 品牌配置查询函数
// ============================================

/**
 * 获取品牌配置
 * 
 * @description 根据品牌ID查询对应的品牌配置
 * @param brandId - 品牌标识字符串
 * @returns 品牌配置对象，如果品牌ID无效则返回 null
 * 
 * @example
 * const config = getBrandConfig('xingkou')
 * if (config) {
 *   console.log(config.name) // '星扣AR创作平台·教育版'
 * }
 * 
 * @requirements 2.2, 2.3
 */
export function getBrandConfig(brandId: string): BrandConfig | null {
  if (brandId in brandRegistry) {
    return brandRegistry[brandId as BrandId]
  }
  return null
}

// ============================================
// 品牌ID验证函数
// ============================================

/**
 * 检查品牌ID是否有效
 * 
 * @description 验证给定的字符串是否为有效的品牌ID
 *              使用类型守卫确保类型安全
 * @param brandId - 待验证的品牌标识字符串
 * @returns 如果是有效品牌ID返回 true，否则返回 false
 * 
 * @example
 * if (isValidBrandId(userInput)) {
 *   // userInput 在此作用域内被推断为 BrandId 类型
 *   const config = brandRegistry[userInput]
 * }
 * 
 * @requirements 2.2
 */
export function isValidBrandId(brandId: string): brandId is BrandId {
  return brandId in brandRegistry
}

// ============================================
// 品牌ID列表函数
// ============================================

/**
 * 获取所有品牌ID
 * 
 * @description 返回品牌注册表中所有已注册的品牌ID列表
 * @returns 品牌ID数组
 * 
 * @example
 * const brandIds = getAllBrandIds()
 * console.log(brandIds) // ['xingkou', 'xiading']
 * 
 * @requirements 2.1
 */
export function getAllBrandIds(): BrandId[] {
  return Object.keys(brandRegistry) as BrandId[]
}

// ============================================
// 导出
// ============================================

export { brandRegistry }
