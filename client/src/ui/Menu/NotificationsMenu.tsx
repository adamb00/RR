import NotificationsMenuIsNotOpen from './NotificationsMenuIsNotOpen';
import NotificationsMenuItem from '../../features/Notifications/NotificationsMenuItem';
import { useNavigate } from 'react-router-dom';
import { IoIosArrowRoundBack } from 'react-icons/io';

import Icon from '../Icon';

import { MenuProps } from '../../interfaces/MenuProps';
import { useAppSelector } from '../../redux-hooks';
import INotification from '../../interfaces/INotification';
import { useSelector } from 'react-redux';
import { selectIsAdmin } from '../../features/Auth/slices/auth/authSlice';
import useDeviceDetection from '../../hooks/useDetectDevice';
import Button from '../Buttons/Button';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export default function NotificationsMenu({ isOpen, setIsOpen }: MenuProps) {
   const navigation = useNavigate();
   const isAdmin = useSelector(selectIsAdmin);
   const notifications = useAppSelector(state => state.auth.user?.notifications);
   const device = useDeviceDetection();

   const handleGoBack = () => {
      isAdmin ? navigation('/account/edit-links') : navigation('/account/personal');
   };

   if (device !== 'Desktop')
      return (
         <nav className='account__sidebar'>
            <ul className='account__sidebar--navigation__not-open'>
               <li className='account__sidebar--navigation__goback' onClick={handleGoBack}>
                  <Icon className='account__sidebar--navigation__goback--icon'>
                     <IoIosArrowRoundBack />
                  </Icon>
               </li>
               {notifications?.map((notification: INotification) => (
                  <NotificationsMenuIsNotOpen key={notification._id} notification={notification} />
               ))}
            </ul>
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
               {notifications?.map((notification: INotification) => (
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
               {notifications?.map((notification: INotification) => (
                  <NotificationsMenuIsNotOpen key={notification._id} notification={notification} />
               ))}
            </ul>
         )}
         <Button
            className={`account__open-menu account__open-menu--${isOpen ? 'open' : 'close'}`}
            onClick={() => {
               setIsOpen(prevIsOpen => !prevIsOpen);
            }}
         >
            {isOpen ? (
               <FaChevronLeft className='account__open-menu__icon' />
            ) : (
               <FaChevronRight className='account__open-menu__icon' />
            )}
         </Button>
      </nav>
   );
}
