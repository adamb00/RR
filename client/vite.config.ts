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
      proxy: {
         '/api': {
            target: 'https://r2byou.com:8000/api/v1',
            changeOrigin: true,
            secure: false,
         },
      },
   },
   preview: {
      host: true,
      port: 3000, // client port when execute npm run preview
   },
});
