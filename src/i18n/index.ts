/**
 * vue-i18n 国际化配置
 *
 * 根据品牌配置自动设置默认语言
 * 支持: zh-CN, zh-TW, en-US, th-TH, ja-JP
 */

import { createI18n } from "vue-i18n";
import { getCurrentBrandId, getBrandConfig } from "@/config/brandProvider";
import zhCN from "./locales/zh-CN";
import zhTW from "./locales/zh-TW";
import enUS from "./locales/en";
import thTH from "./locales/th";
import jaJP from "./locales/ja";

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
  legacy: false,
  locale: getDefaultLocale(),
  fallbackLocale: "en-US",
  messages: {
    "zh-CN": zhCN,
    "zh-TW": zhTW,
    "en-US": enUS,
    "th-TH": thTH,
    "ja-JP": jaJP,
  },
});

export default i18n;
