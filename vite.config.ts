

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    allowedHosts: [
      'preshow-sculpture-headphone.ngrok-free.dev',
    ],
  },

  preview: {
    host: '0.0.0.0',
    port: 4173,
    allowedHosts: [
      'preshow-sculpture-headphone.ngrok-free.dev',
    ],
  },
})

