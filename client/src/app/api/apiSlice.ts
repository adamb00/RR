import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '@/app/store';

const baseQuery = fetchBaseQuery({
   baseUrl: import.meta.env.VITE_BASE_URL,
   credentials: 'same-origin',
   mode: 'cors',

   prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;

      if (token) {
         headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
   },
});

export const apiSlice = createApi({
   baseQuery,
   endpoints: () => ({}),
});
