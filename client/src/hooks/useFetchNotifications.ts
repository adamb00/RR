import { useEffect, useState } from 'react';
import INotification from '../interfaces/INotification';
import { useGetOneNotification } from '../features/Notifications/useNotifications';
import { useAuth } from '../context/AuthContext';

export const useFetchNotifications = () => {
   const [notificationsFetched, setNotificationsFetched] = useState<INotification[]>([]);
   const { user } = useAuth();
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
