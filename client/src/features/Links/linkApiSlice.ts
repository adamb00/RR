import { apiSlice } from '@/app/api/apiSlice';

export const linkApiSlice = apiSlice.injectEndpoints({
   endpoints: builder => ({
      createLink: builder.mutation({
         query: data => (
            console.log('BUILDER', builder),
            console.log('BUILDER', data),
            {
               url: '/link',
               method: 'POST',
               body: data,
            }
         ),
      }),

      getLinks: builder.mutation({
         query: () => ({
            url: `/link`,
            method: 'GET',
         }),
      }),

      uploadLinkImage: builder.mutation({
         query: (data: { data: FormData; id: string }) => ({
            url: `/link/${data.id}/upload-image`,
            method: 'POST',
            body: data.data,
         }),
      }),

      updateLink: builder.mutation({
         query: ({ id, data }) => ({
            url: `/link/${id}`,
            method: 'PATCH',
            body: data,
         }),
      }),

      activateLink: builder.mutation({
         query: ({ id, data }) => ({
            url: `/link/${id}/activate-link`,
            method: 'PATCH',
            body: data,
         }),
      }),

      deleteLink: builder.mutation({
         query: id => ({
            url: `/link/${id}`,
            method: 'DELETE',
         }),
      }),
   }),
});

export const {
   useUploadLinkImageMutation,
   useCreateLinkMutation,
   useGetLinksMutation,
   useUpdateLinkMutation,
   useDeleteLinkMutation,
   useActivateLinkMutation,
} = linkApiSlice;
