import { GiWorld } from 'react-icons/gi';
import ButtonIcon from '../Buttons/ButtonIcon';
import { useState } from 'react';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import LanguageChangerModal from './LanguageChangerModal';

export default function LanguageChanger() {
   const [showModal, setShowModal] = useState(false);

   const handleOnClick = () => {
      setShowModal(prev => !prev);
   };

   const handleCloseModal = () => {
      setShowModal(false);
   };

   const ref = useOutsideClick(handleCloseModal);

   return (
      <div ref={ref}>
         <ButtonIcon onClick={handleOnClick} className='language__icon'>
            <GiWorld />
         </ButtonIcon>
         {showModal && <LanguageChangerModal setShowModal={setShowModal} />}
      </div>
   );
}
