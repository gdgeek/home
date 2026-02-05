/**
 * 品牌配置类型定义
 * 多品牌/多域名架构系统
 * 
 * @description 定义品牌配置的完整类型结构，确保类型安全
 * @requirements 7.1, 7.2
 */

// ============================================
// 品牌ID类型
// ============================================

/**
 * 品牌ID类型（限定有效值）
 * 
 * @description 使用联合类型限定有效的品牌标识，
 *              新增品牌时需要在此处添加对应的ID
 */
export type BrandId = 'xingkou' | 'xiading'

/**
 * 语言类型
 * 
 * @description 支持的语言标识
 */
export type BrandLocale = 'zh-CN' | 'zh-TW' | 'en'

// ============================================
// 主题配置类型
// ============================================

/**
 * 品牌主题配置
 * 
 * @description 定义品牌的视觉主题元素，包括颜色、Logo等
 * @requirements 5.1, 5.2
 */
export interface BrandThemeConfig {
  /** 主色调 - 用于主要UI元素 */
  primaryColor: string
  /** 辅助色 - 用于次要UI元素 */
  secondaryColor: string
  /** CTA按钮色 - 用于行动召唤按钮 */
  ctaColor: string
  /** 背景色 - 页面主背景色 */
  backgroundColor: string
  /** 文字色 - 主要文字颜色 */
  textColor: string
  /** Logo路径 - 品牌Logo图片路径 */
  logoPath: string
  /** Logo替代文本 - 用于无障碍访问 */
  logoAlt: string
}

// ============================================
// Hero区域配置类型
// ============================================

/**
 * Hero区域配置
 * 
 * @description 定义首页Hero区域的内容配置
 * @requirements 6.1
 */
export interface BrandHeroConfig {
  /** 主标题 */
  title: string
  /** 副标题 */
  subtitle: string
  /** 主按钮文案 */
  primaryButtonText: string
  /** 次按钮文案 */
  secondaryButtonText: string
  /** 亮点列表 - 展示品牌核心卖点 */
  highlights: string[]
}

// ============================================
// 页脚配置类型
// ============================================

/**
 * 页脚联系信息
 * 
 * @description 定义页脚区域的联系方式，所有字段可选
 */
export interface BrandContactInfo {
  /** 联系电话 */
  phone?: string
  /** 联系邮箱 */
  email?: string
  /** 微信号/公众号 */
  wechat?: string
}

/**
 * 页脚导航链接
 */
export interface BrandFooterLink {
  /** 链接文本 */
  text: string
  /** 链接URL */
  url: string
}

/**
 * 页脚导航分组
 */
export interface BrandFooterNavGroup {
  /** 分组标题 */
  title: string
  /** 分组内的链接列表 */
  links: BrandFooterLink[]
}

/**
 * 页脚配置
 * 
 * @description 定义页脚区域的完整配置
 * @requirements 6.2
 */
export interface BrandFooterConfig {
  /** 版权信息 */
  copyright: string
  /** 联系信息 */
  contactInfo: BrandContactInfo
  /** 导航分组列表 */
  navigation: BrandFooterNavGroup[]
}

// ============================================
// 完整品牌配置类型
// ============================================

/**
 * 完整品牌配置
 * 
 * @description 定义品牌的完整配置结构，包含所有必填字段
 * @requirements 2.1, 7.1
 */
export interface BrandConfig {
  /** 品牌唯一标识 */
  id: BrandId
  /** 品牌显示名称 */
  name: string
  /** 登录URL - 用于登录跳转 */
  loginUrl: string
  /** 主题配置 */
  theme: BrandThemeConfig
  /** Hero区配置 */
  hero: BrandHeroConfig
  /** 页脚配置 */
  footer: BrandFooterConfig
}

// ============================================
// 辅助类型
// ============================================

/**
 * 品牌注册表类型
 * 
 * @description 定义品牌注册表的结构，确保所有品牌ID都有对应配置
 */
export type BrandRegistry = Record<BrandId, BrandConfig>

/**
 * 品牌错误代码
 * 
 * @description 定义品牌相关错误的代码类型
 */
export type BrandErrorCode = 
  | 'INVALID_BRAND_ID' 
  | 'MISSING_CONFIG' 
  | 'INVALID_LOGIN_URL'

/**
 * 品牌错误信息
 * 
 * @description 定义品牌相关错误的结构
 */
export interface BrandError {
  /** 错误代码 */
  code: BrandErrorCode
  /** 错误消息 */
  message: string
  /** 相关品牌ID */
  brandId?: string
  /** 错误发生时间戳 */
  timestamp: number
}
