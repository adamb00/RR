import { useParams } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { formatDate } from '../../../utils/helpers';
import Loader from '../../../ui/Loader';

export default function NotificationItem() {
   const { id } = useParams();
   const { user } = useAuth();
   const notification = user?.notifications.find(notification => notification._id === id);

   if (!notification) return <Loader className='notifications__loader' size={250} />;

   const createdAt = new Date(notification!.created_at).toString();
   const messageWithNewline = notification?.message.replace(/<br>/g, '\n');

   return (
      <div className='notifications__container'>
         <h1 className='notifications__title'>{notification?.title}</h1>
         <div className='notifications__wrapper'>
            <div aria-multiline className='notifications__message' style={{ whiteSpace: 'pre-line' }}>
               {messageWithNewline}
            </div>

            <div className='notifications__created'>
               <div className='notifications__created--by'>{notification?.created_by}</div>
               <div className='notifications__created--at'>{formatDate(createdAt)}</div>
            </div>
         </div>
      </div>
   );
}
