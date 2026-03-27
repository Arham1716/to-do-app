import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // allow external access
    allowedHosts: ['myapp.local', 'mytodo.test', 'localhost'],
    proxy: {
      '/todos': process.env.VITE_PROXY_TARGET || 'http://localhost:3001',
    },
  },
})
 