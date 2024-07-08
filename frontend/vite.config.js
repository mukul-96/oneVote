import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})
// [[redirects]]
//   from = "/admin/*"
//   to = "/admin/:splat"
//   status = 200
//   [[redirects]]
//   from = "/voter/*"
//   to = "/voter/signin"
//   status = 200
