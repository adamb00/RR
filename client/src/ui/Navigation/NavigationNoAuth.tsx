import { useNavigate } from 'react-router-dom';
import Button from '../Buttons/Button';
import NavigationLinkMobile from './NavigationLinkMobile';
import { closeMenu } from '../../utils/helpers';
import { useTranslation } from 'react-i18next';

export default function NavigationNoAuth() {
   const navigate = useNavigate();
   const { t } = useTranslation();

   const handleNavigateToLogin = () => {
      navigate('/signin');
      closeMenu();
   };

   return (
      <div className='navigation'>
         <label htmlFor='navi-toggle' className='navigation__button'>
            <span className='navigation__icon'>&nbsp;</span>
         </label>
         <input type='checkbox' name='' id='navi-toggle' className='navigation__checkbox' />
         <div className='navigation__background'>&nbsp;</div>
         <div className='navigation__nav'>
            <ul className='navigation__list'>
               <li className='navigation__item'>
                  <NavigationLinkMobile to='/' onClick={closeMenu}>
                     {t('Home')}
                  </NavigationLinkMobile>
               </li>
               <li className='navigation__item'>
                  <NavigationLinkMobile to='/about' onClick={closeMenu}>
                     {t('About us')}
                  </NavigationLinkMobile>
               </li>
               <li>
                  <NavigationLinkMobile to='/affiliate' onClick={closeMenu}>
                     {t('Affiliate')}
                  </NavigationLinkMobile>
               </li>
               <li>
                  <NavigationLinkMobile to='/faq' onClick={closeMenu}>
                     {t('FAQ')}
                  </NavigationLinkMobile>
               </li>
               <li>
                  <NavigationLinkMobile to='/contact' onClick={closeMenu}>
                     {t('Contact us')}
                  </NavigationLinkMobile>
               </li>
               <li className='navigation__item'>
                  <Button className='btn btn--primary' onClick={handleNavigateToLogin}>
                     {t('Log in')}
                  </Button>
               </li>
            </ul>
         </div>
      </div>
   );
}
