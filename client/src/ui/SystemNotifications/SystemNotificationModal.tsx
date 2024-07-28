import { deleteSystemNotifications, selectCurrentUser } from '@/features/Auth/slices/auth/authSlice';
import ISystemNotifications from '@/interfaces/ISystemNotifications';
import { useDispatch, useSelector } from 'react-redux';
import SystemNotificationItem from './SystemNotificationItem';
import { useTranslation } from 'react-i18next';
import { Dispatch, SetStateAction } from 'react';
import { useDeleteSystemNotificationsMutation } from '@/features/Auth/slices/user/userApiSlice';

interface SystemNotificationModalProps {
   setShowModal: Dispatch<SetStateAction<boolean>>;
}

export default function SystemNotificationModal({ setShowModal }: SystemNotificationModalProps) {
   const { systemNotifications } = useSelector(selectCurrentUser);
   const [deleteSystemNotificationsAPI] = useDeleteSystemNotificationsMutation();
   const dispatch = useDispatch();
   const { t } = useTranslation();

   const handleOnClick = async () => {
      await deleteSystemNotificationsAPI({}).unwrap();
      dispatch(deleteSystemNotifications());
      setShowModal(false);
   };

   return (
      <div className='system-notifications__modal'>
         <div className='system-notifications__content'>
            {systemNotifications.length !== 0 ? (
               <>
                  <div className='system-notifications__header'>
                     <span onClick={() => handleOnClick()} className='system-notifications__clear'>
                        {t('Clear')}
                     </span>
                  </div>
                  {systemNotifications.map((notification: ISystemNotifications, index: number) => (
                     <SystemNotificationItem notification={notification} key={index} />
                  ))}
               </>
            ) : (
               <p>{t('Currently you have no notification')}</p>
            )}
         </div>
      </div>
   );
}
