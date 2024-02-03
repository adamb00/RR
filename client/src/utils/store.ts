import { combineReducers, configureStore } from '@reduxjs/toolkit';
import AuthReducer from '../features/Auth/slices/auth/authSlice';
import UserReducer from '../features/Auth/slices/user/userSlice';

import { apiSlice } from '../features/Auth/slices/apiSlice';

const rootReducer = combineReducers({
   [apiSlice.reducerPath]: apiSlice.reducer,
   auth: AuthReducer,
   user: UserReducer,
});

const store = configureStore({
   reducer: rootReducer,
   middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware),
   devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
