import { createSlice } from '@reduxjs/toolkit';
import { UserProfileData } from '../../../../interfaces/AuthInterfaces';

interface InitialState {
   user: null | UserProfileData;
   token: null | string;
}

const initialState: InitialState = { user: null, token: null };

const authSlice = createSlice({
   name: 'auth',
   initialState,
   reducers: {
      setCredentials: (state, action) => {
         const { data, token } = action.payload;
         state.user = data;
         state.token = token;
      },
      logout: state => {
         state.user = null;
         state.token = null;
      },
      updateUser: (state, action) => {
         state.user = action.payload;
      },
   },
});

export const { setCredentials, logout, updateUser } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: { auth: { user: UserProfileData } }) => state.auth.user;
export const selectCurrentToken = (state: { auth: { token: string } }) => state.auth.token;
export const selectIsAdmin = (state: { auth: { user: UserProfileData } }) => state.auth.user.role === 'Admin' || false;
export const selectCurrentUserNotifications = (state: { auth: { user: UserProfileData } }) =>
   state.auth.user.notifications;
