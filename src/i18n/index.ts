/**
 * vue-i18n 国际化配置
 *
 * 根据品牌配置自动设置默认语言
 * 支持: zh-CN, zh-TW, en, th, ja
 */

import { createI18n } from "vue-i18n";
import { getCurrentBrandId, getBrandConfig } from "@/config/brandProvider";
import zhCN from "./locales/zh-CN";
import zhTW from "./locales/zh-TW";
import en from "./locales/en";
import th from "./locales/th";
import ja from "./locales/ja";

/**
 * 从品牌配置获取默认语言
 */
function getDefaultLocale(): string {
  try {
    const brandId = getCurrentBrandId();
    const config = getBrandConfig(brandId);
    return config?.locale || "zh-CN";
  } catch {
    return "zh-CN";
  }
}

const i18n = createI18n({
  legacy: false, // 使用 Composition API 模式
  locale: getDefaultLocale(),
  fallbackLocale: "en",
  messages: {
    "zh-CN": zhCN,
    "zh-TW": zhTW,
    en,
    th,
    ja,
  },
});

export default i18n;
