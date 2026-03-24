import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/sheets': {
        target: 'https://script.google.com',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(
          '/api/sheets',
          '/macros/s/AKfycbyfQ2WudbWQkpbKoFJChR53CEIvqse_9RvIwOwnt1raURaDofVr0iP9NsuZMKUIzFt9/exec'
        ),
      },
    },
  },
})
