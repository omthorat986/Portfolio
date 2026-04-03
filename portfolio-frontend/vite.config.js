import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const repositoryName = process.env.GITHUB_REPOSITORY?.split('/')[1] || 'Portfolio'

  return {
    base: mode === 'production' ? './' : '/',
    build: {
      outDir: 'docs'
    },
    plugins: [react()],
    server: {
      proxy: {
        '/api': {
          target: 'http://localhost:3000', // Express API server
          changeOrigin: true,
        }
      }
    }
  }
})
