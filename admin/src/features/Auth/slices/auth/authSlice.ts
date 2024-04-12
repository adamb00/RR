import { createSlice } from '@reduxjs/toolkit';
import { UserProfileData } from '@/interfaces/IUser';

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
   },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: { auth: { user: UserProfileData } }) => state.auth.user;
export const selectCurrentToken = (state: { auth: { token: string } }) => state.auth.token;
