import { Dispatch, SetStateAction } from 'react';
import NotificationsItem from './NotificationsItem';
import INotification from '../../interfaces/INotification';

import { useAppDispatch, useAppSelector } from '../../redux-hooks';
import { deleteAllNotifications, markAllNotificationAsRead } from '../../features/Auth/slices/user/userSlice';
import {
   useDeleteAllNotificationsMutation,
   useMarkAllNotificationsMutation,
} from '../../features/Auth/slices/user/userApiSlice';
import { useTranslation } from 'react-i18next';

interface NotificationsProps {
   setShowModal: Dispatch<SetStateAction<boolean>>;
}

export default function NotificationsModal({ setShowModal }: NotificationsProps) {
   const notifications = useAppSelector(state => state.user.notifications);
   const [markAllNotifications] = useMarkAllNotificationsMutation();
   const [deleteAllNotificationsApi] = useDeleteAllNotificationsMutation();
   const dispatch = useAppDispatch();
   const { t } = useTranslation();

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
         <div className='notifications__modal--content'>
            {notifications.length > 0 ? (
               <div className='notifications__modal--header'>
                  <span className='notifications__modal--clear' onClick={handleOnClear}>
                     {t('Clear')}
                  </span>
                  <span className='notifications__modal--mark' onClick={handleOnClick}>
                     {t('Mark all as read')}
                  </span>
               </div>
            ) : (
               <span className='notifications__modal--empty'>{t('No notifications currently')}</span>
            )}

            {notifications.map((notification: INotification) => (
               <NotificationsItem key={notification._id} notification={notification} setShowModal={setShowModal} />
            ))}
         </div>
      </div>
   );
}
