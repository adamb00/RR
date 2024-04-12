import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { apiSlice } from './api/apiSlice';
import AuthReducer from '@/features/Auth/slices/auth/authSlice';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
const rootReducer = combineReducers({
   [apiSlice.reducerPath]: apiSlice.reducer,
   auth: AuthReducer,
});

const persistConfig = {
   key: 'root',
   storage,
   whitelist: ['auth', 'api'],
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
