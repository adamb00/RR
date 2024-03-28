import { apiSlice } from '@/app/api/apiSlice';

export const userApiSlice = apiSlice.injectEndpoints({
   endpoints: builder => ({
      updateUser: builder.mutation({
         query: (data: { data: object; id: string }) => ({
            url: `user/${data.id}`,
            method: 'PATCH',
            body: data.data,
         }),
      }),

      getOneUser: builder.mutation({
         query: id => ({
            url: `user/${id}`,
            method: 'GET',
         }),
      }),

      fetchNotifications: builder.mutation({
         query: id => ({
            url: `notification/${id}`,
            method: 'GET',
         }),
      }),
      markNotification: builder.mutation({
         query: data => ({
            url: `user/mark-one-notification`,
            method: 'PATCH',
            body: data,
         }),
      }),
      markAllNotifications: builder.mutation({
         query: () => ({
            url: `user/mark-notifications`,
            method: 'PATCH',
         }),
      }),
      deleteAllNotifications: builder.mutation({
         query: () => ({
            url: `user/delete-notifications`,
            method: 'PATCH',
         }),
      }),
      uploadUserImage: builder.mutation({
         query: (body: FormData) => (
            console.log(body),
            {
               url: `user/upload-image`,
               method: 'POST',
               body,
               formData: true,
            }
         ),
      }),
      getUserImage: builder.mutation({
         query: key => ({
            url: `user/get-image/${key}`,
            method: 'GET',
         }),
      }),
      updatePassword: builder.mutation({
         query: data => ({
            url: `user/update-password`,
            method: 'PATCH',
            body: data,
         }),
      }),
   }),
});

export const {
   useUpdateUserMutation,
   useFetchNotificationsMutation,
   useMarkAllNotificationsMutation,
   useMarkNotificationMutation,
   useUploadUserImageMutation,
   useUpdatePasswordMutation,
   useGetUserImageMutation,
   useDeleteAllNotificationsMutation,
   useGetOneUserMutation,
} = userApiSlice;
