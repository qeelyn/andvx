import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import htmlPlugin from './vitePlugin/vite-plugin-html'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), htmlPlugin()],
  css: {
    postcss: {
      autoprefixer: {}
    },
    preprocessorOptions: {
      less: {
        charset: false,
        javascriptEnabled: true,
      }
    }
  },
})
