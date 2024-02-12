import { createSlice } from '@reduxjs/toolkit';
import INotification from '../../../../interfaces/INotification';

type InitialState = {
   notifications: INotification[];
   unreadNotifications: number;
   image: string | null;
   status: 'idle' | 'loading' | 'error';
};

const initialState: InitialState = {
   notifications: [],
   unreadNotifications: 0,
   image: null,
   status: 'idle',
};

const userSlice = createSlice({
   name: 'user',
   initialState,
   reducers: {
      fetchNotifications: (state, action) => {
         state.status = 'loading';
         state.notifications = action.payload;
         state.unreadNotifications =
            action.payload.filter((notification: INotification) => !notification.read).length || 0;
         state.status = 'idle';
      },
      fetchSocketNotification: (state, action) => {
         state.status = 'loading';
         state.notifications = [...state.notifications, action.payload];
         state.unreadNotifications =
            state.notifications.filter((notification: INotification) => !notification.read).length || 0;

         state.status = 'idle';
      },
      markNotificationAsRead: (state, action) => {
         const notification = state.notifications.find(
            notification => notification._id === action.payload.notificationIdToUpdate
         );

         if (notification && !notification.read) {
            notification.read = true;
            state.unreadNotifications > 0 && state.unreadNotifications--;
         }
      },
      markAllNotificationAsRead: state => {
         state.notifications.map(notification => (notification.read = true));
         state.unreadNotifications = 0;
      },
      setImage(state, action) {
         state.image = action.payload;
      },
   },
});

export const {
   fetchNotifications,
   fetchSocketNotification,
   markNotificationAsRead,
   markAllNotificationAsRead,
   setImage,
} = userSlice.actions;
export default userSlice.reducer;
