import Navbar from './Navbar/Navbar';
import NavbarNotAuth from './Navbar/NavbarNotAuth';
import Logo from './Logo';

import { useAppSelector } from '../redux-hooks';
import { memo } from 'react';

export default memo(function Header() {
   const user = useAppSelector(state => state.auth.user);

   return (
      <header className='header'>
         <Logo />
         {user ? <Navbar /> : <NavbarNotAuth />}
      </header>
   );
});
