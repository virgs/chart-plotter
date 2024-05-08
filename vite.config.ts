import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/chart-plotter',
  build: {
    target: 'esnext',
    rollupOptions: {
      output: {
      }
    },
    outDir: 'docs',
    assetsDir: '.'
  },
})
