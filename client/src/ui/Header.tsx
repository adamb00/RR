import { useAuth } from '../context/AuthContext';
import Navbar from './Navbar/Navbar';
import NavbarNotAuth from './Navbar/NavbarNotAuth';
import Logo from './Logo';

export default function Header() {
   const { user } = useAuth();

   return (
      <header className='header'>
         <Logo />
         {user ? <Navbar /> : <NavbarNotAuth />}
      </header>
   );
}
