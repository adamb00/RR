import NavigationLink from './NavigationLink';
import ThemeSwitcher from './ThemeSwitcher';
import Button from './Button';
import { useNavigate } from 'react-router-dom';
import Navigation from './Navigation';
import { useIsMobile } from '../hooks/useIsMobile';
import { useAuth } from '../context/AuthContext';
import NavigationNoAuth from './NavigationNoAuth';

export default function NavbarNotAuth() {
   const navigate = useNavigate();
   const { isMobile } = useIsMobile();
   const { user } = useAuth();

   if (isMobile)
      return (
         <nav className='header-nav'>
            <ul className='header-nav__list'>
               <li>
                  <ThemeSwitcher />
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
               <NavigationLink to='about'>About</NavigationLink>
            </li>

            <li>
               <ThemeSwitcher />
            </li>

            <li>
               <Button onClick={() => navigate('/signin')} className='btn btn--primary'>
                  Login
               </Button>
            </li>
         </ul>
      </nav>
   );
}
