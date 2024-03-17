//
import LinkImage from '../../../ui/LinkImage';
import CopyToClipboard from 'react-copy-to-clipboard';
import ButtonIcon from '../../../ui/Buttons/ButtonIcon';
import { PiDotsThree } from 'react-icons/pi';
import { IoChevronDown, IoChevronUp } from 'react-icons/io5';
import { truncateText } from '../../../utils/helpers';
import useDetectOrientation from '../../../hooks/useDetectOrientation';
import { ILink } from '../../../interfaces/ILink';
import { Dispatch, SetStateAction } from 'react';

interface LinkHasNoPreviewProps {
   link: ILink;
   device: string;
   setIsOpenDropdown: Dispatch<SetStateAction<boolean>>;
   isOpenDropdown: boolean;
   updatedLink: string;

   handleOpenModal: () => void;
}

export default function LinkHasNoPreview({
   link,
   device,
   setIsOpenDropdown,
   updatedLink,
   handleOpenModal,
   isOpenDropdown,
}: LinkHasNoPreviewProps) {
   const currentLinkTitle = () => link.title ?? '';
   const orientation = useDetectOrientation();

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

   const handleIfLinkHasTitle = () => {
      return currentLinkTitle() ? currentLinkTitle() : device === 'Mobile' ? handlePhoneView(link.link) : link.link;
   };
   const handleOpenDropdown = () => {
      setIsOpenDropdown((open: boolean) => !open);
   };
   return (
      !link.isPreview && (
         <>
            <div className='my-link__image-container'>
               {link.image && <LinkImage link={link} className='my-link__image' />}
            </div>
            <div className='my-link__body'>
               <div className={`my-link__wrapper--container `}>
                  <div className='my-link__wrapper--group'>
                     <div className='my-link__item'>{handleIfLinkHasTitle()}</div>
                     <div className='my-link__item--link'>{handlePhoneView(`(${updatedLink})`, 60)}</div>
                  </div>

                  <div className='my-link__group'>
                     <CopyToClipboard text={updatedLink}>
                        <ButtonIcon className='my-link__icon' onClick={handleOpenModal}>
                           <PiDotsThree />
                        </ButtonIcon>
                     </CopyToClipboard>
                     {link.description &&
                        (isOpenDropdown ? (
                           <IoChevronUp className='link__chevron' onClick={handleOpenDropdown} />
                        ) : (
                           <IoChevronDown className='link__chevron' onClick={handleOpenDropdown} />
                        ))}
                  </div>
               </div>
               {link.description && isOpenDropdown && (
                  <div
                     className='my-link__description'
                     aria-multiline
                     style={{ whiteSpace: 'pre-line' }}
                     dangerouslySetInnerHTML={link && { __html: link.description }}
                  ></div>
               )}
            </div>
         </>
      )
   );
}
