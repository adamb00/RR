import { CiBellOn, CiLock, CiMenuKebab, CiUser } from 'react-icons/ci';
import ButtonIcon from '../Buttons/ButtonIcon';
import NavigationLink from '../Navigation/NavigationLink';
import { useAuth } from '../../context/AuthContext';

import { useMarkNotification } from '../../features/Auth/useUserAuth';
import { useSortedNotifications } from '../../hooks/useSortedNotifications';

export default function MenuIsNotOpen() {
   const { user, isAdmin } = useAuth();
   const { updateOneNotification } = useMarkNotification();
   const { firstNotificationId } = useSortedNotifications();

   return (
      <ul className='account__sidebar--navigation__not-open'>
         {user?.role === 'Admin' && (
            <li>
               <NavigationLink to='edit-links' className='account__sidebar--navigation-link__not-open'>
                  <ButtonIcon className='account__sidebar--icon__not-open' onClick={() => {}}>
                     <CiMenuKebab />
                  </ButtonIcon>
               </NavigationLink>
            </li>
         )}
         <li>
            <NavigationLink to='personal' className='account__sidebar--navigation-link__not-open'>
               <ButtonIcon className='account__sidebar--icon__not-open' onClick={() => {}}>
                  <CiUser />
               </ButtonIcon>
            </NavigationLink>
         </li>
         <li>
            <NavigationLink
               to={`${!isAdmin ? 'notifications/' + firstNotificationId : 'notifications'}`}
               className='account__sidebar--navigation-link__not-open'
            >
               <ButtonIcon
                  className='account__sidebar--icon__not-open'
                  onClick={() => {
                     updateOneNotification(firstNotificationId!);
                  }}
               >
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
