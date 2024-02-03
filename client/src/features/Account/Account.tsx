import { useState } from 'react';

import Menu from '../../ui/Menu/Menu';
import { Outlet } from 'react-router-dom';

import AdminMenu from '../../ui/Menu/AdminMenu';
import { useAppSelector } from '../../redux-hooks';

export default function Account() {
   const [isOpen, setIsOpen] = useState<boolean>(true);
   const isAdmin = useAppSelector(state => state.auth.user?.role === 'Admin');

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
