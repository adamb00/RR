import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteCompression from 'vite-plugin-compression';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
   plugins: [react(), viteCompression()],
   resolve: {
      alias: {
         '@': path.resolve(__dirname, './src'),
      },
   },
});
