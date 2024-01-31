import { Dispatch, SetStateAction } from 'react';
import NotificationsMenuIsNotOpen from './NotificationsMenuIsNotOpen';
import useDeviceDetection from '../../../hooks/useDetectDevice';
import { useAuth } from '../../../context/AuthContext';
import Button from '../../../ui/Buttons/Button';
import { RiOpenaiFill } from 'react-icons/ri';
import NotificationsMenuItem from './NotificationsMenuItem';
import { useNavigate } from 'react-router-dom';
import { IoIosArrowRoundBack } from 'react-icons/io';

import Icon from '../../../ui/Icon';

import MenuIsNotOpen from '../../../ui/Menu/MenuIsNotOpen';
import { useSortedNotifications } from '../../../hooks/useSortedNotifications';
import { UserData } from '../../../interfaces/AuthInterfaces';

interface NotificationsMenuProps {
   setIsOpen: Dispatch<SetStateAction<boolean>>;
   isOpen: boolean;
}
export default function NotificationsMenu({ setIsOpen, isOpen }: NotificationsMenuProps) {
   const { user, isAdmin } = useAuth();
   const device = useDeviceDetection();
   const navigation = useNavigate();

   const { sortedNotifications } = useSortedNotifications(user as UserData);

   const handleGoBack = () => {
      isAdmin ? navigation('/account/edit-links') : navigation('/account/personal');
   };

   if (device === 'Mobile')
      return (
         <nav className='account__sidebar'>
            {!isAdmin ? <NotificationsMenuIsNotOpen notifications={sortedNotifications} /> : <MenuIsNotOpen />}
         </nav>
      );
   return (
      <nav className={`account__sidebar ${isOpen ? '' : 'hide-menu'}`}>
         {isOpen ? (
            <ul className='account__sidebar--navigation'>
               <li onClick={handleGoBack} className={`account__sidebar--navigation__goback ${isOpen && 'open'}`}>
                  <Icon className='account__sidebar--navigation__goback--icon'>
                     <IoIosArrowRoundBack />
                  </Icon>
               </li>
               {sortedNotifications?.map(notification => (
                  <NotificationsMenuItem key={notification._id} notification={notification} />
               ))}
            </ul>
         ) : !isAdmin ? (
            <NotificationsMenuIsNotOpen notifications={sortedNotifications} />
         ) : (
            <MenuIsNotOpen />
         )}
         <Button className='account__open-menu' onClick={() => setIsOpen(prevIsOpen => !prevIsOpen)}>
            <RiOpenaiFill />
         </Button>
      </nav>
   );
}
