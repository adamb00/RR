import Menu from '@/ui/Menu/Menu';
import { Outlet } from 'react-router-dom';

import RestrictedRoute from '@/ui/RestrictedRoute';
import { selectCurrentUser } from '@/features/Auth/slices/auth/authSlice';
import { useSelector } from 'react-redux';
import { useIsNotification } from '@/hooks/useIsNotification';
import NotificationsMenu from '@/ui/Menu/NotificationsMenu';

export default function Account() {
   const user = useSelector(selectCurrentUser);
   const { isNotification } = useIsNotification();

   if (!user) return <RestrictedRoute />;

   return (
      <div className='account'>
         {isNotification ? <NotificationsMenu /> : <Menu />}
         <Outlet />
      </div>
   );
}
