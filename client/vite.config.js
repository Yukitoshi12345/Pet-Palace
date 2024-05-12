import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

let faviconURL = '/favicon.svg';

const manifestForPlugIn = {
  includeAssets: [faviconURL],
  manifest: {
    theme_color: '#ffffff',
    icons: [
      {
        src: faviconURL,
        sizes: '512x512',
        type: 'image/svg+xml',
        purpose: 'any maskable',
      },
      {
        src: faviconURL,
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  },
  workbox: {
    globPatterns: ['**/*.{js,css,html,png,svg,jpg,pdf,jsx}'],
    runtimeCaching: [
      {
        urlPattern: ({ url }) => url.pathname.startsWith('/src/assets'),
        handler: 'CacheFirst',
        options: {
          cacheName: 'assets-cache',
          cacheableResponse: {
            statuses: [0, 200], // Caches successful and opaque responses
          },
        },
      },
    ],
  },
};

export default defineConfig({
  plugins: [react(), VitePWA(manifestForPlugIn)],
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/graphql': {
        target: 'http://localhost:3001',
        secure: false,
        changeOrigin: true,
      },
    },
  },
});
