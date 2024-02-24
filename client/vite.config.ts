import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// export default defineConfig({
//    plugins: [react()],
// });

export default defineConfig(({ mode }) => {
   const env = loadEnv(mode, process.cwd(), '');
   return {
      define: {
         'process.env.NODE_ENV': JSON.stringify(env.NODE_ENV),
         'process.env.FACEBOOK_APP_ID': JSON.stringify(env.FACEBOOK_APP_ID),
         'process.env.BASE_URL_SOCKET': JSON.stringify(env.BASE_URL_SOCKET),
         'process.env.BASE_URL': JSON.stringify(env.BASE_URL),
         'process.env.BASE_URL_LINK': JSON.stringify(env.BASE_URL_LINK),
      },
      plugins: [react()],
   };
});
