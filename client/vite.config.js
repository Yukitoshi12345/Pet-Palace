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
