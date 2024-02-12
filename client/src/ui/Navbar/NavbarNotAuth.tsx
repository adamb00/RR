import NavigationLink from '../Navigation/NavigationLink';
import ThemeSwitcher from '../ThemeSwitcher';
import Button from '../Buttons/Button';
import { useNavigate } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import NavigationNoAuth from '../Navigation/NavigationNoAuth';
import useDeviceDetection from '../../hooks/useDetectDevice';

import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../features/Auth/slices/auth/authSlice';

export default function NavbarNotAuth() {
   const device = useDeviceDetection();
   const navigate = useNavigate();
   const user = useSelector(selectCurrentUser);
   if (device === 'Mobile')
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
               <NavigationLink to='about'>About us</NavigationLink>
            </li>
            <li>
               <NavigationLink to='affiliate'>Affiliate</NavigationLink>
            </li>
            <li>
               <NavigationLink to='faq'>FAQ</NavigationLink>
            </li>
            <li>
               <NavigationLink to='contact'>Contact us</NavigationLink>
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
