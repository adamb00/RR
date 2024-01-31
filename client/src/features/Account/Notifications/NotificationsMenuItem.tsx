import { useAuth } from '../../../context/AuthContext';
import INotification from '../../../interfaces/INotification';
import NavigationLink from '../../../ui/Navigation/NavigationLink';
import { truncateText } from '../../../utils/helpers';

interface NotificationItemProps {
   notification: INotification;
}
export default function NotificationsMenuItem({ notification }: NotificationItemProps) {
   const { title, read } = notification;
   const { isAdmin } = useAuth();

   return (
      <NavigationLink
         to={`${!isAdmin ? 'notifications/' + notification._id || '' : 'notifications'}`}
         className={`account__sidebar--notifications__wrapper ${read && 'read'}`}
      >
         <p className='account__sidebar--notifications__title'>{truncateText(title, 32)}</p>
      </NavigationLink>
   );
}
