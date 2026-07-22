import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import { BRAND } from './src/brand'

export default defineConfig({
  base: `/${BRAND.slug}/`,
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icons/*.png', 'icons/*.svg'],
      manifest: {
        name: `${BRAND.nombre} - Gestión de Cobranzas`,
        short_name: BRAND.nombre,
        description: 'Sistema de gestión de cobranzas diarias',
        theme_color: '#1D4ED8',
        background_color: '#ffffff',
        display: 'standalone',
        orientation: 'portrait',
        scope: `/${BRAND.slug}/`,
        start_url: `/${BRAND.slug}/`,
        icons: [
          { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' }
        ]
      },
      workbox: {
        navigateFallback: `/${BRAND.slug}/index.html`,
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/.*\.supabase\.co\/.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'supabase-cache',
              expiration: { maxEntries: 100, maxAgeSeconds: 60 * 60 * 24 },
              networkTimeoutSeconds: 10
            }
          }
        ]
      }
    })
  ]
})
