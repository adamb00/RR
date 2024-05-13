import NavigationLink from '../Navigation/NavigationLink';
import ThemeSwitcher from '../ThemeSwitcher';
import Notifications from '../HomeNotifications/Notifications';
import Navigation from '../Navigation/Navigation';

import NavigationNoAuth from '../Navigation/NavigationNoAuth';
import useDeviceDetection from '@/hooks/useDetectDevice';
import SignOut from '@/features/Auth/SignOut';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '@/features/Auth/slices/auth/authSlice';
import { useTranslation } from 'react-i18next';

import { TelegramIcon } from 'react-share';

import LanguageChanger from '../Languages/LanguageChanger';
import SystemNotification from '../SystemNotifications/SystemNotification';

export default function Navbar() {
   const device = useDeviceDetection();
   const user = useSelector(selectCurrentUser);
   const { t } = useTranslation();

   if (device === 'Mobile')
      return (
         <nav className='header-nav'>
            <ul className='header-nav__list'>
               <li>
                  <ThemeSwitcher />
               </li>
               <li>
                  <LanguageChanger />
               </li>
               <li>
                  <Notifications />
               </li>
               <li>
                  <SystemNotification />
               </li>
               {user ? <Navigation /> : <NavigationNoAuth />}
            </ul>
         </nav>
      );
   return (
      <nav className='header-nav'>
         <ul className='header-nav__list'>
            <li>
               <NavigationLink to='/'>{t('Home')}</NavigationLink>
            </li>
            <li>
               <NavigationLink to='/my-links'>{t('Links')}</NavigationLink>
            </li>
            <li>
               <NavigationLink to='/account/personal'>{t('Account')}</NavigationLink>
            </li>
            <li>
               <ThemeSwitcher />
            </li>
            <li>
               <LanguageChanger />
            </li>
            <li>
               <Notifications />
            </li>
            <li>
               <SystemNotification />
            </li>
            <li>
               <TelegramIcon
                  className='header-nav__telegram-icon'
                  //TODO NAVIGATE TO TELEGRAM GROUP
                  onClick={() => alert('This will navigate to telegram group')}
               />
            </li>
            <li>
               <SignOut />
            </li>
         </ul>
      </nav>
   );
}
