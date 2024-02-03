import { MenuProps } from '../../interfaces/MenuProps';
import Icon from '../Icon';
import NavigationLink from '../Navigation/NavigationLink';
import { RiOpenaiFill } from 'react-icons/ri';
import { CiBellOn, CiLock, CiMenuKebab, CiUser } from 'react-icons/ci';
import AdminMenuIsNotOpen from './AdminMenuIsNotOpen';
import Button from '../Buttons/Button';
import useDeviceDetection from '../../hooks/useDetectDevice';
import { memo } from 'react';

export default memo(function AdminMenu({ setIsOpen, isOpen }: MenuProps) {
   const device = useDeviceDetection();

   if (device === 'Mobile')
      return (
         <nav className='account__sidebar'>
            <AdminMenuIsNotOpen />
         </nav>
      );
   return (
      <nav className={`account__sidebar ${isOpen ? '' : 'hide-menu'}`}>
         {isOpen ? (
            <ul className='account__sidebar--navigation'>
               <li>
                  <NavigationLink to='edit-links'>
                     <Icon className='account__sidebar--icon'>
                        <CiMenuKebab />
                     </Icon>
                     Edit links
                  </NavigationLink>
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
                  <NavigationLink to='notifications'>
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
            <AdminMenuIsNotOpen />
         )}
         <Button className='account__open-menu' onClick={() => setIsOpen(prevIsOpen => !prevIsOpen)}>
            <RiOpenaiFill />
         </Button>
      </nav>
   );
});
