import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// IMPORTANTE: Cambia 'nombre-de-tu-repo' por el nombre real de tu repositorio en GitHub
// Ejemplo: base: '/diana-web/'
export default defineConfig({
  plugins: [react()],
  base: '/diana-ledesma-psicologa/', 
})