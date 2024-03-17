import NavigationLink from '../Navigation/NavigationLink';
import ThemeSwitcher from '../ThemeSwitcher';
import Button from '../Buttons/Button';
import { useNavigate } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import NavigationNoAuth from '../Navigation/NavigationNoAuth';
import useDeviceDetection from '../../hooks/useDetectDevice';

import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../features/Auth/slices/auth/authSlice';
import { useTranslation } from 'react-i18next';
import LanguageChanger from '../Languages/LanguageChanger';

export default function NavbarNotAuth() {
   const device = useDeviceDetection();
   const navigate = useNavigate();
   const user = useSelector(selectCurrentUser);
   const { t } = useTranslation();
   if (device === 'Mobile')
      return (
         <nav className='header-nav'>
            <ul className='header-nav__list'>
               <li>
                  <ThemeSwitcher />
               </li>
               <li>
                  <LanguageChanger />
               </li>

               {user ? <Navigation /> : <NavigationNoAuth />}
            </ul>
         </nav>
      );
   return (
      <nav className='header-nav'>
         <ul className='header-nav__list'>
            <li>
               <NavigationLink to='/'>{t('Home')}</NavigationLink>
            </li>

            <li>
               <NavigationLink to='about'>{t('About us')}</NavigationLink>
            </li>
            <li>
               <NavigationLink to='affiliate'>{t('Affiliate')}</NavigationLink>
            </li>
            <li>
               <NavigationLink to='faq'>{t('FAQ')}</NavigationLink>
            </li>
            <li>
               <NavigationLink to='contact'>{t('Contact us')}</NavigationLink>
            </li>

            <li>
               <ThemeSwitcher />
            </li>
            <li>
               <LanguageChanger />
            </li>

            <li>
               <Button onClick={() => navigate('/signin')} className='btn btn--conic-border'>
                  {t('Login')}
               </Button>
            </li>
         </ul>
      </nav>
   );
}
