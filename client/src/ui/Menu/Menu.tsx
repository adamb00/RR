import NavigationLink from '../Navigation/NavigationLink';
import Button from '../Buttons/Button';
import { RiOpenaiFill } from 'react-icons/ri';
import { CiBellOn, CiLock, CiUser } from 'react-icons/ci';
import Icon from '../Icon';
import MenuIsNotOpen from './MenuIsNotOpen';
import useDeviceDetection from '../../hooks/useDetectDevice';

import { useIsNotification } from '../../hooks/useIsNotification';
import NotificationsMenu from './NotificationsMenu';
import { MenuProps } from '../../interfaces/MenuProps';
import { useAppSelector } from '../../redux-hooks';
import { useMarkOneNotificationAsRead } from '../../hooks/useMarkOneNotificationAsRead';

import UserImage from '../UserImage';
export default function Menu({ isOpen, setIsOpen }: MenuProps) {
   const device = useDeviceDetection();
   const { isNotification } = useIsNotification();
   const firstNotificationId = useAppSelector(state => state.user.notifications[0]?._id);
   const handleOnMarkOneNotificationAsRead = useMarkOneNotificationAsRead(firstNotificationId);

   if (isNotification) return <NotificationsMenu isOpen={isOpen} setIsOpen={setIsOpen} />;

   if (device === 'Mobile')
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
                  <UserImage />
               </li>

               <li>
                  <NavigationLink to='personal'>
                     <Icon className='account__sidebar--icon'>
                        <CiUser />
                     </Icon>
                     Personal information
                  </NavigationLink>
               </li>
               <li>
                  <NavigationLink
                     to={`${firstNotificationId ? 'notifications/' + firstNotificationId : 'notifications'}`}
                     onClick={handleOnMarkOneNotificationAsRead}
                  >
                     <Icon className='account__sidebar--icon'>
                        <CiBellOn />
                     </Icon>
                     Notifications
                  </NavigationLink>
               </li>
               <li>
                  <NavigationLink to='security'>
                     <Icon className='account__sidebar--icon'>
                        <CiLock />
                     </Icon>
                     Security
                  </NavigationLink>
               </li>
            </ul>
         ) : (
            <MenuIsNotOpen />
         )}
         <Button className='account__open-menu' onClick={() => setIsOpen(prevIsOpen => !prevIsOpen)}>
            <RiOpenaiFill />
         </Button>
      </nav>
   );
}
