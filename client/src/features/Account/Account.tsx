import { useState } from 'react';

import Menu from '@/ui/Menu/Menu';
import { Outlet } from 'react-router-dom';

import AdminMenu from '@/ui/Menu/AdminMenu';
import RestrictedRoute from '@/ui/RestrictedRoute';
import { selectCurrentUser, selectIsAdmin } from '@/features/Auth/slices/auth/authSlice';
import { useSelector } from 'react-redux';

export default function Account() {
   const [isOpen, setIsOpen] = useState<boolean>(true);
   const isAdmin = useSelector(selectIsAdmin);
   const user = useSelector(selectCurrentUser);

   if (!user) return <RestrictedRoute />;

   return (
      <div className={`account ${isOpen ? '' : 'account__closed'}`}>
         {isAdmin ? (
            <AdminMenu isOpen={isOpen} setIsOpen={setIsOpen} />
         ) : (
            <Menu isOpen={isOpen} setIsOpen={setIsOpen} />
         )}
         <div className='account__body'>
            <Outlet />
         </div>
      </div>
   );
}
