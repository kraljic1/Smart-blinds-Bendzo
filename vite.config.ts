import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import removeConsole from './vite-plugins/remove-console';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    removeConsole({
      remove: ['log', 'debug', 'info'],
      keep: ['error', 'warn']
    })
  ],
  server: {
    // Security headers for development
    headers: {
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block',
      'Referrer-Policy': 'strict-origin-when-cross-origin'
    },
    // Restrict development server access
    host: 'localhost',
    strictPort: true,
    // Disable directory listing
    fs: {
      strict: true,
      allow: ['.']
    },
    // Proxy Netlify functions to the correct port during development
    proxy: {
      '/.netlify/functions': {
        target: 'http://localhost:8901',
        changeOrigin: true,
        secure: false
      }
    }
  },
  define: {
    global: 'globalThis'
  },
  build: {
    // Security optimizations for production build
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    },
    // Generate source maps for debugging but not in production
    sourcemap: false
  },
  // Prevent exposure of sensitive information
  envPrefix: ['VITE_'],
  // Security: prevent loading of arbitrary files
  assetsInclude: ['**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.gif', '**/*.svg', '**/*.webp']
});
