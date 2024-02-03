import { useState } from 'react';

import ButtonIcon from '../Buttons/ButtonIcon';
import { CiBellOn } from 'react-icons/ci';
import NotificationsModal from './NotificationsModal';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import INotification from '../../interfaces/INotification';
import { useAppSelector } from '../../redux-hooks';

export default function Notifications() {
   const user = useAppSelector(state => state.auth.user);

   const [showModal, setShowModal] = useState(false);

   const unreadNotifications: number =
      user?.notifications.filter((notification: INotification): boolean => !notification.read)?.length || 0;

   const handleOnClick = () => {
      setShowModal(prev => !prev);
   };

   const handleCloseModal = () => {
      setShowModal(false);
   };
   const ref = useOutsideClick(handleCloseModal);

   return (
      <div ref={ref}>
         <ButtonIcon onClick={handleOnClick} className='notifications__icon'>
            <CiBellOn />
            {unreadNotifications > 0 && <span className='notifications__indicator'>{unreadNotifications}</span>}
         </ButtonIcon>
         {showModal && <NotificationsModal setShowModal={setShowModal} />}
      </div>
   );
}
