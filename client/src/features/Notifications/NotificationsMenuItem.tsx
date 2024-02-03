import INotification from '../../interfaces/INotification';
import Loader from '../../ui/Loader';
import NavigationLink from '../../ui/Navigation/NavigationLink';
import { truncateText } from '../../utils/helpers';
import { useMarkNotification } from '../Auth/useUserAuth';

interface NotificationItemProps {
   notification: INotification;
}
export default function NotificationsMenuItem({ notification }: NotificationItemProps) {
   const { updateOneNotification } = useMarkNotification();

   if (!notification) return <Loader size={100} />;
   const { title, read, _id } = notification;

   const handleOnClick = () => {
      updateOneNotification(_id);
      console.log(_id);
   };

   return (
      <NavigationLink
         to={`${'notifications/' + _id}`}
         className={`account__sidebar--notifications__wrapper ${read && 'read'}`}
      >
         <p onClick={handleOnClick} className='account__sidebar--notifications__title'>
            {truncateText(title, 32)}
         </p>
      </NavigationLink>
   );
}
