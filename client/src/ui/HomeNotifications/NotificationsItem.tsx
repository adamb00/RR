import { useNavigate } from 'react-router-dom';
import INotification from '../../interfaces/INotification';
import { stripHtmlTags, truncateText } from '../../utils/helpers';
import { markNotificationAsRead } from '../../features/Auth/slices/user/userSlice.ts';
import { Dispatch, SetStateAction } from 'react';
import { useAppDispatch } from '../../redux-hooks';
import { useMarkNotificationMutation } from '../../features/Auth/slices/user/userApiSlice.ts';

interface NotificationItemProps {
   notification: INotification;
   setShowModal: Dispatch<SetStateAction<boolean>>;
}

export default function NotificationsItem({ notification, setShowModal }: NotificationItemProps) {
   const navigation = useNavigate();
   const dispatch = useAppDispatch();
   const [markNotificationApi] = useMarkNotificationMutation();
   const { read, _id, title, message } = notification;

   const handleOnClick = async () => {
      try {
         const res = await markNotificationApi({ id: _id }).unwrap();
         dispatch(markNotificationAsRead({ ...res }));
         navigation(`/account/notifications/${_id}`);
      } catch (err) {
         console.log(err);
      } finally {
         setShowModal(false);
      }
   };

   const plainText = stripHtmlTags(message);
   const truncatedMessage = truncateText(plainText, 55);

   return (
      <div className={`notifications__modal--wrapper ${read && 'read'}`} onClick={handleOnClick}>
         <p className='notifications__modal--title'>{truncateText(title, 28)}</p>
         <p className='notifications__modal--message'>{truncatedMessage}</p>
      </div>
   );
}
