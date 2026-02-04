/**
 * 后端基础信息API服务
 * 用于获取平台基础配置信息
 * 
 * _Requirements: 9.1, 9.2_
 */

import { backendHttpClient } from './httpClient'
import type { BaseInfo, ContactInfo } from '@/types'

// ============================================
// 默认配置（API失败时的降级数据）
// _Requirements: 9.3_
// ============================================

/**
 * 默认联系信息
 */
const DEFAULT_CONTACT_INFO: ContactInfo = {
  phone: '400-888-8888',
  email: 'support@xingkou.com',
  wechat: 'xingkou_ar'
}

/**
 * 默认基础信息
 * 当Backend API请求失败时使用此默认配置
 */
const DEFAULT_BASE_INFO: BaseInfo = {
  siteName: '星扣AR创作平台·教育版',
  loginUrl: 'https://edu.xingkou.com/login',
  contactInfo: DEFAULT_CONTACT_INFO,
  copyright: '© 2024 星扣科技 版权所有'
}

// ============================================
// 后端API响应类型（原始数据结构）
// ============================================

/**
 * 后端基础信息原始响应
 */
interface BackendBaseInfoResponse {
  site_name?: string
  login_url?: string
  contact_info?: {
    phone?: string
    email?: string
    wechat?: string
  }
  copyright?: string
}

// ============================================
// 数据转换函数
// ============================================

/**
 * 将后端响应转换为BaseInfo
 * @param response 后端原始响应数据
 * @returns BaseInfo
 */
const transformBaseInfo = (response: BackendBaseInfoResponse): BaseInfo => {
  return {
    siteName: response.site_name || DEFAULT_BASE_INFO.siteName,
    loginUrl: response.login_url || DEFAULT_BASE_INFO.loginUrl,
    contactInfo: {
      phone: response.contact_info?.phone || DEFAULT_CONTACT_INFO.phone,
      email: response.contact_info?.email || DEFAULT_CONTACT_INFO.email,
      wechat: response.contact_info?.wechat || DEFAULT_CONTACT_INFO.wechat
    },
    copyright: response.copyright || DEFAULT_BASE_INFO.copyright
  }
}

// ============================================
// 后端API服务接口
// ============================================

/**
 * 后端API服务接口
 */
export interface BackendApiService {
  getBaseInfo(): Promise<BaseInfo>
}

// ============================================
// 后端API服务实现
// ============================================

/**
 * 后端API服务
 */
export const backendApi: BackendApiService = {
  /**
   * 获取平台基础信息
   * 当API请求失败时，返回默认配置以确保页面正常显示
   * 
   * @returns Promise<BaseInfo>
   */
  async getBaseInfo(): Promise<BaseInfo> {
    try {
      // 请求后端API获取基础信息
      const response = await backendHttpClient.get<BackendBaseInfoResponse>('/api/base-info')
      
      // 转换数据格式
      return transformBaseInfo(response)
    } catch (error) {
      // API失败时使用本地默认配置，页面正常显示
      // _Requirements: 9.3_
      console.warn('Backend API failed, using default configuration:', error)
      return DEFAULT_BASE_INFO
    }
  }
}

/**
 * 获取默认基础信息（用于测试或直接获取默认值）
 * @returns BaseInfo
 */
export const getDefaultBaseInfo = (): BaseInfo => {
  return { ...DEFAULT_BASE_INFO }
}

/**
 * 默认导出
 */
export default backendApi
