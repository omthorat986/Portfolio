import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const repositoryName = process.env.GITHUB_REPOSITORY?.split('/')[1]
  const base = mode === 'production' && repositoryName ? `/${repositoryName}/` : '/'

  return {
    base,
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
