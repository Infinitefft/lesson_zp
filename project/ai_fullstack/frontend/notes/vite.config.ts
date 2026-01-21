import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'  // node 的内置模块
// node 需要单独添加类型声明文件

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  "resolve": {
    alias: {
      // __dirname node 的超级变量 项目根目录
      '@': path.resolve(__dirname, 'src')
    }
  }
})