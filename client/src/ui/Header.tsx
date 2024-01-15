import { useNavigate } from 'react-router-dom';
import Button from './Button';
import NavigationLink from './NavigationLink';
import ThemeSwitcher from './ThemeSwitcher';

export default function Header() {
   const navigate = useNavigate();
   return (
      <header className='header'>
         <div className='header-icon'>Header Icon Comes Here</div>
         <nav className='header-nav'>
            <ul className='header-nav__list'>
               <NavigationLink to='/'>Home</NavigationLink>

               <NavigationLink to='about'>About</NavigationLink>

               <ThemeSwitcher />

               <Button onClick={() => navigate('/signin')} className='btn btn--primary'>
                  Login
               </Button>
            </ul>
         </nav>
      </header>
   );
}
