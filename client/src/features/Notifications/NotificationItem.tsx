import { useParams } from 'react-router-dom';
import { formatDate } from '../../utils/helpers';

import { useAppSelector } from '../../redux-hooks';

export default function NotificationItem() {
   const { id } = useParams();
   const notifications = useAppSelector(state =>
      state.auth.user?.notifications.find(notification => notification._id === id)
   );

   let createdAt: string | undefined;
   if (notifications && notifications.created_at) {
      createdAt = new Date(notifications.created_at).toString();
   }

   return (
      <div className='notifications__container'>
         <h1 className='heading-primary'>{notifications?.title}</h1>
         <div className='notifications__wrapper'>
            <div
               aria-multiline
               className='notifications__message'
               style={{ whiteSpace: 'pre-line' }}
               dangerouslySetInnerHTML={notifications && { __html: notifications.message }}
            ></div>

            <div className='notifications__created'>
               <div className='notifications__created--by'>{notifications?.created_by}</div>
               <div className='notifications__created--at'>{createdAt && formatDate(createdAt)}</div>
            </div>
         </div>
      </div>
   );
}
