import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // GitHub Pages 배포를 위한 base path 설정
  // secu-sca.github.io/sca-website 로 배포됨
  base: '/home/',
})
