/**
 * TypeScript类型定义
 * 星扣AR创作平台·教育版首页
 */

// ============================================
// 新闻相关类型
// ============================================

/**
 * 新闻分类
 */
export interface NewsCategory {
  id: number
  name: string
  slug: string
}

/**
 * 新闻条目
 */
export interface NewsItem {
  id: number
  title: string
  excerpt: string
  content: string
  date: string
  link: string
  category: NewsCategory
  featuredImage?: string
}

/**
 * 新闻查询参数
 */
export interface NewsQueryParams {
  page?: number
  perPage?: number
  categories?: number[]
}

// ============================================
// 基础信息类型
// ============================================

/**
 * 联系信息
 */
export interface ContactInfo {
  phone?: string
  email?: string
  wechat?: string
}

/**
 * 平台基础信息
 */
export interface BaseInfo {
  siteName: string
  loginUrl: string
  contactInfo: ContactInfo
  copyright: string
}

// ============================================
// 页面内容配置类型
// ============================================

/**
 * 核心价值项
 */
export interface ValueItem {
  icon: string
  title: string
  description: string
}

/**
 * 核心功能项
 */
export interface FeatureItem {
  icon: string
  title: string
  description: string
}

/**
 * 学科场景项
 */
export interface SceneItem {
  subject: string
  image: string
  description: string
}

/**
 * 用户案例项
 */
export interface CaseItem {
  schoolName: string
  description: string
  image?: string
  tags?: string[]
}

/**
 * 底部导航链接
 */
export interface FooterLink {
  text: string
  url: string
}

/**
 * 底部导航分组
 */
export interface FooterNavGroup {
  title: string
  links: FooterLink[]
}

/**
 * 页面配置
 */
export interface PageConfig {
  hero: {
    title: string
    subtitle: string
    primaryButton: string
    secondaryButton: string
    highlights: string[]
  }
  values: ValueItem[]
  features: FeatureItem[]
  scenes: SceneItem[]
  cases: CaseItem[]
  footer: {
    navigation: FooterNavGroup[]
  }
}

// ============================================
// 组件Props接口
// ============================================

/**
 * HeroSection组件Props
 */
export interface HeroSectionProps {
  title: string
  subtitle: string
  primaryButtonText: string
  secondaryButtonText: string
  highlights: string[]
  loginUrl: string
}

/**
 * ValueCard组件Props
 */
export interface ValueCardProps {
  icon: string
  title: string
  description: string
}

/**
 * FeatureCard组件Props
 */
export interface FeatureCardProps {
  icon: string
  title: string
  description: string
}

/**
 * SceneCard组件Props
 */
export interface SceneCardProps {
  subject: string
  image: string
  description: string
}

/**
 * CaseCard组件Props
 */
export interface CaseCardProps {
  schoolName: string
  description: string
  image?: string
  tags?: string[]
}

/**
 * NewsModule组件Props
 */
export interface NewsModuleProps {
  news: NewsItem[]
  loading: boolean
  error: string | null
}

// ============================================
// API相关类型
// ============================================

/**
 * API错误
 */
export interface ApiError {
  code: string
  message: string
  details?: unknown
}

/**
 * HTTP客户端配置
 */
export interface HttpClientConfig {
  baseURL: string
  timeout: number
}
