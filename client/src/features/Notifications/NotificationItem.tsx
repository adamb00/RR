import { useParams } from 'react-router-dom';
import { formatDate } from '../../utils/helpers';

import { useAppSelector } from '../../redux-hooks';
import { useEffect, useState } from 'react';

export default function NotificationItem() {
   const { id } = useParams();
   const lang = localStorage.getItem('i18nextLng') as string;
   const [createdAt, setCreatedAt] = useState<string | undefined>(undefined);
   const notifications = useAppSelector(state =>
      state.auth.user?.notifications.find(notification => notification._id === id)
   );

   useEffect(() => {
      if (notifications && notifications.created_at) {
         setCreatedAt(formatDate(new Date(notifications.created_at).toString(), lang));
      }
   }, [lang, notifications]);

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
               <div className='notifications__created--at'>{createdAt}</div>
            </div>
         </div>
      </div>
   );
}
