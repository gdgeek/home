/**
 * 星扣AR创作平台·教育版 - 应用入口
 * 
 * @description 配置Vue应用实例，引入全局样式
 * @requirements 11.1, 11.2
 * 
 * Element Plus通过vite.config.ts中的unplugin-auto-import和
 * unplugin-vue-components插件实现按需自动导入，无需手动配置
 */
import { createApp } from 'vue'
import App from './App.vue'

// 引入全局样式 - 包含Element Plus主题定制和全局CSS变量
import './assets/styles/global.scss'

// 创建并挂载Vue应用
const app = createApp(App)
app.mount('#app')
