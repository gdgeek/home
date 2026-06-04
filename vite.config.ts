import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

function getBeijingDateParts(date = new Date()) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Shanghai',
    hourCycle: 'h23',
    hour12: false,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  }).formatToParts(date)

  return Object.fromEntries(parts.map((part) => [part.type, part.value]))
}

function formatBeijingBuildTime(date = new Date()) {
  const partMap = getBeijingDateParts(date)
  return `${partMap.year}-${partMap.month}-${partMap.day}T${partMap.hour}:${partMap.minute}:${partMap.second}+08:00`
}

function formatBeijingVersion(date = new Date()) {
  const partMap = getBeijingDateParts(date)
  return `${partMap.year}-${partMap.month}-${partMap.day} ${partMap.hour}:${partMap.minute}:${partMap.second} GMT+8`
}

const buildDate = new Date()
const buildTime = formatBeijingBuildTime(buildDate)
const appVersion = formatBeijingVersion(buildDate)

function createHealthPayload() {
  return {
    status: 'healthy',
    version: appVersion,
    buildTime
  }
}

export default defineConfig({
  define: {
    __APP_VERSION__: JSON.stringify(appVersion),
    __BUILD_TIME__: JSON.stringify(buildTime),
  },
  plugins: [
    {
      name: 'homepage-health-version',
      configureServer(server) {
        server.middlewares.use('/health', (_req, res) => {
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify(createHealthPayload(), null, 2))
        })
      },
      generateBundle() {
        this.emitFile({
          type: 'asset',
          fileName: 'health',
          source: `${JSON.stringify(createHealthPayload(), null, 2)}\n`
        })
      }
    },
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.startsWith('swiper-')
        }
      }
    }),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    watch: {
      usePolling: true,
      interval: 1000,
    },
    proxy: {
      '/wp-json': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
      '/index.php': {
        target: 'http://wordpress:80',
        changeOrigin: true,
      },
    },
  },
})
