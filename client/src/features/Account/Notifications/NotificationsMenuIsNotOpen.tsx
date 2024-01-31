import { useNavigate } from 'react-router-dom';
import INotification from '../../../interfaces/INotification';
import ButtonIcon from '../../../ui/Buttons/ButtonIcon';
import { createMonogram } from '../../../utils/helpers';
import Icon from '../../../ui/Icon';
import { IoIosArrowRoundBack } from 'react-icons/io';
import { useAuth } from '../../../context/AuthContext';
import NavigationLink from '../../../ui/Navigation/NavigationLink';

interface NotificationItemProps {
   notifications?: INotification[];
}
export default function NotificationsMenuIsNotOpen({ notifications }: NotificationItemProps) {
   const navigation = useNavigate();
   const { isAdmin } = useAuth();

   const handleGoBack = () => {
      isAdmin ? navigation('/account/edit-links') : navigation('/account/personal');
   };

   return (
      <ul className='account__sidebar--navigation__not-open'>
         <li className='account__sidebar--navigation__goback' onClick={handleGoBack}>
            <Icon className='account__sidebar--navigation__goback--icon'>
               <IoIosArrowRoundBack />
            </Icon>
         </li>
         {notifications?.map(notification => (
            <NavigationLink
               to={`notifications/${notification._id} `}
               className={`account__sidebar--navigation-link__not-open ${notification.read && 'read'}`}
               key={notification._id}
            >
               <ButtonIcon onClick={() => {}} key={notification._id} className={`account__sidebar--icon__not-open `}>
                  {createMonogram(notification.created_by)}
               </ButtonIcon>
            </NavigationLink>
         ))}
      </ul>
   );
}
