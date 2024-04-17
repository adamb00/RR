import { apiSlice } from '@/app/api/apiSlice';

export const notificationApiSlice = apiSlice.injectEndpoints({
   endpoints: builder => ({
      createNotification: builder.mutation({
         query: data => ({
            url: '/notification',
            method: 'POST',
            body: data,
         }),
      }),
   }),
});

export const { useCreateNotificationMutation } = notificationApiSlice;
