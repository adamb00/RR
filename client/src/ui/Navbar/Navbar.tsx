import Button from '../Buttons/Button';
import NavigationLink from '../Navigation/NavigationLink';
import ThemeSwitcher from '../ThemeSwitcher';
import { useLogoutUser } from '../../features/Auth/useUserAuth';
import Notifications from '../HomeNotifications/Notifications';
import Navigation from '../Navigation/Navigation';
import { useAuth } from '../../context/AuthContext';
import NavigationNoAuth from '../Navigation/NavigationNoAuth';
import useDeviceDetection from '../../hooks/useDetectDevice';

export default function Navbar() {
   const { user, isAdmin } = useAuth();
   const { logoutUser } = useLogoutUser();
   const device = useDeviceDetection();

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
               <Button onClick={logoutUser} className='btn btn--primary'>
                  Log out
               </Button>
            </li>
         </ul>
      </nav>
   );
}
