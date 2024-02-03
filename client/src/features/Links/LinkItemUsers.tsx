import { ILink } from '../../interfaces/ILink';
import { PiDotsThree } from 'react-icons/pi';
import ButtonIcon from '../../ui/Buttons/ButtonIcon';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import useDetectOrientation from '../../hooks/useDetectOrientation';
import { truncateText } from '../../utils/helpers';

import { useAppSelector } from '../../redux-hooks';

interface LinkItemProps {
   link: ILink;
   device: string;
}
export default function LinkItem({ link, device }: LinkItemProps) {
   const orientation = useDetectOrientation();
   const user = useAppSelector(state => state.auth.user);

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

   if (!link.active) return;

   return (
      <div className='links__container'>
         <div className='links__wrapper'>
            <div className='links__wrapper--group'>
               <div className='links__item'>{handleIfLinkHasTitle()}</div>
               <div className='links__item--link'>{handlePhoneView(`(${updatedLink})`, 60)}</div>
            </div>

            <div className='links__group'>
               <CopyToClipboard text={updatedLink}>
                  <ButtonIcon onClick={() => {}} className='links__icon'>
                     <PiDotsThree />
                  </ButtonIcon>
               </CopyToClipboard>
            </div>
         </div>
      </div>
   );
}
