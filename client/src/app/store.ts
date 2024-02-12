import { combineReducers, configureStore } from '@reduxjs/toolkit';
import AuthReducer from '../features/Auth/slices/auth/authSlice';
import UserReducer from '../features/Auth/slices/user/userSlice';
import { apiSlice } from './api/apiSlice';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({
   [apiSlice.reducerPath]: apiSlice.reducer,
   auth: AuthReducer,
   user: UserReducer,
});

const persistConfig = {
   key: 'root',
   storage,
   whitelist: ['auth', 'api', 'user'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
   reducer: persistedReducer,
   middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false }).concat(apiSlice.middleware),
   devTools: true,
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
