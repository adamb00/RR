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
      createSystemNotification: builder.mutation({
         query: ({ id, notification }) => ({
            url: `/notification/add-system-notification/${id}`,
            method: 'PATCH',
            body: notification,
         }),
      }),
   }),
});

export const { useCreateNotificationMutation, useCreateSystemNotificationMutation } = notificationApiSlice;
