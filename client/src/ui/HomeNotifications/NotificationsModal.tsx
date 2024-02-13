import { Dispatch, SetStateAction } from 'react';
import NotificationsItem from './NotificationsItem';
import INotification from '../../interfaces/INotification';

import { useAppDispatch, useAppSelector } from '../../redux-hooks';
import { deleteAllNotifications, markAllNotificationAsRead } from '../../features/Auth/slices/user/userSlice';
import {
   useDeleteAllNotificationsMutation,
   useMarkAllNotificationsMutation,
} from '../../features/Auth/slices/user/userApiSlice';

interface NotificationsProps {
   setShowModal: Dispatch<SetStateAction<boolean>>;
}

export default function NotificationsModal({ setShowModal }: NotificationsProps) {
   const notifications = useAppSelector(state => state.user.notifications);
   const [markAllNotifications] = useMarkAllNotificationsMutation();
   const [deleteAllNotificationsApi] = useDeleteAllNotificationsMutation();
   const dispatch = useAppDispatch();

   const handleOnClick = async () => {
      const res = await markAllNotifications({}).unwrap();
      dispatch(markAllNotificationAsRead({ ...res }));
      setShowModal(false);
   };

   const handleOnClear = async () => {
      await deleteAllNotificationsApi({}).unwrap();
      dispatch(deleteAllNotifications());
      setShowModal(false);
   };

   return (
      <div className='notifications__modal'>
         <div className='notifications__modal--overlay'></div>
         <div className='notifications__modal--content'>
            {notifications.length > 0 ? (
               <>
                  <span className='notifications__modal--clear' onClick={handleOnClear}>
                     Clear
                  </span>
                  <span className='notifications__modal--mark' onClick={handleOnClick}>
                     Mark all as read
                  </span>
               </>
            ) : (
               <span className='notifications__modal--empty'>No notifications currently</span>
            )}

            {notifications.map((notification: INotification) => (
               <NotificationsItem key={notification._id} notification={notification} setShowModal={setShowModal} />
            ))}
         </div>
      </div>
   );
}
