import { createSlice } from '@reduxjs/toolkit';
import INotification from '../../../../interfaces/INotification';

type InitialState = {
   notifications: INotification[];
   unreadNotifications: number;
};

const initialState: InitialState = {
   notifications: [],
   unreadNotifications: 0,
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
      markNotificationAsRead: (state, action) => {
         console.log(action);
         const notification = state.notifications.find(
            notification => notification._id === action.payload.notificationIdToUpdate
         );

         if (notification) {
            notification.read = true;
         }
         state.unreadNotifications > 0 && state.unreadNotifications--;
         console.log(state.unreadNotifications);
      },
      markAllNotificationAsRead: state => {
         state.notifications.map(notification => (notification.read = true));
         state.unreadNotifications = 0;
      },
   },
});

export const { fetchNotifications, markNotificationAsRead, markAllNotificationAsRead } = userSlice.actions;
export default userSlice.reducer;
