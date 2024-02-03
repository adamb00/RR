import NotificationsAdmin from './NotificationsAdmin';
import { useSortedNotifications } from '../../hooks/useSortedNotifications';
import NotificationItem from './NotificationItem';
import { useAppSelector } from '../../redux-hooks';

export default function Notifications() {
   const { sortedNotifications } = useSortedNotifications();
   const isAdmin = useAppSelector(state => state.auth.user?.role === 'Admin');

   if ((!sortedNotifications || sortedNotifications.length < 1) && !isAdmin)
      return <h1 className='heading-primary'>Currently you have no notifciations</h1>;

   return isAdmin ? <NotificationsAdmin /> : <NotificationItem />;
}
