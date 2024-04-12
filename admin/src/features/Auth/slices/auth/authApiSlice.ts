import { apiSlice } from '@/app/api/apiSlice';

export const authApiSlice = apiSlice.injectEndpoints({
   endpoints: builder => ({
      login: builder.mutation({
         query: data => ({
            url: '/auth/signin',
            method: 'POST',
            body: data,
         }),
      }),
      logout: builder.mutation({
         query: () => ({
            url: `/auth/signout`,
            method: 'POST',
         }),
      }),
   }),
});

export const { useLoginMutation, useLogoutMutation } = authApiSlice;
