import { apiSlice } from '@/app/api/apiSlice';

export const transactionApiSlice = apiSlice.injectEndpoints({
   endpoints: builder => ({
      createTransaction: builder.mutation({
         query: transactionData => ({
            url: '/transaction',
            method: 'POST',
            body: transactionData,
         }),
      }),
   }),
});

export const { useCreateTransactionMutation } = transactionApiSlice;
