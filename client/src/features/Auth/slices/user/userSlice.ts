import { createSlice } from '@reduxjs/toolkit';
import INotification from '../../../../interfaces/INotification';

type InitialState = {
   notifications: INotification[];
   unreadNotifications: number;
   image: string | null;
};

const initialState: InitialState = {
   notifications: [],
   unreadNotifications: 0,
   image: null,
};

const userSlice = createSlice({
   name: 'user',
   initialState,
   reducers: {
      fetchNotifications: (state, action) => {
         state.notifications = action.payload;
         state.unreadNotifications =
            action.payload.filter((notification: INotification) => !notification.read).length || 0;
      },
      fetchSocketNotification: (state, action) => {
         state.notifications = [...state.notifications, action.payload];
         state.unreadNotifications =
            state.notifications.filter((notification: INotification) => !notification.read).length || 0;

         console.log(state.notifications);
      },
      markNotificationAsRead: (state, action) => {
         const notification = state.notifications.find(
            notification => notification._id === action.payload.notificationIdToUpdate
         );

         if (notification && !notification.read) {
            notification.read = true;
            state.unreadNotifications > 0 && state.unreadNotifications--;
         }
         console.log(state.unreadNotifications);
      },
      markAllNotificationAsRead: state => {
         state.notifications.map(notification => (notification.read = true));
         state.unreadNotifications = 0;
      },
   },
});

export const { fetchNotifications, fetchSocketNotification, markNotificationAsRead, markAllNotificationAsRead } =
   userSlice.actions;
export default userSlice.reducer;
