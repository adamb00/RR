import Navbar from './Navbar/Navbar';
import NavbarNotAuth from './Navbar/NavbarNotAuth';
import Logo from './Logo';

import { useAppSelector } from '../redux-hooks';
import { memo, useEffect, useState } from 'react';

export default memo(function Header() {
   const user = useAppSelector(state => state.auth.user);

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
