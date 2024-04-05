import NavigationLink from '../Navigation/NavigationLink';
import Button from '../Buttons/Button';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { CiBellOn, CiLock, CiUser } from 'react-icons/ci';
import Icon from '../Icon';
import MenuIsNotOpen from './MenuIsNotOpen';
import useDeviceDetection from '@/hooks/useDetectDevice';

import { useIsNotification } from '@/hooks/useIsNotification';
import NotificationsMenu from './NotificationsMenu';
import { MenuProps } from '@/interfaces/MenuProps';
import { useAppSelector } from '@/redux-hooks';
import { useMarkOneNotificationAsRead } from '@/hooks/useMarkOneNotificationAsRead';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import UploadImage from '@/features/Account/UploadImage';

export default memo(function Menu({ isOpen, setIsOpen }: MenuProps) {
   const device = useDeviceDetection();
   const { isNotification } = useIsNotification();
   const firstNotificationId = useAppSelector(state => state.auth.user?.notifications[0]);
   const handleOnMarkOneNotificationAsRead = useMarkOneNotificationAsRead(firstNotificationId?._id);
   const { t } = useTranslation();

   const handleClick = () => {
      if (!firstNotificationId?.read) {
         handleOnMarkOneNotificationAsRead();
      }
   };

   if (isNotification) return <NotificationsMenu isOpen={isOpen} setIsOpen={setIsOpen} />;

   if (device !== 'Desktop')
      return (
         <nav className='account__sidebar'>
            <MenuIsNotOpen />
         </nav>
      );

   return (
      <nav className={`account__sidebar ${isOpen ? '' : 'hide-menu'}`}>
         {isOpen ? (
            <ul className='account__sidebar--navigation'>
               <li>
                  <UploadImage />
               </li>

               <li>
                  <NavigationLink to='personal'>
                     <Icon className='account__sidebar--icon'>
                        <CiUser />
                     </Icon>
                     {t('Personal information')}
                  </NavigationLink>
               </li>
               <li>
                  <NavigationLink
                     to={`${firstNotificationId?._id ? 'notifications/' + firstNotificationId?._id : 'notifications'}`}
                     onClick={handleClick}
                  >
                     <Icon className='account__sidebar--icon'>
                        <CiBellOn />
                     </Icon>
                     {t('Notifications')}
                  </NavigationLink>
               </li>
               <li>
                  <NavigationLink to='security'>
                     <Icon className='account__sidebar--icon'>
                        <CiLock />
                     </Icon>
                     {t('Security')}
                  </NavigationLink>
               </li>
            </ul>
         ) : (
            <MenuIsNotOpen />
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
});
