import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['api/rss.js'], // 👈 tell Vite to skip this
  },
  server: {
    fs: { allow: ['.'] }
  }
})