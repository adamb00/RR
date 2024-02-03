import NavigationLink from '../Navigation/NavigationLink';
import ThemeSwitcher from '../ThemeSwitcher';
import Notifications from '../HomeNotifications/Notifications';
import Navigation from '../Navigation/Navigation';

import NavigationNoAuth from '../Navigation/NavigationNoAuth';
import useDeviceDetection from '../../hooks/useDetectDevice';
import SignOut from '../../features/Auth/SignOut';
import { useAppSelector } from '../../redux-hooks';

export default function Navbar() {
   const device = useDeviceDetection();
   const user = useAppSelector(state => state.auth.user);
   const isAdmin = useAppSelector(state => state.auth.user?.role === 'Admin');

   if (device === 'Mobile')
      return (
         <nav className='header-nav'>
            <ul className='header-nav__list'>
               <li>
                  <ThemeSwitcher />
               </li>
               <li>
                  <Notifications />
               </li>
               {user ? <Navigation /> : <NavigationNoAuth />}
            </ul>
         </nav>
      );
   return (
      <nav className='header-nav'>
         <ul className='header-nav__list'>
            <li>
               <NavigationLink to='/'>Home</NavigationLink>
            </li>

            <li>
               <NavigationLink to='/my-links'>Links</NavigationLink>
            </li>
            <li>
               {isAdmin ? (
                  <NavigationLink to='/account/edit-links'>Account</NavigationLink>
               ) : (
                  <NavigationLink to='/account/personal'>Account</NavigationLink>
               )}
            </li>
            <li>
               <ThemeSwitcher />
            </li>
            <li>{!isAdmin && <Notifications />}</li>
            <li>
               <SignOut />
            </li>
         </ul>
      </nav>
   );
}
