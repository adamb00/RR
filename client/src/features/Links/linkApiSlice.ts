import { apiSlice } from '@/app/api/apiSlice';
// import { ITEM_PER_PAGE } from '../../utils/constants';

// const apiWithTag = apiSlice.enhanceEndpoints({addTagTypes: ['Link']})

export const linkApiSlice = apiSlice.enhanceEndpoints({ addTagTypes: ['Link', 'User'] }).injectEndpoints({
   endpoints: builder => ({
      createLink: builder.mutation({
         query: data => (
            console.log('linkQuery', data),
            {
               url: 'link',
               method: 'POST',
               body: data,
            }
         ),
         invalidatesTags: ['Link', 'User'],
      }),

      getLinks: builder.mutation({
         query: () => ({
            url: `link`,
            method: 'GET',
         }),
      }),

      uploadLinkImage: builder.mutation({
         query: (data: { data: FormData; id: string }) => ({
            url: `link/${data.id}/upload-image`,
            method: 'POST',
            body: data.data,
         }),
         invalidatesTags: ['Link', 'User'],
      }),

      updateLink: builder.mutation({
         query: ({ id, data }) => ({
            url: `link/${id}`,
            method: 'PATCH',
            body: data,
         }),
         invalidatesTags: ['Link', 'User'],
      }),

      activateLink: builder.mutation({
         query: ({ id, data }) => ({
            url: `link/${id}/activate-link`,
            method: 'PATCH',
            body: data,
         }),
      }),

      deleteLink: builder.mutation({
         query: id => ({
            url: `link/${id}`,
            method: 'DELETE',
         }),
         invalidatesTags: ['Link', 'User'],
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
