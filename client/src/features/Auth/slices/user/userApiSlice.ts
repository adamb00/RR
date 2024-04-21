import { apiSlice } from '@/app/api/apiSlice';

export const userApiSlice = apiSlice.injectEndpoints({
   endpoints: builder => ({
      updateUser: builder.mutation({
         query: (data: { data: object; id: string }) => ({
            url: `/user/${data.id}`,
            method: 'PATCH',
            body: data.data,
         }),
      }),

      getOneUser: builder.mutation({
         query: id => ({
            url: `/user/${id}`,
            method: 'GET',
         }),
      }),

      fetchNotifications: builder.mutation({
         query: id => ({
            url: `/notification/${id}`,
            method: 'GET',
         }),
      }),
      markNotification: builder.mutation({
         query: data => ({
            url: `/user/mark-one-notification`,
            method: 'POST',
            body: data,
         }),
      }),
      markAllNotifications: builder.mutation({
         query: () => ({
            url: `/user/mark-notifications`,
            method: 'POST',
         }),
      }),
      deleteAllNotifications: builder.mutation({
         query: () => ({
            url: `/user/delete-notifications`,
            method: 'POST',
         }),
      }),
      uploadUserImage: builder.mutation({
         query: (body: FormData) => (
            console.log(body),
            {
               url: `/user/upload-image`,
               method: 'POST',
               body,
               formData: true,
            }
         ),
      }),
      getUserImage: builder.mutation({
         query: key => ({
            url: `/user/get-image/${key}`,
            method: 'GET',
         }),
      }),
      updatePassword: builder.mutation({
         query: data => ({
            url: `/user/update-password`,
            method: 'POST',
            body: data,
         }),
      }),
      test: builder.mutation({
         query: () => ({
            url: `/user/test`,
            method: 'POST',
         }),
      }),
      testAuth: builder.mutation({
         query: () => ({
            url: `/user/test-auth`,
            method: 'POST',
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
   useTestAuthMutation,
   useTestMutation,
} = userApiSlice;
