import { useOutsideClick } from '@/hooks/useOutsideClick';
import { useState } from 'react';
import ButtonIcon from '../Buttons/ButtonIcon';
import { CiDollar } from 'react-icons/ci';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '@/features/Auth/slices/auth/authSlice';
import SystemNotificationModal from './SystemNotificationModal';

export default function SystemNotification() {
   const [showModal, setShowModal] = useState(false);
   const { systemNotifications } = useSelector(selectCurrentUser);

   const handleCloseModal = () => {
      setShowModal(false);
   };
   const handleOnClick = () => {
      setShowModal(prev => !prev);
   };
   const ref = useOutsideClick(handleCloseModal);

   return (
      <div ref={ref}>
         <ButtonIcon onClick={handleOnClick} className='system-notifications__icon'>
            <CiDollar />
            {systemNotifications.length > 0 && <span className='system-notifications__indicator'></span>}
         </ButtonIcon>
         {showModal && <SystemNotificationModal setShowModal={setShowModal} />}
      </div>
   );
}
