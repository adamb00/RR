import { useMarkOneNotificationAsRead } from '../../hooks/useMarkOneNotificationAsRead';
import INotification from '../../interfaces/INotification';
import NavigationLink from '../../ui/Navigation/NavigationLink';
import { truncateText } from '../../utils/helpers';

interface NotificationItemProps {
   notification: INotification;
}
export default function NotificationsMenuItem({ notification }: NotificationItemProps) {
   const { read, title, _id } = notification;

   const handleOnMarkOneNotificationAsRead = useMarkOneNotificationAsRead(_id);

   const handleClick = () => {
      if (!read) {
         handleOnMarkOneNotificationAsRead();
      }
   };

   return (
      <NavigationLink
         to={`${'notifications/' + _id}`}
         className={`account__sidebar--notifications__wrapper ${read && 'read'}`}
      >
         <p onClick={handleClick} className='account__sidebar--notifications__title'>
            {truncateText(title, 32)}
         </p>
      </NavigationLink>
   );
}
