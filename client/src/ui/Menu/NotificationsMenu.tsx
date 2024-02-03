import NotificationsMenuIsNotOpen from './NotificationsMenuIsNotOpen';
import Button from '../Buttons/Button';
import { RiOpenaiFill } from 'react-icons/ri';
import NotificationsMenuItem from '../../features/Notifications/NotificationsMenuItem';
import { useNavigate } from 'react-router-dom';
import { IoIosArrowRoundBack } from 'react-icons/io';

import Icon from '../Icon';

import { useSortedNotifications } from '../../hooks/useSortedNotifications';
import { MenuProps } from '../../interfaces/MenuProps';
import { useAppSelector } from '../../redux-hooks';
import INotification from '../../interfaces/INotification';

export default function NotificationsMenu({ setIsOpen, isOpen }: MenuProps) {
   const { sortedNotifications } = useSortedNotifications();
   const navigation = useNavigate();
   const isAdmin = useAppSelector(state => state.auth.user?.role === 'Admin');

   const handleGoBack = () => {
      isAdmin ? navigation('/account/edit-links') : navigation('/account/personal');
   };

   if (!sortedNotifications) return;

   return (
      <nav className={`account__sidebar ${isOpen ? '' : 'hide-menu'}`}>
         {isOpen ? (
            <ul className='account__sidebar--navigation'>
               <li onClick={handleGoBack} className={`account__sidebar--navigation__goback ${isOpen && 'open'}`}>
                  <Icon className='account__sidebar--navigation__goback--icon'>
                     <IoIosArrowRoundBack />
                  </Icon>
               </li>
               {sortedNotifications?.map((notification: INotification) => (
                  <NotificationsMenuItem key={notification._id} notification={notification} />
               ))}
            </ul>
         ) : (
            <NotificationsMenuIsNotOpen notifications={sortedNotifications} />
         )}
         <Button className='account__open-menu' onClick={() => setIsOpen(prevIsOpen => !prevIsOpen)}>
            <RiOpenaiFill />
         </Button>
      </nav>
   );
}
