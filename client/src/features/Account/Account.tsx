import { useEffect, useState } from 'react';

import Menu from '../../ui/Menu/Menu';
import { Outlet, useLocation } from 'react-router-dom';
import NotificationsMenu from './Notifications/NotificationsMenu';
import { useAuth } from '../../context/AuthContext';

export default function Account() {
   const [isOpen, setIsOpen] = useState<boolean>(true);
   const [isNotification, setIsNotification] = useState<boolean>(false);
   const location = useLocation();
   const { isAdmin } = useAuth();

   useEffect(() => {
      const isNotification = location.pathname.includes('/account/notifications');
      setIsNotification(isNotification);
   }, [location.pathname]);

   return (
      <div className={`account ${isOpen ? '' : 'account__closed'}`}>
         {isNotification && !isAdmin ? (
            <NotificationsMenu isOpen={isOpen} setIsOpen={setIsOpen} />
         ) : (
            <Menu isOpen={isOpen} setIsOpen={setIsOpen} />
         )}
         <div className='account__body'>
            <Outlet />
         </div>
      </div>
   );
}
