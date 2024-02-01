import { useParams } from 'react-router-dom';
import { formatDate } from '../../utils/helpers';
import Loader from '../../ui/Loader';
import { useGetNotification } from './useNotifications';

export default function NotificationItem() {
   const { id } = useParams();

   const { notifications, isLoading } = useGetNotification(id as string);

   if (isLoading || !notifications) return <Loader className='notifications__loader' size={250} />;

   const createdAt = new Date(notifications.created_at).toString();
   const messageWithNewline = notifications.message?.replace(/<br>/g, '\n') || '';

   return (
      <div className='notifications__container'>
         <h1 className='notifications__title'>{notifications.title}</h1>
         <div className='notifications__wrapper'>
            <div aria-multiline className='notifications__message' style={{ whiteSpace: 'pre-line' }}>
               {messageWithNewline}
            </div>

            <div className='notifications__created'>
               <div className='notifications__created--by'>{notifications.created_by}</div>
               <div className='notifications__created--at'>{formatDate(createdAt)}</div>
            </div>
         </div>
      </div>
   );
}
