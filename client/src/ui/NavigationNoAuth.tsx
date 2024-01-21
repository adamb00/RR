import { useNavigate } from 'react-router-dom';
import Button from './Button';
import NavigationLinkMobile from './NavigationLinkMobile';
import { closeMenu } from '../utils/helpers';

export default function NavigationNoAuth() {
   const navigate = useNavigate();

   const handleNavigateToLogin = () => {
      navigate('/signin');
      closeMenu();
   };

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
                  <NavigationLinkMobile to='/about' onClick={closeMenu}>
                     About
                  </NavigationLinkMobile>
               </li>
               <li className='navigation__item'>
                  <Button className='btn btn--primary' onClick={handleNavigateToLogin}>
                     Log in
                  </Button>
               </li>
            </ul>
         </div>
      </div>
   );
}
