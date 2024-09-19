import { defineConfig, loadEnv } from 'vite'
import path from 'node:path'
import vue from '@vitejs/plugin-vue'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    // base: mode !== 'serve' ? `/${env.PROD_PREFIX}` : '/',
    plugins: [
      vue(),
      Components({
        resolvers: [ElementPlusResolver()],
        dts: 'src/components.d.ts'
      }),
      AutoImport({
        imports: ['vue', 'vue-router'],
        dts: 'src/auto-import.d.ts'
      })
    ],
    // 配置别名
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src')
      }
    },
    // 配置代理
    server: {
      host: '0.0.0.0',
      port: 8861,
      open: true,
      proxy: {
        '/api': {
          target: '***********',
          changeOrigin: true,
          secure: false
        }
      },
      cors: true
    }
  }
})
