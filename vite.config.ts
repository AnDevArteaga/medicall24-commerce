import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  // Rutas relativas: obligatorio en HostGator / hosting compartido
  base: './',
  plugins: [react(), tailwindcss()],
  server: {
    port: 3000,
    host: true,
  },
  assetsInclude: ['**/*.xlsx'],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    // Una sola copia de React (evita Children = undefined en prod)
    dedupe: ['react', 'react-dom'],
  },
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    sourcemap: false,
    chunkSizeWarningLimit: 1200,
    // Sin manualChunks: separar React/carousels rompe en HostGator
    commonjsOptions: {
      include: [/node_modules/],
      transformMixedEsModules: true,
    },
    modulePreload: {
      polyfill: true,
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
  },
})
