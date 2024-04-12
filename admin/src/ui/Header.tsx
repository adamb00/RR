import Logout from '@/features/Auth/Logout';
import { selectCurrentUser } from '@/features/Auth/slices/auth/authSlice';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Logo from './Logo';

export default function Header() {
   const user = useSelector(selectCurrentUser);
   if (!user) return;
   return (
      <nav className='header-nav'>
         <Logo />
         <ul className='header-nav__list'>
            <NavLink
               className={({ isActive }) =>
                  isActive ? `header-nav__item header-nav__item--active` : `header-nav__item`
               }
               to='/'
            >
               Linkek
            </NavLink>

            <NavLink
               className={({ isActive }) =>
                  isActive ? `header-nav__item header-nav__item--active` : `header-nav__item`
               }
               to='/notifications'
            >
               Értesítések
            </NavLink>

            <NavLink
               className={({ isActive }) =>
                  isActive ? `header-nav__item header-nav__item--active` : `header-nav__item`
               }
               to='/account'
            >
               Fiók
            </NavLink>

            <Logout />
         </ul>
      </nav>
   );
}
