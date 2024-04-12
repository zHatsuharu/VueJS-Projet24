import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
      port: 3000,
      proxy: {
          '/api': {
              target: 'https://pokemoncard.io/api',
              changeOrigin: true,
              rewrite: (path) => path.replace(/^\/api/, '')
          }
      },
      watch: {
        usePolling: true
      }
  }
})
