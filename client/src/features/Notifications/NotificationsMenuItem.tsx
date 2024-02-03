import INotification from '../../interfaces/INotification';
import { useAppDispatch } from '../../redux-hooks';
import NavigationLink from '../../ui/Navigation/NavigationLink';
import { truncateText } from '../../utils/helpers';
import { useMarkNotificationMutation } from '../Auth/slices/user/userApiSlice';
import { markNotificationAsRead } from '../Auth/slices/user/userSlice';

interface NotificationItemProps {
   notification: INotification;
}
export default function NotificationsMenuItem({ notification }: NotificationItemProps) {
   const { read, title, _id } = notification;
   const dispatch = useAppDispatch();
   const [markNotificationApi] = useMarkNotificationMutation();

   const handleOnClick = async () => {
      const res = await markNotificationApi({ id: _id }).unwrap();
      dispatch(markNotificationAsRead({ ...res }));
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
