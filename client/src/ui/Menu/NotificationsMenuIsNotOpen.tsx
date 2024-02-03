import INotification from '../../interfaces/INotification';
import ButtonIcon from '../Buttons/ButtonIcon';
import { createMonogram } from '../../utils/helpers';
import NavigationLink from '../Navigation/NavigationLink';

interface NotificationItemProps {
   notification: INotification;
}
export default function NotificationsMenuIsNotOpen({ notification }: NotificationItemProps) {
   const { _id, created_by, read } = notification;

   return (
      <>
         <NavigationLink
            to={`notifications/${_id} `}
            className={`account__sidebar--navigation-link__not-open ${read && 'read'}`}
         >
            <ButtonIcon onClick={() => {}} className={`account__sidebar--icon__not-open `}>
               {createMonogram(created_by)}
            </ButtonIcon>
         </NavigationLink>
      </>
   );
}
