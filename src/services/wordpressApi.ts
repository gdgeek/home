/**
 * WordPress API服务
 * 用于获取新闻内容和分类数据
 *
 * _Requirements: 8.1, 8.2_
 */

import axios from "axios";
import type { NewsItem, NewsCategory, NewsQueryParams } from "@/types";
import apiCache from "./apiCache";

// ============================================
// WordPress API响应类型（原始数据结构）
// ============================================

/**
 * WordPress文章原始响应
 */
interface WPPost {
  id: number;
  date: string;
  link: string;
  title: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  categories: number[];
  featured_media: number;
  _embedded?: {
    "wp:featuredmedia"?: Array<{
      source_url: string;
    }>;
    "wp:term"?: Array<
      Array<{
        id: number;
        name: string;
        slug: string;
      }>
    >;
  };
}

/**
 * WordPress分类原始响应
 */
interface WPCategory {
  id: number;
  name: string;
  slug: string;
  count: number;
  description: string;
  parent: number;
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
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .trim();
};

/**
 * 将WordPress文章转换为NewsItem
 * @param post WordPress文章原始数据
 * @param categoriesMap 分类映射表
 * @returns NewsItem
 */
const transformPost = (
  post: WPPost,
  categoriesMap: Map<number, NewsCategory>,
): NewsItem => {
  // 获取特色图片URL
  let featuredImage: string | undefined;
  if (post._embedded?.["wp:featuredmedia"]?.[0]?.source_url) {
    featuredImage = post._embedded["wp:featuredmedia"][0].source_url;
  }

  // 获取分类信息
  let category: NewsCategory = { id: 0, name: "未分类", slug: "uncategorized" };

  // 优先从_embedded中获取分类
  if (post._embedded?.["wp:term"]?.[0]?.[0]) {
    const embeddedCategory = post._embedded["wp:term"][0][0];
    category = {
      id: embeddedCategory.id,
      name: embeddedCategory.name,
      slug: embeddedCategory.slug,
    };
  } else if (post.categories.length > 0) {
    // 从分类映射表中获取
    const firstCategoryId = post.categories[0];
    const mappedCategory = categoriesMap.get(firstCategoryId);
    if (mappedCategory) {
      category = mappedCategory;
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
    featuredImage,
  };
};

/**
 * 将WordPress分类转换为NewsCategory
 * @param category WordPress分类原始数据
 * @returns NewsCategory
 */
const transformCategory = (category: WPCategory): NewsCategory => ({
  id: category.id,
  name: category.name,
  slug: category.slug,
});

// ============================================
// WordPress API服务接口
// ============================================

/**
 * WordPress API服务接口
 */
export interface WordPressApiService {
  getNews(params?: NewsQueryParams): Promise<NewsItem[]>;
  getCategories(): Promise<NewsCategory[]>;
}

// ============================================
// 分类映射缓存（通过 ApiCache 管理）
// ============================================

/**
 * 获取分类映射表（带缓存，通过 ApiCache 去重）
 */
const getCategoriesMap = async (): Promise<Map<number, NewsCategory>> => {
  try {
    return await apiCache.get("categoriesMap", async () => {
      const categories = await wordpressApi.getCategories();
      return new Map(categories.map((cat) => [cat.id, cat]));
    });
  } catch {
    return new Map();
  }
};

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
    const baseURL = (window as any).__WORDPRESS_API_URL__ || import.meta.env.VITE_WORDPRESS_API_URL || "";
    if (!baseURL) {
      return [];
    }

    // 构建查询参数
    const queryParams: Record<string, string> = {
      _embed: "wp:featuredmedia,wp:term",
      per_page: String(params?.perPage ?? 10),
      page: String(params?.page ?? 1),
    };

    // 添加分类过滤
    if (params?.categories && params.categories.length > 0) {
      queryParams.categories = params.categories.join(",");
    }

    // 判断 baseURL 是否已包含 REST API 路径（pretty permalinks）
    const isPrettyPermalink = baseURL.includes("/wp-json/");
    let url: string;
    if (isPrettyPermalink) {
      // baseURL 已经是 REST 端点，如 http://host/wp-json/wp/v2
      url = `${baseURL.replace(/\/$/, "")}/posts`;
    } else {
      // 使用 rest_route 查询参数格式（兼容未开启 pretty permalinks 的 WordPress）
      url = `${baseURL}/index.php`;
      queryParams.rest_route = "/wp/v2/posts";
    }

    try {
      // 获取分类映射表
      const categoriesMap = await getCategoriesMap();

      // 构建缓存 key（包含所有查询参数）
      const cacheKey = `news:${url}:${JSON.stringify(queryParams)}`;

      // 请求WordPress REST API（带缓存与去重）
      const posts = await apiCache.get<WPPost[]>(cacheKey, () =>
        axios.get<WPPost[]>(url, { params: queryParams }).then((r) => r.data),
      );

      // 转换数据格式
      return posts.map((post) => transformPost(post, categoriesMap));
    } catch {
      // 静默失败 — WordPress 不可用时不阻塞页面
      return [];
    }
  },

  /**
   * 获取新闻分类列表
   * @returns Promise<NewsCategory[]>
   */
  async getCategories(): Promise<NewsCategory[]> {
    const baseURL = (window as any).__WORDPRESS_API_URL__ || import.meta.env.VITE_WORDPRESS_API_URL || "";
    if (!baseURL) {
      return [];
    }

    const isPrettyPermalink = baseURL.includes("/wp-json/");
    let url: string;
    const queryParams: Record<string, string> = {
      per_page: "100",
      hide_empty: "false",
    };

    if (isPrettyPermalink) {
      url = `${baseURL.replace(/\/$/, "")}/categories`;
    } else {
      url = `${baseURL}/index.php`;
      queryParams.rest_route = "/wp/v2/categories";
    }

    try {
      return await apiCache.get<NewsCategory[]>("categories", () =>
        axios.get<WPCategory[]>(url, { params: queryParams }).then((r) =>
          r.data.map(transformCategory),
        ),
      );
    } catch {
      return [];
    }
  },
};

/**
 * 清除分类缓存（兼容性 shim，内部委托给 ApiCache）
 */
export const clearCategoriesCache = (): void => {
  apiCache.clear("categories");
  apiCache.clear("categoriesMap");
};

/**
 * 默认导出
 */
export default wordpressApi;
