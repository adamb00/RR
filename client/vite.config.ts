import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteCompression from 'vite-plugin-compression';
import path from 'path';

export default defineConfig({
   plugins: [react(), viteCompression()],
   resolve: {
      alias: {
         '@': path.resolve(__dirname, './src'),
      },
   },
   server: {
      watch: {
         usePolling: true,
      },
      host: true,
      strictPort: true,
      port: 4173,
   },
});
