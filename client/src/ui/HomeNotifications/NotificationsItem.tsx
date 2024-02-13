import { useNavigate } from 'react-router-dom';
import INotification from '../../interfaces/INotification';
import { stripHtmlTags, truncateText } from '../../utils/helpers';
import { Dispatch, SetStateAction } from 'react';
import { useMarkOneNotificationAsRead } from '../../hooks/useMarkOneNotificationAsRead.ts';

interface NotificationItemProps {
   notification: INotification;
   setShowModal: Dispatch<SetStateAction<boolean>>;
}

export default function NotificationsItem({ notification, setShowModal }: NotificationItemProps) {
   const navigation = useNavigate();
   const { read, _id, title, message } = notification;

   const handleOnMarkOneNotificationAsRead = useMarkOneNotificationAsRead(_id);

   const handleOnClick = () => {
      try {
         if (!read) handleOnMarkOneNotificationAsRead();
         navigation(`/account/notifications/${_id}`);
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
