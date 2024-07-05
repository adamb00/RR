import { apiSlice } from '@/app/api/apiSlice';

export const userApiSlice = apiSlice.injectEndpoints({
   endpoints: builder => ({
      getUsers: builder.mutation({
         query: () => ({
            url: '/user',
            method: 'GET',
         }),
      }),

      getOneUser: builder.mutation({
         query: id => ({
            url: `/user/${id}`,
            method: 'GET',
         }),
      }),

      updateUser: builder.mutation({
         query: ({ id, data }) => ({
            url: `/user/${id}`,
            method: 'PATCH',
            body: data,
         }),
      }),
   }),
});

export const { useGetUsersMutation, useUpdateUserMutation, useGetOneUserMutation } = userApiSlice;
