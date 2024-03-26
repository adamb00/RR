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
      host: true, // needed for the Docker Container port mapping to work
      strictPort: true, // not necessary
      port: 3000, // you can replace this port with any port
   },
   preview: {
      port: 3000,
      host: true,
   },
});
