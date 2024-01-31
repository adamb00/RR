import { useEffect, useState } from 'react';
import { getSortedNotifications } from '../utils/helpers';
import { UserData } from '../interfaces/AuthInterfaces';
import INotification from '../interfaces/INotification';

export const useSortedNotifications = (user: UserData) => {
   const [firstNotificationId, setFirstNotificationId] = useState<string>();
   const [sortedNotifications, setSortedNotification] = useState<INotification[]>();

   useEffect(() => {
      const fetchData = async () => {
         try {
            const sortedNotifications = await getSortedNotifications(user);
            setSortedNotification(sortedNotifications);
            if (sortedNotifications.length > 0) {
               setFirstNotificationId(sortedNotifications[0]?._id);
            }
         } catch (error) {
            console.error('Error fetching or sorting notifications:', error);
         }
      };

      if (user) {
         fetchData();
      }
   }, [user]);

   return { firstNotificationId, sortedNotifications };
};
