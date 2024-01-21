import { useLogoutUser } from '../features/Auth/useUserAuth';
import { closeMenu } from '../utils/helpers';
import Button from './Button';
import NavigationLinkMobile from './NavigationLinkMobile';

export default function Navigation() {
   const { logoutUser } = useLogoutUser();

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
                  <NavigationLinkMobile to='/account' onClick={closeMenu}>
                     Account
                  </NavigationLinkMobile>
               </li>
               <li className='navigation__item'>
                  <Button className='btn btn--primary' onClick={logoutUser}>
                     Log out
                  </Button>
               </li>
            </ul>
         </div>
      </div>
   );
}
