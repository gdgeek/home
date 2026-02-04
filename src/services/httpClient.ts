/**
 * HTTP客户端封装
 * 基于axios实现，提供统一的请求/响应拦截和错误处理
 * 
 * _Requirements: 11.4_
 */

import axios, { type AxiosInstance, type AxiosResponse, type InternalAxiosRequestConfig } from 'axios'
import type { HttpClientConfig, ApiError } from '@/types'

/**
 * 默认配置
 */
const DEFAULT_CONFIG: HttpClientConfig = {
  baseURL: '',
  timeout: 10000
}

/**
 * 创建axios实例
 */
const createAxiosInstance = (config: Partial<HttpClientConfig> = {}): AxiosInstance => {
  const mergedConfig: HttpClientConfig = {
    ...DEFAULT_CONFIG,
    ...config
  }

  const instance = axios.create({
    baseURL: mergedConfig.baseURL,
    timeout: mergedConfig.timeout,
    headers: {
      'Content-Type': 'application/json'
    }
  })

  // 请求拦截器
  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      // 可以在这里添加通用请求头，如认证token等
      // 例如: config.headers.Authorization = `Bearer ${token}`
      return config
    },
    (error) => {
      console.error('Request interceptor error:', error)
      return Promise.reject(error)
    }
  )

  // 响应拦截器
  instance.interceptors.response.use(
    (response: AxiosResponse) => {
      // 直接返回响应数据
      return response.data
    },
    (error) => {
      // 统一错误处理
      const apiError: ApiError = {
        code: error.response?.status?.toString() || 'NETWORK_ERROR',
        message: error.response?.data?.message || error.message || '网络请求失败',
        details: error.response?.data
      }

      console.error(`API Error [${apiError.code}]: ${apiError.message}`)
      return Promise.reject(apiError)
    }
  )

  return instance
}

/**
 * WordPress API客户端实例
 */
const wordpressApiInstance = createAxiosInstance({
  baseURL: import.meta.env.VITE_WORDPRESS_API_URL || '',
  timeout: 15000
})

/**
 * 后端API客户端实例
 */
const backendApiInstance = createAxiosInstance({
  baseURL: import.meta.env.VITE_BACKEND_API_URL || '',
  timeout: 10000
})

/**
 * HTTP客户端接口
 */
export interface HttpClient {
  get<T>(url: string, params?: Record<string, unknown>): Promise<T>
  post<T>(url: string, data?: unknown): Promise<T>
}

/**
 * 创建HTTP客户端
 */
const createHttpClient = (instance: AxiosInstance): HttpClient => ({
  /**
   * GET请求
   * @param url 请求路径
   * @param params 查询参数
   * @returns Promise<T>
   */
  get<T>(url: string, params?: Record<string, unknown>): Promise<T> {
    return instance.get(url, { params }) as Promise<T>
  },

  /**
   * POST请求
   * @param url 请求路径
   * @param data 请求体数据
   * @returns Promise<T>
   */
  post<T>(url: string, data?: unknown): Promise<T> {
    return instance.post(url, data) as Promise<T>
  }
})

/**
 * WordPress API HTTP客户端
 */
export const wordpressHttpClient: HttpClient = createHttpClient(wordpressApiInstance)

/**
 * 后端API HTTP客户端
 */
export const backendHttpClient: HttpClient = createHttpClient(backendApiInstance)

/**
 * 创建自定义配置的HTTP客户端
 * @param config HTTP客户端配置
 * @returns HttpClient
 */
export const createCustomHttpClient = (config: Partial<HttpClientConfig>): HttpClient => {
  const instance = createAxiosInstance(config)
  return createHttpClient(instance)
}

/**
 * 默认导出 - 后端API客户端
 */
export default backendHttpClient
