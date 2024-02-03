import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../../utils/helpers';

const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL });

export const apiSlice = createApi({
   baseQuery,
   tagTypes: ['Auth', 'User', 'Notification'],
   endpoints: () => ({}),
});
