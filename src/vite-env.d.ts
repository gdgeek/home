/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

interface ImportMetaEnv {
  readonly VITE_WORDPRESS_API_URL: string
  readonly VITE_BACKEND_API_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
