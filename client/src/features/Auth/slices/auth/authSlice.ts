import { createSlice } from '@reduxjs/toolkit';
import { UserProfileData } from '../../../../interfaces/AuthInterfaces';

type AuthApiState = {
   token?: string | null;
   user: UserProfileData | null;
};

const initialState: AuthApiState = {
   token: sessionStorage.getItem('user') || null,
   user: null,
};

const authSlice = createSlice({
   name: 'auth',
   initialState,
   reducers: {
      login: (state, action) => {
         state.user = action.payload.data;
         state.token = action.payload.token;
         sessionStorage.setItem('user', action.payload.token);
      },
      logout: state => {
         state.user = null;
         state.token = null;
         sessionStorage.removeItem('user');
      },
      setUser: (state, action) => {
         state.user = action.payload;
      },
   },
});

export const { login, logout, setUser } = authSlice.actions;

export default authSlice.reducer;
