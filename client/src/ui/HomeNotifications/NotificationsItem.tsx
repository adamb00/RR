import { useNavigate } from 'react-router-dom';
import INotification from '../../interfaces/INotification';
import { stripHtmlTags, truncateText } from '../../utils/helpers';
import { useMarkNotification } from '../../features/Auth/useUserAuth';
import { Dispatch, SetStateAction } from 'react';

interface NotificationItemProps {
   notification: INotification;
   setShowModal: Dispatch<SetStateAction<boolean>>;
}

export default function NotificationsItem({ notification, setShowModal }: NotificationItemProps) {
   const { message, read, title, _id } = notification;
   const { updateOneNotification } = useMarkNotification();
   const navigation = useNavigate();

   const handleOnClick = () => {
      navigation(`/account/notifications/${_id}`);
      updateOneNotification(_id);
      setShowModal(false);
   };

   const plainText = stripHtmlTags(message);
   const truncatedMessage = truncateText(plainText, 55);

   console.log(truncatedMessage);
   return (
      <div className={`notifications__modal--wrapper ${read && 'read'}`} onClick={handleOnClick}>
         <p className='notifications__modal--title'>{truncateText(title, 28)}</p>
         <p className='notifications__modal--message'>{truncatedMessage}</p>
      </div>
   );
}
