import { Dispatch, SetStateAction } from 'react';
import { useAuth } from '../../context/AuthContext';
import NavigationLink from '../Navigation/NavigationLink';
import Button from '../Buttons/Button';
import { RiOpenaiFill } from 'react-icons/ri';
import { CiBellOn, CiLock, CiMenuKebab, CiUser } from 'react-icons/ci';
import Icon from '../Icon';
import MenuIsNotOpen from './MenuIsNotOpen';
import useDeviceDetection from '../../hooks/useDetectDevice';
import { UserData } from '../../interfaces/AuthInterfaces';
import { useSortedNotifications } from '../../hooks/useSortedNotifications';

interface MenuProps {
   setIsOpen: Dispatch<SetStateAction<boolean>>;
   isOpen: boolean;
}

export default function Menu({ isOpen, setIsOpen }: MenuProps) {
   const { user, isAdmin } = useAuth();
   const device = useDeviceDetection();
   const { firstNotificationId } = useSortedNotifications(user as UserData);

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
               {user?.role === 'Admin' && (
                  <li>
                     <NavigationLink to='edit-links'>
                        <Icon className='account__sidebar--icon'>
                           <CiMenuKebab />
                        </Icon>
                        Edit links
                     </NavigationLink>
                  </li>
               )}
               <li>
                  <NavigationLink to='personal'>
                     <Icon className='account__sidebar--icon'>
                        <CiUser />
                     </Icon>
                     Personal information
                  </NavigationLink>
               </li>
               <li>
                  <NavigationLink to={`${!isAdmin ? 'notifications/' + firstNotificationId : 'notifications'}`}>
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
