import NotificationsAdmin from './NotificationsAdmin';
import NotificationItem from './NotificationItem';
import { useAppSelector } from '../../redux-hooks';

export default function Notifications() {
   const isAdmin = useAppSelector(state => state.auth.user?.role === 'Admin');
   const notifications = useAppSelector(state => state.user.notifications);

   if ((!notifications || notifications.length < 1) && !isAdmin)
      return <h1 className='heading-primary'>Currently you have no notifciations</h1>;

   return isAdmin ? <NotificationsAdmin /> : <NotificationItem />;
}
