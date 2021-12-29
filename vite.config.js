import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
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
