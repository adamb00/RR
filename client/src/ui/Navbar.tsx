import Button from './Button';
import NavigationLink from './NavigationLink';
import ThemeSwitcher from './ThemeSwitcher';
import { useLogoutUser } from '../features/Auth/useUserAuth';
import Notifications from './Notifications';
import { useIsMobile } from '../hooks/useIsMobile';
import Navigation from './Navigation';
import { useAuth } from '../context/AuthContext';
import NavigationNoAuth from './NavigationNoAuth';

export default function Navbar() {
   const { user } = useAuth();
   const { logoutUser } = useLogoutUser();
   const { isMobile } = useIsMobile();

   if (isMobile)
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
               <NavigationLink to='/account'>Account</NavigationLink>
            </li>
            <li>
               <ThemeSwitcher />
            </li>
            <li>
               <Notifications />
            </li>
            <li>
               <Button onClick={logoutUser} className='btn btn--primary'>
                  Log out
               </Button>
            </li>
         </ul>
      </nav>
   );
}
