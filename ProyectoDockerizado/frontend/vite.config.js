import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

 server: {
    host: true, // permite acceso externo
    allowedHosts: ['frontend.taekwondo4all.cat'], // <<--- Añade esto
  }
})
