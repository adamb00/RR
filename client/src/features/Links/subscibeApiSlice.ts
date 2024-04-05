import { apiSlice } from '@/app/api/apiSlice';

export const subscribeApiSlice = apiSlice.injectEndpoints({
   endpoints: builder => ({
      subscribe: builder.mutation({
         query: data => ({
            url: '/subscribe',
            method: 'POST',
            body: data,
         }),
      }),
   }),
});
export const { useSubscribeMutation } = subscribeApiSlice;
