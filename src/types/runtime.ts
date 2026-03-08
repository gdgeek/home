/**
 * 运行时配置类型定义
 * 通过 Docker 容器启动脚本注入到 window 对象
 */
interface RuntimeConfig {
  __BRAND_ID__?: string
  __WORDPRESS_API_URL__?: string
  __API_URL__?: string
  __BACKUP_API_URL__?: string
  __WORKBENCH_URL__?: string
  __APP_VERSION__?: string
  __BUILD_TIME__?: string
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface Window extends RuntimeConfig {}
}

/**
 * 类型安全地读取运行时配置
 * 避免在业务代码中使用 (window as any) 强转
 */
export function getRuntimeConfig(): RuntimeConfig {
  return {
    __BRAND_ID__: window.__BRAND_ID__,
    __WORDPRESS_API_URL__: window.__WORDPRESS_API_URL__,
    __API_URL__: window.__API_URL__,
    __BACKUP_API_URL__: window.__BACKUP_API_URL__,
    __WORKBENCH_URL__: window.__WORKBENCH_URL__,
    __APP_VERSION__: window.__APP_VERSION__ ?? '1.0.0',
    __BUILD_TIME__: window.__BUILD_TIME__,
  }
}
