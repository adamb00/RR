import { Dispatch, SetStateAction } from 'react';
import { useMarkNotifications } from '../../features/Auth/useUserAuth';
import NotificationsItem from './NotificationsItem';

import { useAuth } from '../../context/AuthContext';
import { UserData } from '../../interfaces/AuthInterfaces';
import { useSortedNotifications } from '../../hooks/useSortedNotifications';

interface NotificationsProps {
   setShowModal: Dispatch<SetStateAction<boolean>>;
}

export default function NotificationsModal({ setShowModal }: NotificationsProps) {
   const { updateNotifications } = useMarkNotifications();
   const { user } = useAuth();
   const { sortedNotifications } = useSortedNotifications(user as UserData);

   const handleOnClick = () => {
      updateNotifications();
      setShowModal(false);
   };

   return (
      <div className='notifications__modal'>
         <div className='notifications__modal--overlay'></div>
         <div className='notifications__modal--content'>
            <span className='notifications__modal--mark' onClick={handleOnClick}>
               Mark all as read
            </span>
            {sortedNotifications?.map(notification => (
               <NotificationsItem key={notification._id} notification={notification} setShowModal={setShowModal} />
            ))}
         </div>
      </div>
   );
}
