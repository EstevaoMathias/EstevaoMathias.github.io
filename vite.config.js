import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Site de usuario do GitHub Pages (estevaomathias.github.io) -> base na raiz.
export default defineConfig({
  plugins: [react(), tailwindcss()],
})
