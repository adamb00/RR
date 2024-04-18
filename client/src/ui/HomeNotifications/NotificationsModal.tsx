import { Dispatch, SetStateAction } from 'react';
import NotificationsItem from './NotificationsItem';
import INotification from '@/interfaces/INotification';
import {
   useDeleteAllNotificationsMutation,
   useMarkAllNotificationsMutation,
} from '@/features/Auth/slices/user/userApiSlice';
import { useTranslation } from 'react-i18next';
import { deleteAllNotifications, markAllNotificationAsRead } from '@/features/Auth/slices/auth/authSlice';
import { useDispatch } from 'react-redux';
import Loader from '../Loader';
import { useAppSelector } from '@/redux-hooks';

interface NotificationsProps {
   setShowModal: Dispatch<SetStateAction<boolean>>;
}

export default function NotificationsModal({ setShowModal }: NotificationsProps) {
   const notifications = useAppSelector(state => state.auth.user?.notifications);
   const [markAllNotifications] = useMarkAllNotificationsMutation();
   const [deleteAllNotificationsApi] = useDeleteAllNotificationsMutation();
   const dispatch = useDispatch();
   const { t } = useTranslation();

   const handleOnClick = async () => {
      const res = await markAllNotifications({}).unwrap();
      console.log(res);
      dispatch(markAllNotificationAsRead({ ...res }));
      setShowModal(false);
   };

   const handleOnClear = async () => {
      await deleteAllNotificationsApi({}).unwrap();
      dispatch(deleteAllNotifications());
      setShowModal(false);
   };

   if (!notifications) return <Loader size={250} />;

   if (!notifications || notifications.length < 1) {
      return (
         <div className='notifications__modal'>
            <div className='notifications__modal--content'>
               <span className='notifications__modal--empty'>{t('No notifications currently')}</span>
            </div>
         </div>
      );
   }

   return (
      <div className='notifications__modal'>
         <div className='notifications__modal--content'>
            <div className='notifications__modal--header'>
               <span className='notifications__modal--clear' onClick={handleOnClear}>
                  {t('Clear')}
               </span>
               <span className='notifications__modal--mark' onClick={handleOnClick}>
                  {t('Mark all as read')}
               </span>
            </div>

            {notifications?.map((notification: INotification) => (
               <NotificationsItem key={notification._id} notification={notification} setShowModal={setShowModal} />
            ))}
         </div>
      </div>
   );
}
