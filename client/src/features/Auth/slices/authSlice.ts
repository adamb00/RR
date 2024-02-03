import { createSlice } from '@reduxjs/toolkit';
import INotification from '../../../interfaces/INotification';

export interface UserProfileData {
   name: string;
   email: string;
   role: 'Admin' | 'User';
   password: string;
   birthday: string;
   availablePoints: number;
   accumulatedPoints: number;
   createdAt: string;
   nationality: string;
   referralCode: number;
   level: number;
   children_level_1: string[];
   children_level_2: string[];
   children_level_3: string[];
   active: boolean;
   notifications: INotification[];
   passwordChangedAt: string;
   _id: string;
}

type AuthApiState = {
   token?: string | null;
   user: UserProfileData | null;
   status: 'idle' | 'loading' | 'failed';
   error: string | null;
};

const initialState: AuthApiState = {
   token: sessionStorage.getItem('user') || null,
   user: null,
   status: 'idle',
   error: null,
};

const authSlice = createSlice({
   name: 'auth',
   initialState,
   reducers: {
      setCredentials: (state, action) => {
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

export const { setCredentials, logout, setUser } = authSlice.actions;

export default authSlice.reducer;
