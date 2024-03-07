import { MenuProps } from '../../interfaces/MenuProps';
import Icon from '../Icon';
import NavigationLink from '../Navigation/NavigationLink';
import { CiBellOn, CiLock, CiMenuKebab } from 'react-icons/ci';
import AdminMenuIsNotOpen from './AdminMenuIsNotOpen';
import Button from '../Buttons/Button';
import useDeviceDetection from '../../hooks/useDetectDevice';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

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
