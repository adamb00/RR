import {
   FacebookIcon,
   FacebookMessengerIcon,
   FacebookMessengerShareButton,
   FacebookShareButton,
   TelegramIcon,
   TelegramShareButton,
   TwitterShareButton,
   WhatsappIcon,
   WhatsappShareButton,
   XIcon,
} from 'react-share';
import { MenuProps } from '../interfaces/MenuProps';
import { useOutsideClick } from '../hooks/useOutsideClick';
import ButtonIcon from './Buttons/ButtonIcon';
import { IoCopyOutline } from 'react-icons/io5';
import { useState } from 'react';
import { truncateText } from '../utils/helpers';
import CopyToClipboard from 'react-copy-to-clipboard';
import { useTranslation } from 'react-i18next';

interface ShareModalProps extends MenuProps {
   url: string;
}

export default function ShareModal({ isOpen, setIsOpen, url }: ShareModalProps) {
   const iconSize = 44;
   const [isCopied, setIsCopied] = useState(false);
   const { t } = useTranslation();

   const handleCopy = () => {
      setIsCopied(true);
      setTimeout(() => {
         setIsCopied(false);
      }, 5000);
   };
   const handleCloseModal = () => setIsOpen(open => !open);
   const ref = useOutsideClick(handleCloseModal);

   if (!isOpen) return;
   return (
      <div className='overlay'>
         <div className='sharemodal' ref={ref}>
            <div className='close' onClick={handleCloseModal}>
               &#10005;
            </div>

            <div className='sharemodal__container'>
               <h1 className='heading-primary'>{t('Share your link')}</h1>
               <h2 className='heading-secondary heading-secondary--left'>{t('Share this link via')}</h2>
               <div className='sharemodal__container__wrapper'>
                  <div className='sharemodal__container--item'>
                     <FacebookShareButton url={url}>
                        <FacebookIcon size={iconSize} round />
                     </FacebookShareButton>
                  </div>
                  <div className='sharemodal__container--item'>
                     <FacebookMessengerShareButton url={url} appId={import.meta.env.VITE_FACEBOOK_APP_ID}>
                        <FacebookMessengerIcon size={iconSize} round />
                     </FacebookMessengerShareButton>
                  </div>
                  <div className='sharemodal__container--item'>
                     <TwitterShareButton url={url}>
                        <XIcon size={iconSize} round />
                     </TwitterShareButton>
                  </div>
                  <div className='sharemodal__container--item'>
                     <TelegramShareButton url={url}>
                        <TelegramIcon size={iconSize} round />
                     </TelegramShareButton>
                  </div>
                  <div className='sharemodal__container--item'>
                     <WhatsappShareButton url={url}>
                        <WhatsappIcon size={iconSize} round />
                     </WhatsappShareButton>
                  </div>
               </div>
               <h2 className='heading-secondary heading-secondary--left'>
                  {t('Or copy link')}
                  <span className='sharemodal__container__link--copied'></span>
               </h2>
               <div className={`sharemodal__container__link ${isCopied && 'copied'}`}>
                  <div className='sharemodal__container__link--link'>{truncateText(url, 50)}</div>
                  <CopyToClipboard text={url} onCopy={handleCopy}>
                     <ButtonIcon className='sharemodal__container__link--button' disabled={isCopied}>
                        <IoCopyOutline />
                     </ButtonIcon>
                  </CopyToClipboard>
               </div>
            </div>
         </div>
      </div>
   );
}
