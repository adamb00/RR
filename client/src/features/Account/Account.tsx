import { useState } from 'react';

import Menu from '@/ui/Menu/Menu';
import { Outlet } from 'react-router-dom';

import RestrictedRoute from '@/ui/RestrictedRoute';
import { selectCurrentUser } from '@/features/Auth/slices/auth/authSlice';
import { useSelector } from 'react-redux';

export default function Account() {
   const [isOpen, setIsOpen] = useState<boolean>(true);
   const user = useSelector(selectCurrentUser);

   if (!user) return <RestrictedRoute />;

   return (
      <div className={`account ${isOpen ? '' : 'account__closed'}`}>
         <Menu isOpen={isOpen} setIsOpen={setIsOpen} />

         <div className='account__body'>
            <Outlet />
         </div>
      </div>
   );
}
