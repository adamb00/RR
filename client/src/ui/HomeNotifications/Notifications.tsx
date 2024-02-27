import { memo, useState } from 'react';

import ButtonIcon from '../Buttons/ButtonIcon';
import { CiBellOn } from 'react-icons/ci';
import NotificationsModal from './NotificationsModal';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import { useSelector } from 'react-redux';
import { selectUnreadNotifications } from '../../features/Auth/slices/auth/authSlice';

export default memo(function Notifications() {
   const [showModal, setShowModal] = useState(false);
   const unreadNotifications = useSelector(selectUnreadNotifications);

   const handleOnClick = () => {
      setShowModal(prev => !prev);
   };

   const handleCloseModal = () => {
      setShowModal(false);
   };
   const ref = useOutsideClick(handleCloseModal);

   return (
      <div ref={ref}>
         <ButtonIcon
            onClick={handleOnClick}
            className={`notifications__icon ${unreadNotifications > 0 ? 'shake' : ''}`}
         >
            <CiBellOn />
            {unreadNotifications > 0 && <span className='notifications__indicator'>{unreadNotifications}</span>}
         </ButtonIcon>
         {showModal && <NotificationsModal setShowModal={setShowModal} />}
      </div>
   );
});
