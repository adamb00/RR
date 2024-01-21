import { useAuth } from '../context/AuthContext';
import Navbar from './Navbar';
import NavbarNotAuth from './NavbarNotAuth';
import LogoImage from '../../assets/logo.png';

export default function Header() {
   const { user } = useAuth();

   return (
      <header className='header'>
         <div className='header-icon'>
            <img src={LogoImage} className='header-icon__image' />
         </div>
         {user ? <Navbar /> : <NavbarNotAuth />}
      </header>
   );
}
