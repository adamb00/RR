import { BASE_URL } from '../../../utils/helpers';
import { apiSlice } from './apiSlice';
const storedUser = sessionStorage.getItem('user');

export const userApiSlice = apiSlice.injectEndpoints({
   endpoints: builder => ({
      login: builder.mutation({
         query: data => ({
            url: `${BASE_URL}auth/signin`,
            method: 'POST',
            body: data,
         }),
      }),
      logout: builder.mutation({
         query: () => ({
            url: `${BASE_URL}auth/signout`,
            method: 'POST',
         }),
      }),
      register: builder.mutation({
         query: data => ({
            url: `${BASE_URL}auth/signup`,
            method: 'POST',
            body: data,
         }),
      }),
      getCurrentUser: builder.mutation({
         query: () => ({
            url: `${BASE_URL}user/current-user`,
            method: 'GET',
            headers: {
               Authorization: `Bearer ${storedUser}`,
            },
         }),
      }),
      updateUser: builder.mutation({
         query: data => ({
            url: `${BASE_URL}user/current-user`,
            method: 'PUT',
            body: data,
         }),
      }),
   }),
});

export const {
   useLoginMutation,
   useLogoutMutation,
   useRegisterMutation,
   useUpdateUserMutation,
   useGetCurrentUserMutation,
} = userApiSlice;
