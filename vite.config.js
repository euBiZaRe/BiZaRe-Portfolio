import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  server: {
    port: 3002, // Run on 3002 to avoid any loopback conflicts
    host: true,
    proxy: {
      '/api-delta': {
        target: 'https://delta.f1live.dpdns.org',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api-delta/, ''),
        headers: {
          'Referer': 'https://f1live.dpdns.org/',
          'Origin': 'https://f1live.dpdns.org'
        }
      },
      '/api-channels': {
        target: 'https://cdn.f1live.dpdns.org',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api-channels/, ''),
        headers: {
          'Referer': 'https://f1live.dpdns.org/',
          'Origin': 'https://f1live.dpdns.org'
        }
      }
    }
  }
})
