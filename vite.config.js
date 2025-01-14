import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 4173, // Sử dụng cổng 4173
    host: true,  // Để Vite lắng nghe trên tất cả các địa chỉ IP
  },
  build: {
  outDir: 'dist',
  },
})
