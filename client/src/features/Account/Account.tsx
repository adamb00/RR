import { useState } from 'react';

import Menu from '../../ui/Menu/Menu';
import { Outlet } from 'react-router-dom';

import AdminMenu from '../../ui/Menu/AdminMenu';
import { useAppSelector } from '../../redux-hooks';
import RestrictedRoute from '../../ui/RestrictedRoute';
import Loader from '../../ui/Loader';

export default function Account() {
   const [isOpen, setIsOpen] = useState<boolean>(true);
   const isAdmin = useAppSelector(state => state.auth.user?.role === 'Admin');
   const user = useAppSelector(state => !!state.auth.user);
   const isLoading = useAppSelector(state => state.auth.isLoading);

   if (isLoading)
      return (
         <div className='main'>
            <Loader size={250} />;
         </div>
      );

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
