import { configureStore } from '@reduxjs/toolkit';
import AuthReducer from '../features/Auth/slices/authSlice';

import { apiSlice } from '../features/Auth/slices/apiSlice';

const store = configureStore({
   reducer: {
      [apiSlice.reducerPath]: apiSlice.reducer,
      auth: AuthReducer,
   },
   middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware),
   devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
