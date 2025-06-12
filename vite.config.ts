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
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=(self), usb=(), accelerometer=(), gyroscope=(), magnetometer=(), browsing-topics=(), run-ad-auction=(), join-ad-interest-group=(), private-state-token-redemption=(), private-state-token-issuance=(), private-aggregation=(), attribution-reporting=()'
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
        manualChunks: {
          // Vendor libraries
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-ui': ['lucide-react'],
          'vendor-payment': ['@stripe/stripe-js', '@stripe/react-stripe-js'],
          'vendor-supabase': ['@supabase/supabase-js'],
          'vendor-utils': ['libphonenumber-js', 'dompurify'],
          
          // Large page components
          'pages-main': [
            './src/pages/HomePage.tsx',
            './src/pages/ProductsPage.tsx',
            './src/pages/RollerBlindsPage.tsx',
            './src/pages/ZebraBlindsPage.tsx'
          ],
          'pages-product': [
            './src/pages/ProductConfigurationPage.tsx',
            './src/pages/AccessoriesPage.tsx',
            './src/pages/CurtainTracksPage.tsx'
          ],
          'pages-checkout': [
            './src/pages/CheckoutPage.tsx',
            './src/pages/BasketPage.tsx',
            './src/pages/ThankYouPage.tsx'
          ],
          'pages-admin': [
            './src/pages/AdminLoginPage.tsx',
            './src/pages/AdminOrdersPage.tsx',
            './src/pages/AdminOrderDetailPage.tsx',
            './src/pages/AdminManagementPage.tsx'
          ],
          'pages-support': [
            './src/pages/HowItWorksPage.tsx',
            './src/pages/SupportPage.tsx',
            './src/pages/InstallationGuidePage.tsx',
            './src/pages/ConnectivityGuidePage.tsx',
            './src/pages/SmartControlGuidePage.tsx'
          ]
        }
      }
    },
    // Increase chunk size warning limit
    chunkSizeWarningLimit: 1000,
    // Generate source maps for debugging but not in production
    sourcemap: false
  },
  // Prevent exposure of sensitive information
  envPrefix: ['VITE_'],
  // Security: prevent loading of arbitrary files
  assetsInclude: ['**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.gif', '**/*.svg', '**/*.webp']
});
