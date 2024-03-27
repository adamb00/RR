import LinkImage from '@/ui/LinkImage';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { IoChevronDown, IoChevronUp } from 'react-icons/io5';
import { truncateText } from '@/utils/helpers';
import useDetectOrientation from '@/hooks/useDetectOrientation';
import { ILink } from '@/interfaces/ILink';
import { Dispatch, SetStateAction, useState } from 'react';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import Icon from '@/ui/Icon';
import { CiSettings } from 'react-icons/ci';

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
   const [settingsIsOpen, setSettingsIsOpen] = useState(false);
   const handleOpenSettings = () => {
      setSettingsIsOpen(isOpen => !isOpen);
   };

   const ref = useOutsideClick(handleOpenSettings);
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
            <div className='links__image-container'>
               {link.image && <LinkImage link={link} className='links__image' />}
            </div>
            <div className='links__body'>
               <div className={`links__wrapper--container `}>
                  <div className='links__wrapper--group'>
                     <div className='links__item'>{handleIfLinkHasTitle()}</div>
                     <div className='links__item--link'>{handlePhoneView(`(${updatedLink})`, 60)}</div>
                  </div>

                  <div className='links__group'>
                     <CopyToClipboard text={updatedLink}>
                        <Icon className='links__icon links__icon--settings' onClick={handleOpenSettings}>
                           <CiSettings />
                        </Icon>
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
                     className='links__description'
                     aria-multiline
                     style={{ whiteSpace: 'pre-line' }}
                     dangerouslySetInnerHTML={link && { __html: link.description }}
                  ></div>
               )}
            </div>
            {settingsIsOpen && (
               <div className='links__settings-modal' ref={ref}>
                  <span className='links__settings-modal--item' onClick={handleOpenModal}>
                     Share link
                  </span>
                  <span className='links__settings-modal--item' onClick={handleOpenSettings}>
                     Edit title
                  </span>
               </div>
            )}
         </>
      )
   );
}
