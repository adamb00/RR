import { CiBellOn, CiLock, CiUser } from 'react-icons/ci';
import ButtonIcon from '../Buttons/ButtonIcon';
import NavigationLink from '../Navigation/NavigationLink';
import { useMarkNotification } from '../../features/Auth/useUserAuth';
import { useAppSelector } from '../../redux-hooks';

export default function MenuIsNotOpen() {
   const { updateOneNotification } = useMarkNotification();
   const firstNotificationId = useAppSelector(state => state.user.notifications[0]._id);

   return (
      <>
         <ul className='account__sidebar--navigation__not-open'>
            <li>
               <NavigationLink to='personal' className='account__sidebar--navigation-link__not-open'>
                  <ButtonIcon className='account__sidebar--icon__not-open' onClick={() => {}}>
                     <CiUser />
                  </ButtonIcon>
               </NavigationLink>
            </li>
            <li>
               <NavigationLink
                  to={`${firstNotificationId && 'notifications/' + firstNotificationId}`}
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
      </>
   );
}
