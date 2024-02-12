import ButtonIcon from '../Buttons/ButtonIcon';
import NavigationLink from '../Navigation/NavigationLink';
import { CiBellOn, CiLock, CiMenuKebab } from 'react-icons/ci';

export default function AdminMenuIsNotOpen() {
   return (
      <ul className='account__sidebar--navigation__not-open'>
         <li>
            <NavigationLink to='edit-links' className='account__sidebar--navigation-link__not-open'>
               <ButtonIcon className='account__sidebar--icon__not-open' onClick={() => {}}>
                  <CiMenuKebab />
               </ButtonIcon>
            </NavigationLink>
         </li>
         <li>
            <NavigationLink to='notifications' className='account__sidebar--navigation-link__not-open'>
               <ButtonIcon className='account__sidebar--icon__not-open' onClick={() => {}}>
                  <CiBellOn />
               </ButtonIcon>
            </NavigationLink>
         </li>

         <li>
            <NavigationLink to='security' className='account__sidebar--navigation-link__not-open'>
               <ButtonIcon className='account__sidebar--icon__not-open' onClick={() => {}}>
                  <CiLock />
               </ButtonIcon>
            </NavigationLink>
         </li>
      </ul>
   );
}
