import { closeMenu } from '../../utils/helpers';
import NavigationLinkMobile from './NavigationLinkMobile';
import SignOut from '../../features/Auth/SignOut';
import { useAppSelector } from '../../redux-hooks';

export default function Navigation() {
   const isAdmin = useAppSelector(state => state.auth.user?.role === 'Admin');

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
                     Home
                  </NavigationLinkMobile>
               </li>
               <li className='navigation__item'>
                  <NavigationLinkMobile to='/my-links' onClick={closeMenu}>
                     Links
                  </NavigationLinkMobile>
               </li>
               <li className='navigation__item'>
                  {isAdmin ? (
                     <NavigationLinkMobile onClick={closeMenu} to='/account/edit-links'>
                        Account
                     </NavigationLinkMobile>
                  ) : (
                     <NavigationLinkMobile onClick={closeMenu} to='/account/personal'>
                        Account
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
}
