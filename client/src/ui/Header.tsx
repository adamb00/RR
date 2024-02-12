import Navbar from './Navbar/Navbar';
import NavbarNotAuth from './Navbar/NavbarNotAuth';
import Logo from './Logo';

import { memo, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../features/Auth/slices/auth/authSlice';

export default memo(function Header() {
   const user = useSelector(selectCurrentUser);

   const [isScrolled, setIsScrolled] = useState(false);

   useEffect(() => {
      const handleScroll = () => {
         setIsScrolled(window.scrollY !== 0);
      };

      window.addEventListener('scroll', handleScroll);

      return () => {
         window.removeEventListener('scroll', handleScroll);
      };
   }, []);

   return (
      <header className={`header ${isScrolled ? 'transparent' : ''}`}>
         <Logo />
         {user ? <Navbar /> : <NavbarNotAuth />}
      </header>
   );
});
