import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
   plugins: [react()],
   // define: {
   //    'process.env': {
   //       NODE_ENV: JSON.stringify('production'),
   //       FACEBOOK_APP_ID: JSON.stringify(process.env.FACEBOOK_APP_ID),
   //       BASE_URL_SOCKET: JSON.stringify(process.env.BASE_URL_SOCKET),
   //       BASE_URL: JSON.stringify(process.env.BASE_URL),
   //       BASE_URL_LINK: JSON.stringify(process.env.BASE_URL_LINK),
   //    },
   // },
});
