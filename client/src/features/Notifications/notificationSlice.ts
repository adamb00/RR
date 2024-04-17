import INotification from '@/interfaces/INotification';
import { createSlice } from '@reduxjs/toolkit';

const initialState: INotification[] = [];

const notificationSlice = createSlice({
   name: 'notifications',
   initialState,
   reducers: {
      setNotification: (state, action) => {
         console.log('action', action.payload);
         state = action.payload;
         console.log(state);
      },
   },
});

export const { setNotification } = notificationSlice.actions;
export default notificationSlice.reducer;

export const selectNotifications = (state: { notifications: INotification[] }) => state.notifications;
