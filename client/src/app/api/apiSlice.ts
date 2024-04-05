import { BaseQueryApi, FetchArgs, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '@/app/store';
import { logout, setCredentials } from '@/features/Auth/slices/auth/authSlice';

const baseQuery = fetchBaseQuery({
   baseUrl: import.meta.env.VITE_BASE_URL,
   credentials: 'same-origin',
   mode: 'cors',
   prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;

      console.log('lol');

      if (token) {
         headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
   },
});

const baseQueryWithReauth = async (args: string | FetchArgs, api: BaseQueryApi, extraOptions: object) => {
   let result = await baseQuery(args, api, extraOptions);

   console.log('asd');
   console.log('result', result);

   if (result?.error?.status === 'FETCH_ERROR' || result.error?.status === 'PARSING_ERROR') {
      const refreshResult = await baseQuery('auth/refresh', api, extraOptions);

      if (refreshResult?.data) {
         const user = (api.getState() as RootState).auth.user;
         api.dispatch(setCredentials({ ...refreshResult.data, user }));
         result = await baseQuery(args, api, extraOptions);
      } else {
         api.dispatch(logout());
      }
   }

   return result;
};

export const apiSlice = createApi({
   baseQuery: baseQueryWithReauth,
   endpoints: () => ({}),
   tagTypes: ['Link', 'User'],
});
