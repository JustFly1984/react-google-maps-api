import { cloudflare } from '@cloudflare/vite-plugin';
import tailwindcss from '@tailwindcss/vite';
import fs from 'node:fs';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [tailwindcss(), cloudflare()],
  build: {
    rollupOptions: {
      output: {
        entryFileNames: '_worker.js',
        chunkFileNames: '[name]-[hash].js',
        assetFileNames: '[name]-[hash].[ext]',
      },
    },
  },
  server: {
    port: 3000,
    host: 'local-react-google-maps-api.ospm.app',
    https: {
      key: fs.readFileSync('.certs/key.pem'),
      cert: fs.readFileSync('.certs/cert.pem'),
    },
    proxy: {
      '/api': {
        target: 'http://localhost:8788',
        changeOrigin: true,
      },
    },
  },
});
