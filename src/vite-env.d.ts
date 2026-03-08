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
