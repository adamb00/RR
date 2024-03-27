import { useOutsideClick } from '@/hooks/useOutsideClick';
import { Dispatch, SetStateAction } from 'react';

interface SettingsModalProps {
   setSettingsIsOpen: Dispatch<SetStateAction<boolean>>;
}

export default function SettingsModal({ setSettingsIsOpen }: SettingsModalProps) {
   const handleCloseModal = () => setSettingsIsOpen(open => !open);
   const ref = useOutsideClick(handleCloseModal);
   return (
      <div className='overylay'>
         <div className='settings-modal' ref={ref}>
            <div className='close' onClick={handleCloseModal}>
               &#10005;
            </div>
         </div>
      </div>
   );
}
