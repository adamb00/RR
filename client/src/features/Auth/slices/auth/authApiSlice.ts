import { apiSlice } from '../apiSlice';

const storedUser = sessionStorage.getItem('user');
export const authApiSlice = apiSlice.injectEndpoints({
   endpoints: builder => ({
      login: builder.mutation({
         query: data => ({
            url: `auth/signin`,
            method: 'POST',
            body: data,
         }),
      }),
      logout: builder.mutation({
         query: () => ({
            url: `auth/signout`,
            method: 'POST',
         }),
      }),
      register: builder.mutation({
         query: data => ({
            url: `auth/signup`,
            method: 'POST',
            body: data,
         }),
      }),

      getReferralCode: builder.mutation({
         query: (referralCode: number) => ({
            url: `auth/get-referralcode/${referralCode}`,
            method: 'GET',
         }),
      }),

      getCurrentUser: builder.mutation({
         query: () => ({
            url: `user/current-user`,
            method: 'GET',
            headers: {
               Authorization: `Bearer ${storedUser}`,
            },
         }),
      }),
   }),
});

export const {
   useLoginMutation,
   useLogoutMutation,
   useRegisterMutation,
   useGetReferralCodeMutation,
   useGetCurrentUserMutation,
} = authApiSlice;
