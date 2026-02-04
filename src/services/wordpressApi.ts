/**
 * WordPress API服务
 * 用于获取新闻内容和分类数据
 * 
 * _Requirements: 8.1, 8.2_
 */

import { wordpressHttpClient } from './httpClient'
import type { NewsItem, NewsCategory, NewsQueryParams } from '@/types'

// ============================================
// WordPress API响应类型（原始数据结构）
// ============================================

/**
 * WordPress文章原始响应
 */
interface WPPost {
  id: number
  date: string
  link: string
  title: {
    rendered: string
  }
  excerpt: {
    rendered: string
  }
  content: {
    rendered: string
  }
  categories: number[]
  featured_media: number
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string
    }>
    'wp:term'?: Array<Array<{
      id: number
      name: string
      slug: string
    }>>
  }
}

/**
 * WordPress分类原始响应
 */
interface WPCategory {
  id: number
  name: string
  slug: string
  count: number
  description: string
  parent: number
}

// ============================================
// 数据转换函数
// ============================================

/**
 * 清理HTML标签，提取纯文本
 * @param html HTML字符串
 * @returns 纯文本字符串
 */
const stripHtml = (html: string): string => {
  return html
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .trim()
}

/**
 * 将WordPress文章转换为NewsItem
 * @param post WordPress文章原始数据
 * @param categoriesMap 分类映射表
 * @returns NewsItem
 */
const transformPost = (post: WPPost, categoriesMap: Map<number, NewsCategory>): NewsItem => {
  // 获取特色图片URL
  let featuredImage: string | undefined
  if (post._embedded?.['wp:featuredmedia']?.[0]?.source_url) {
    featuredImage = post._embedded['wp:featuredmedia'][0].source_url
  }

  // 获取分类信息
  let category: NewsCategory = { id: 0, name: '未分类', slug: 'uncategorized' }
  
  // 优先从_embedded中获取分类
  if (post._embedded?.['wp:term']?.[0]?.[0]) {
    const embeddedCategory = post._embedded['wp:term'][0][0]
    category = {
      id: embeddedCategory.id,
      name: embeddedCategory.name,
      slug: embeddedCategory.slug
    }
  } else if (post.categories.length > 0) {
    // 从分类映射表中获取
    const firstCategoryId = post.categories[0]
    const mappedCategory = categoriesMap.get(firstCategoryId)
    if (mappedCategory) {
      category = mappedCategory
    }
  }

  return {
    id: post.id,
    title: stripHtml(post.title.rendered),
    excerpt: stripHtml(post.excerpt.rendered),
    content: post.content.rendered,
    date: post.date,
    link: post.link,
    category,
    featuredImage
  }
}

/**
 * 将WordPress分类转换为NewsCategory
 * @param category WordPress分类原始数据
 * @returns NewsCategory
 */
const transformCategory = (category: WPCategory): NewsCategory => ({
  id: category.id,
  name: category.name,
  slug: category.slug
})

// ============================================
// WordPress API服务接口
// ============================================

/**
 * WordPress API服务接口
 */
export interface WordPressApiService {
  getNews(params?: NewsQueryParams): Promise<NewsItem[]>
  getCategories(): Promise<NewsCategory[]>
}

// ============================================
// 分类缓存
// ============================================

let categoriesCache: Map<number, NewsCategory> | null = null

/**
 * 获取分类映射表（带缓存）
 * @returns 分类映射表
 */
const getCategoriesMap = async (): Promise<Map<number, NewsCategory>> => {
  if (categoriesCache) {
    return categoriesCache
  }

  try {
    const categories = await wordpressApi.getCategories()
    categoriesCache = new Map(categories.map(cat => [cat.id, cat]))
    return categoriesCache
  } catch {
    // 如果获取分类失败，返回空映射
    return new Map()
  }
}

// ============================================
// WordPress API服务实现
// ============================================

/**
 * WordPress API服务
 */
export const wordpressApi: WordPressApiService = {
  /**
   * 获取新闻列表
   * @param params 查询参数
   * @returns Promise<NewsItem[]>
   */
  async getNews(params?: NewsQueryParams): Promise<NewsItem[]> {
    // 构建查询参数
    const queryParams: Record<string, unknown> = {
      _embed: 'wp:featuredmedia,wp:term', // 嵌入特色图片和分类信息
      per_page: params?.perPage ?? 10,
      page: params?.page ?? 1
    }

    // 添加分类过滤
    if (params?.categories && params.categories.length > 0) {
      queryParams.categories = params.categories.join(',')
    }

    // 获取分类映射表
    const categoriesMap = await getCategoriesMap()

    // 请求WordPress REST API
    const posts = await wordpressHttpClient.get<WPPost[]>('/wp/v2/posts', queryParams)

    // 转换数据格式
    return posts.map(post => transformPost(post, categoriesMap))
  },

  /**
   * 获取新闻分类列表
   * @returns Promise<NewsCategory[]>
   */
  async getCategories(): Promise<NewsCategory[]> {
    // 请求WordPress REST API
    const categories = await wordpressHttpClient.get<WPCategory[]>('/wp/v2/categories', {
      per_page: 100, // 获取所有分类
      hide_empty: false // 包含空分类
    })

    // 转换数据格式
    return categories.map(transformCategory)
  }
}

/**
 * 清除分类缓存（用于测试或强制刷新）
 */
export const clearCategoriesCache = (): void => {
  categoriesCache = null
}

/**
 * 默认导出
 */
export default wordpressApi
