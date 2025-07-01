import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  server: {
    host: true
  },
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
      manifest: {
        id: "/",
        name: 'Mi App de Tareas',
        short_name: 'Tareas',
        description: 'Organiza tus tareas fácil y rápido',
        theme_color: '#0f172a',
        background_color: '#0f172a',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: '/pwa-192x192-fixed.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/pwa-512x512-fixed.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ],
        screenshots: [
          {
            src: "/screenshot-desktop.png",
            sizes: "1220x720",
            type: "image/png",
            form_factor: "wide"
          },
          {
            src: "/screenshot-mobile.png",
            sizes: "540x720",
            type: "image/png"
          }
        ],
        protocol_handlers: [
          {
            protocol: "web+tareas",
            url: "/?tarea=%s"
          }
        ]

      }
    })
  ]
});
