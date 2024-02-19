import { closeMenu } from '../../utils/helpers';
import NavigationLinkMobile from './NavigationLinkMobile';
import SignOut from '../../features/Auth/SignOut';
import { memo } from 'react';
import { useSelector } from 'react-redux';
import { selectIsAdmin } from '../../features/Auth/slices/auth/authSlice';
import { useTranslation } from 'react-i18next';

export default memo(function Navigation() {
   const isAdmin = useSelector(selectIsAdmin);
   const { t } = useTranslation();

   return (
      <div className='navigation'>
         <input type='checkbox' name='' id='navi-toggle' className='navigation__checkbox' />
         <label htmlFor='navi-toggle' className='navigation__button'>
            <span className='navigation__icon'>&nbsp;</span>
         </label>
         <div className='navigation__background'>&nbsp;</div>
         <div className='navigation__nav'>
            <ul className='navigation__list'>
               <li className='navigation__item'>
                  <NavigationLinkMobile to='/' onClick={closeMenu}>
                     {t('Home')}
                  </NavigationLinkMobile>
               </li>
               <li className='navigation__item'>
                  <NavigationLinkMobile to='/my-links' onClick={closeMenu}>
                     {t('Links')}
                  </NavigationLinkMobile>
               </li>
               <li className='navigation__item'>
                  {isAdmin ? (
                     <NavigationLinkMobile onClick={closeMenu} to='/account/edit-links'>
                        {t('Account')}
                     </NavigationLinkMobile>
                  ) : (
                     <NavigationLinkMobile onClick={closeMenu} to='/account/personal'>
                        {t('Account')}
                     </NavigationLinkMobile>
                  )}
               </li>
               <li className='navigation__item'>
                  <SignOut />
               </li>
            </ul>
         </div>
      </div>
   );
});
