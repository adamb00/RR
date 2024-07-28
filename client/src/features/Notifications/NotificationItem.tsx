import { useParams } from 'react-router-dom';
import { formatDate } from '@/utils/helpers';

import { useAppSelector } from '@/redux-hooks';
import { useEffect, useState } from 'react';
import INotification from '@/interfaces/INotification';

export default function NotificationItem() {
   const { id } = useParams();
   const lang = localStorage.getItem('i18nextLng') as string;
   const [createdAt, setCreatedAt] = useState<string | undefined>(undefined);
   const { title, message, created_at, created_by } = useAppSelector(state => state.auth.user?.notifications)?.find(
      notification => notification._id === id
   ) as INotification;

   useEffect(() => {
      if (created_at) {
         setCreatedAt(formatDate(new Date(created_at).toString(), lang));
      }
   }, [lang, created_at]);

   return (
      <div className='notifications__container'>
         <h1 className='heading-primary'>{title}</h1>
         <div className='notifications__wrapper'>
            <div
               aria-multiline
               className='notifications__message'
               style={{ whiteSpace: 'pre-line' }}
               dangerouslySetInnerHTML={{ __html: message }}
            ></div>
            <div className='notifications__created'>
               <div className='notifications__created--by'>{created_by}</div>
               <div className='notifications__created--at'>{createdAt}</div>
            </div>
         </div>
      </div>
   );
}
