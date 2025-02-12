/// <reference types="vitest" />
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
   plugins: [
      react(),
      // VitePWA({
      //    registerType: 'autoUpdate',
      //    injectRegister: 'auto',
      //    // this is to see the PWA in development
      //    devOptions: {
      //       enabled: true,
      //    },
      //    manifest: {
      //       name: 'UniqueCall Dashboard',
      //       short_name: 'UniqueCall admin dashboard app',
      //       description:
      //          'An admin dashboard application for managing and monitoring various aspects of the UniqueCall system.',
      //       theme_color: '#E77917',
      //       background_color: '#FEF9F5',
      //       display: 'standalone',
      //       scope: '/',
      //       start_url: '/',
      //       icons: [
      //          {
      //             src: 'icons/logo-192x192.png',
      //             sizes: '192x192',
      //             type: 'image/png',
      //          },
      //          {
      //             src: 'icons/logo-512x512.png',
      //             sizes: '512x512',
      //             type: 'image/png',
      //          },
      //          {
      //             src: 'maskable-icon-512x512.png',
      //             sizes: '512x512',
      //             type: 'image/png',
      //             purpose: 'maskable',
      //          },
      //       ],
      //    },
      // }),
   ],
   test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './src/testing/setup-tests.ts',
      exclude: ['**/node_modules/**', '**/e2e/**'],
      coverage: {
         include: ['src/**'],
      },
   },
   resolve: {
      alias: {
         '@': path.resolve(__dirname, './src'),
      },
   },
});
