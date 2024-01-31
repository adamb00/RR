import { useNavigate } from 'react-router-dom';
import Button from '../Buttons/Button';
import NavigationLinkMobile from './NavigationLinkMobile';
import { closeMenu } from '../../utils/helpers';

export default function NavigationNoAuth() {
   const navigate = useNavigate();

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
                     Home
                  </NavigationLinkMobile>
               </li>
               <li className='navigation__item'>
                  <NavigationLinkMobile to='/about' onClick={closeMenu}>
                     About us
                  </NavigationLinkMobile>
               </li>
               <li>
                  <NavigationLinkMobile to='/affiliate' onClick={closeMenu}>
                     Affiliate
                  </NavigationLinkMobile>
               </li>
               <li>
                  <NavigationLinkMobile to='/faq' onClick={closeMenu}>
                     FAQ
                  </NavigationLinkMobile>
               </li>
               <li>
                  <NavigationLinkMobile to='/contact' onClick={closeMenu}>
                     Contact us
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
