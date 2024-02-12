import { useSelector } from 'react-redux';
import INotification from '../interfaces/INotification';

import { sortNotifications } from '../utils/helpers';
import { selectCurrentUser } from '../features/Auth/slices/auth/authSlice';

export const useSortedNotifications = () => {
   const user = useSelector(selectCurrentUser);

   if (!user) return;
   const notifications = user.notifications;

   const sortedNotifications = sortNotifications(notifications);

   if (!sortNotifications) return [];

   console.log(sortedNotifications);

   return { sortedNotifications };
};

export const useGetFirstSortedNotification = () => {
   const user = useSelector(selectCurrentUser);
   const notifications = user?.notifications;

   if (!user?.notifications) return;

   const firstNotificationId = sortNotifications(notifications as INotification[])[0]._id;

   return { firstNotificationId };
};
