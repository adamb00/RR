import { apiSlice } from '../apiSlice';

const storedUser = sessionStorage.getItem('user');

export const userApiSlice = apiSlice.injectEndpoints({
   endpoints: builder => ({
      updateUser: builder.mutation({
         query: (data: { data: object; id: string }) => ({
            url: `user/${data.id}`,
            method: 'PATCH',
            body: data.data,
         }),
      }),

      fetchNotifications: builder.mutation({
         query: id => ({
            url: `notification/${id}`,
            method: 'GET',
            headers: {
               Authorization: `Bearer ${storedUser}`,
            },
         }),
         invalidatesTags: ['Notification'],
      }),
      markNotification: builder.mutation({
         query: data => ({
            url: `user/mark-one-notification`,
            method: 'PATCH',
            body: data,
            headers: {
               Authorization: `Bearer ${storedUser}`,
            },
         }),
      }),
      markAllNotifications: builder.mutation({
         query: () => ({
            url: `user/mark-notifications`,
            method: 'PATCH',
            headers: {
               Authorization: `Bearer ${storedUser}`,
            },
         }),
      }),

      uploadUserImage: builder.mutation({
         query: (body: FormData) => ({
            url: `user/upload-image`,
            method: 'POST',
            body,
            formData: true,
            headers: {
               Authorization: `Bearer ${storedUser}`,
            },
         }),
      }),
      getUserImage: builder.mutation({
         query: key => ({
            url: `user/get-image/${key}`,
            method: 'GET',
            headers: {
               Authorization: `Bearer ${storedUser}`,
            },
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
   useGetUserImageMutation,
} = userApiSlice;
