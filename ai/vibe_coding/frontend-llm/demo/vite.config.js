import { defineConfig } from 'vite'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  root: './',
  publicDir: 'public',
  resolve: {
    alias: {
      '@': resolve(__dirname, './')
    }
  },
  server: {
    port: 3000,
    open: true,
    // 配置代理以解决API跨域问题
    proxy: {
      '/api': {
        target: 'https://api.deepseek.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    minify: 'terser',
    sourcemap: false,
    // 配置静态资源处理
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html')
      },
      output: {
        manualChunks: {
          // 可以根据需要分割代码块
        }
      }
    }
  },
  // 环境变量配置
  envPrefix: 'VITE_',
  // CSS配置
  css: {
    modules: false,
    preprocessorOptions: {
      // 如果将来使用Sass/Less等预处理器，可以在这里配置
    }
  }
})