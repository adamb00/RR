import { useEffect, useState } from 'react';
import { getSortedNotifications } from '../utils/helpers';

import INotification from '../interfaces/INotification';
import { useFetchNotifications } from './useFetchNotifications';

export const useSortedNotifications = () => {
   const { notificationsFetched: notifications } = useFetchNotifications();
   const [firstNotificationId, setFirstNotificationId] = useState<string | undefined>();
   const [sortedNotifications, setSortedNotifications] = useState<INotification[] | undefined>();

   useEffect(() => {
      const fetchData = async () => {
         try {
            const sortedNotifications = await getSortedNotifications(notifications);
            setSortedNotifications(sortedNotifications);

            if (sortedNotifications.length > 0) {
               let latestNotification = sortedNotifications[0];
               sortedNotifications.forEach(notification => {
                  if (notification.created_at > latestNotification.created_at) {
                     latestNotification = notification;
                  }
               });

               setFirstNotificationId(latestNotification._id);
            }
         } catch (error) {
            console.error('Error fetching or sorting notifications:', error);
         }
      };

      if (notifications) {
         fetchData();
      }
   }, [notifications]);

   return { firstNotificationId, sortedNotifications };
};
