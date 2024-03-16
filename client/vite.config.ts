import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteCompression from 'vite-plugin-compression';

export default defineConfig({
   plugins: [react(), viteCompression()],
   server: {
      watch: {
         usePolling: true,
      },
      host: true,
      strictPort: true,
      port: 80 | 443,
   },
});
