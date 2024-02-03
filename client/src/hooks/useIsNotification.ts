import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export const useIsNotification = () => {
   const [isNotification, setIsNotification] = useState<boolean>(false);
   const location = useLocation();

   useEffect(() => {
      const isNotification = location.pathname.includes('/account/notifications');
      setIsNotification(isNotification);
   }, [location.pathname]);

   return { isNotification };
};
