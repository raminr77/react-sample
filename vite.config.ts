import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from 'vite-plugin-pwa';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  // For developer testing on the Safari
  // server: {
  //   host: '127.0.0.1',
  // },
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      manifest: false,
      registerType: 'autoUpdate',
      injectRegister: 'script-defer',
      workbox: {
        globPatterns: ['**/*.{js,css,html,jpeg,jpg,png,svg}']
      },
      devOptions: {
        enabled: false
      }
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
});
