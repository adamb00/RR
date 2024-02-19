import { MenuProps } from '../../interfaces/MenuProps';
import Icon from '../Icon';
import NavigationLink from '../Navigation/NavigationLink';
import { RiOpenaiFill } from 'react-icons/ri';
import { CiBellOn, CiLock, CiMenuKebab } from 'react-icons/ci';
import AdminMenuIsNotOpen from './AdminMenuIsNotOpen';
import Button from '../Buttons/Button';
import useDeviceDetection from '../../hooks/useDetectDevice';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

export default memo(function AdminMenu({ setIsOpen, isOpen }: MenuProps) {
   const device = useDeviceDetection();
   const { t } = useTranslation();

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
                     {t('Edit links')}
                  </NavigationLink>
               </li>

               <li>
                  <NavigationLink to='notifications'>
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
            <AdminMenuIsNotOpen />
         )}
         <Button className='account__open-menu' onClick={() => setIsOpen(prevIsOpen => !prevIsOpen)}>
            <RiOpenaiFill />
         </Button>
      </nav>
   );
});
