import { createSlice } from '@reduxjs/toolkit';
import { UserProfileData } from '@/interfaces/AuthInterfaces';
import INotification from '@/interfaces/INotification';

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

      markAllNotificationAsRead: state => {
         state.user?.notifications.map((notification: INotification) => (notification.read = true));
      },
      deleteAllNotifications: state => {
         if (state.user) {
            state.user.notifications = [];
         }
      },
      deleteSystemNotifications: state => {
         if (state.user) {
            console.log(state.user);
            state.user.systemNotifications = [];
         }
      },
      markOneNotificationAsRead: (state, action) => {
         const notification = state.user?.notifications.find(
            notification => notification._id === action.payload.notificationIdToUpdate
         );
         if (notification && !notification.read) {
            notification.read = true;
         }
      },
   },
});

export const {
   setCredentials,
   logout,
   updateUser,
   markAllNotificationAsRead,
   markOneNotificationAsRead,
   deleteAllNotifications,
   deleteSystemNotifications,
} = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: { auth: { user: UserProfileData } }) => state.auth.user;
export const selectCurrentToken = (state: { auth: { token: string } }) => state.auth.token;
export const selectCurrentUserNotifications = (state: { auth: { user: UserProfileData } }) =>
   state.auth.user.notifications;
export const selectUnreadNotifications = (state: { auth: { user: UserProfileData } }) =>
   state.auth.user?.notifications.filter((notification: INotification) => !notification.read).length || 0;
