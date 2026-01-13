import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    // 关键：强制去重，防止 react-router-dom 引用到另一份 react 副本
    dedupe: ['react', 'react-dom', 'react-router-dom'],
  },
  optimizeDeps: {
    // 强制包含这些基础包，避免它们被意外拆分
    include: ['react', 'react-dom', 'react-router-dom'],
  }
})