import { apiSlice } from '@/app/api/apiSlice';

export const notificationApiSlice = apiSlice.injectEndpoints({
   endpoints: builder => ({
      getOneNotification: builder.mutation({
         query: (id: string) => ({
            url: `/notification/${id}`,
            method: 'GET',
         }),
      }),
   }),
});

export const { useGetOneNotificationMutation } = notificationApiSlice;
