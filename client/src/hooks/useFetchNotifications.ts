import { useEffect, useState } from 'react';
import INotification from '../interfaces/INotification';
import { useGetOneNotification } from '../features/Notifications/useNotifications';
import { useAppSelector } from '../redux-hooks';

export const useFetchNotifications = () => {
   const user = useAppSelector(state => state.auth.user);

   const [notificationsFetched, setNotificationsFetched] = useState<INotification[]>([]);
   const userNotificationIDs = user?.notifications.map(notification => notification._id) || [];
   const { notifications, error } = useGetOneNotification(userNotificationIDs);

   useEffect(() => {
      if (!error && Array.isArray(notifications) && notifications) {
         const updatedNotifications = notifications.map(notification => {
            const userNotification = user?.notifications.find(userNotif => userNotif._id === notification._id);

            return {
               ...notification,
               read: userNotification ? userNotification.read : false,
            };
         });

         setNotificationsFetched(updatedNotifications);
      }
   }, [error, notifications, user?.notifications]);

   return { notificationsFetched };
};
