import { apiSlice } from '@/app/api/apiSlice';

export const authApiSlice = apiSlice.enhanceEndpoints({ addTagTypes: ['Link', 'User'] }).injectEndpoints({
   endpoints: builder => ({
      login: builder.mutation({
         query: data => ({
            url: `/auth/signin`,
            method: 'POST',
            body: data,
         }),
      }),
      register: builder.mutation({
         query: data => ({
            url: `/auth/signup`,
            method: 'POST',
            body: data,
         }),
      }),

      getReferralCode: builder.mutation({
         query: (referralCode: number) => ({
            url: `/auth/get-referralcode/${referralCode}`,
            method: 'GET',
         }),
      }),
      logout: builder.mutation({
         query: () => ({
            url: `/auth/signout`,
            method: 'POST',
         }),
      }),
      resetPassword: builder.mutation({
         query: ({ data, token }) => ({
            url: `/auth/reset-password/${token}`,
            method: 'PATCH',
            body: data,
         }),
      }),
   }),
});

export const {
   useLoginMutation,
   useRegisterMutation,
   useGetReferralCodeMutation,
   useResetPasswordMutation,
   useLogoutMutation,
} = authApiSlice;
