import NotificationsMenuIsNotOpen from './NotificationsMenuIsNotOpen';
import Button from '../Buttons/Button';
import { RiOpenaiFill } from 'react-icons/ri';
import NotificationsMenuItem from '../../features/Notifications/NotificationsMenuItem';
import { useNavigate } from 'react-router-dom';
import { IoIosArrowRoundBack } from 'react-icons/io';

import Icon from '../Icon';

import { MenuProps } from '../../interfaces/MenuProps';
import { useAppSelector } from '../../redux-hooks';
import INotification from '../../interfaces/INotification';
import { useSelector } from 'react-redux';
import { selectIsAdmin } from '../../features/Auth/slices/auth/authSlice';

export default function NotificationsMenu({ setIsOpen, isOpen }: MenuProps) {
   const navigation = useNavigate();
   const isAdmin = useSelector(selectIsAdmin);
   const notifications = useAppSelector(state => state.user.notifications);

   const handleGoBack = () => {
      isAdmin ? navigation('/account/edit-links') : navigation('/account/personal');
   };

   return (
      <nav className={`account__sidebar ${isOpen ? '' : 'hide-menu'}`}>
         {isOpen ? (
            <ul className='account__sidebar--navigation'>
               <li onClick={handleGoBack} className={`account__sidebar--navigation__goback ${isOpen && 'open'}`}>
                  <Icon className='account__sidebar--navigation__goback--icon'>
                     <IoIosArrowRoundBack />
                  </Icon>
               </li>
               {notifications.map((notification: INotification) => (
                  <NotificationsMenuItem key={notification._id} notification={notification} />
               ))}
            </ul>
         ) : (
            <ul className='account__sidebar--navigation__not-open'>
               <li className='account__sidebar--navigation__goback' onClick={handleGoBack}>
                  <Icon className='account__sidebar--navigation__goback--icon'>
                     <IoIosArrowRoundBack />
                  </Icon>
               </li>
               {notifications.map((notification: INotification) => (
                  <NotificationsMenuIsNotOpen key={notification._id} notification={notification} />
               ))}
            </ul>
         )}
         <Button
            className={`account__open-menu account__open-menu--${isOpen ? 'open' : 'close'}`}
            onClick={() => setIsOpen(prevIsOpen => !prevIsOpen)}
         >
            <RiOpenaiFill />
         </Button>
      </nav>
   );
}
