import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';

// export default defineConfig(({mode}) => {
//    require('dotenv').config({ path: `./.env.${mode}` })
//    plugins: [react()],
// });

export default defineConfig(({ mode }) => {
   dotenv.config({ path: `./.env.${mode}` });
   console.log(process.env.VITE_BASE_URL);
   const env = loadEnv(mode, process.cwd(), '');
   console.log('env', env);

   return {
      plugins: [react()],

      root: 'src',
   };
});
