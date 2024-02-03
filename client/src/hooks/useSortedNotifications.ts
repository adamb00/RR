import INotification from '../interfaces/INotification';
import { useAppSelector } from '../redux-hooks';
import { sortNotifications } from '../utils/helpers';

export const useSortedNotifications = () => {
   const user = useAppSelector(state => state.auth.user);
   if (!user) return;
   const notifications = user.notifications;

   const sortedNotifications = sortNotifications(notifications);

   if (!sortNotifications) return [];

   console.log(sortedNotifications);

   return { sortedNotifications };
};

export const useGetFirstSortedNotification = () => {
   const user = useAppSelector(state => state.auth.user);
   const notifications = user?.notifications;

   if (!user?.notifications) return;

   const firstNotificationId = sortNotifications(notifications as INotification[])[0]._id;

   return { firstNotificationId };
};
