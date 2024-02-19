import { ILink } from '../../interfaces/ILink';
import { PiDotsThree } from 'react-icons/pi';
import ButtonIcon from '../../ui/Buttons/ButtonIcon';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import useDetectOrientation from '../../hooks/useDetectOrientation';
import { truncateText } from '../../utils/helpers';

import { UserProfileData } from '../../interfaces/AuthInterfaces';
import { Dispatch, SetStateAction } from 'react';

interface LinkItemProps {
   link: ILink;
   device: string;
   user: UserProfileData | null;
   setIsOpen?: Dispatch<SetStateAction<boolean>>;
   setUrl?: Dispatch<SetStateAction<string>>;
}
export default function LinkItem({ link, device, user, setIsOpen, setUrl }: LinkItemProps) {
   const orientation = useDetectOrientation();

   const currentLinkTitle = () => link.title ?? '';

   const updatedLink = `${link.link}/${user?.referralCode}`;

   const handleIfLinkHasTitle = () => {
      return currentLinkTitle() ? currentLinkTitle() : device === 'Mobile' ? handlePhoneView(link.link) : link.link;
   };

   const handlePhoneView = (text: string, phoneLength = 40) => {
      let view = text;
      if (device === 'Mobile' && orientation === 'landscape') {
         view = truncateText(text, 65);
      }
      if (device === 'Mobile' && orientation === 'portrait') {
         view = truncateText(text, phoneLength);
      }

      return view;
   };

   const handleOpenModal = () => {
      if (setIsOpen) setIsOpen(open => !open);
      if (setUrl) setUrl(() => updatedLink);
   };

   if (!link.active) return;

   return (
      <div className='link__links'>
         <div className='link__wrapper'>
            <div className='link__wrapper--group'>
               <div className='link__item'>{handleIfLinkHasTitle()}</div>
               <div className='link__item--link'>{handlePhoneView(`(${updatedLink})`, 60)}</div>
            </div>

            <div className='link__group'>
               <CopyToClipboard text={updatedLink}>
                  <ButtonIcon className='link__icon' onClick={handleOpenModal}>
                     <PiDotsThree />
                  </ButtonIcon>
               </CopyToClipboard>
            </div>
         </div>
      </div>
   );
}
