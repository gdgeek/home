/// <reference types="vite/client" />

declare module "*.vue" {
  import type { DefineComponent } from "vue";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const component: DefineComponent<Record<string, unknown>, Record<string, unknown>, any>;
  export default component;
}

interface ImportMetaEnv {
  /** 品牌标识 - 可选值: xingkou, xiading */
  readonly VITE_BRAND_ID?: string;
  readonly VITE_BACKEND_API_URL: string;
  readonly VITE_WORKBENCH_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// Vite 构建时注入的全局变量
declare const __BUILD_TIME__: string;
declare const __APP_VERSION__: string;

// Window 对象上的运行时注入变量（由 docker-entrypoint.sh 注入）
interface Window {
  __BRAND_ID__?: string;
  __WORDPRESS_API_URL__?: string;
  __API_URL__?: string;
  __BACKUP_API_URL__?: string;
  __WORKBENCH_URL__?: string;
  __BUILD_TIME__?: string;
}
