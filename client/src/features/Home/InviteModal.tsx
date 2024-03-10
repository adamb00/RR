import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import { QRCode } from 'react-qrcode-logo';
import { useTheme } from '../../context/ThemeContext';
import Button from '../../ui/Buttons/Button';
import ShareModal from '../../ui/ShareModal';

interface InviteModalProps {
   setInviteModalOpen: Dispatch<SetStateAction<boolean>>;
   qrOptions?: object;
   url: string;
}
export default function InviteModal({ setInviteModalOpen, qrOptions, url }: InviteModalProps) {
   const handleCloseModal = () => setInviteModalOpen(open => !open);
   const ref = useOutsideClick(handleCloseModal);
   const [mode, setMode] = useState('');
   const { theme } = useTheme();
   const [shareModal, setShareModal] = useState(false);

   useEffect(() => {
      setMode(theme);
   }, [theme]);

   const defaultOptions = {
      size: 250,
      quietZone: 15,
      bgColor: mode === 'light' ? '#eeeeee' : '#6d6d6d',
      fgColor: mode === 'light' ? 'rgb(237, 83, 91)' : ' rgb(192, 244, 229)',
      logoWidth: 100,
      logoHeight: 100,
   };
   const options = { ...defaultOptions, ...qrOptions };

   if (shareModal) {
      return <ShareModal url={url} isOpen={shareModal} setIsOpen={setShareModal} setOutterModal={setInviteModalOpen} />;
   }

   return (
      <div className='overlay'>
         <div className='invite-modal' ref={ref}>
            <div className='close' onClick={handleCloseModal}>
               &#10005;
            </div>
            <h1 className='heading-primary'>Invite your friends now!</h1>
            <h2 className='heading-secondary'>
               You can invite your friends and <br /> grow your team by the QR code or sending an invitation link.
            </h2>
            <div className='invite-modal__qr'>
               <QRCode value={url} {...options} />
            </div>

            <Button
               className='btn btn--tertiary'
               onClick={() => {
                  setShareModal(true);
               }}
            >
               Send Invite Link
            </Button>
         </div>
      </div>
   );
}
