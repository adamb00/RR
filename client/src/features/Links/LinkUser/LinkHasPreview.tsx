import ShareModal from '../../../ui/ShareModal';
import LinkImage from '../../../ui/LinkImage';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import ButtonIcon from '../../../ui/Buttons/ButtonIcon';
import { PiDotsThree } from 'react-icons/pi';
import { ILink } from '../../../interfaces/ILink';
import { Dispatch, SetStateAction } from 'react';

interface LinkHasPreviewProps {
   link: ILink;
   isOpenModal: boolean;
   setIsOpenModal: Dispatch<SetStateAction<boolean>>;
   updatedLink: string;
   handleOpenModal: () => void;
}

export default function LinkHasPreview({
   link,
   isOpenModal,
   setIsOpenModal,
   updatedLink,
   handleOpenModal,
}: LinkHasPreviewProps) {
   return (
      link.isPreview && (
         <div className='my-link__card'>
            <ShareModal isOpen={isOpenModal} setIsOpen={setIsOpenModal} url={link.link} />
            <div className='my-link__side my-link__side--front'>
               <LinkImage link={link} className='my-link__wrapper--image' />
            </div>
            <div className='my-link__side my-link__side--back'>
               <h1 className='heading-primary'>{link.title}</h1>
               <div className='my-link__group my-link__group--preview'>
                  <CopyToClipboard text={updatedLink}>
                     <ButtonIcon className='my-link__icon' onClick={handleOpenModal}>
                        <PiDotsThree />
                     </ButtonIcon>
                  </CopyToClipboard>
               </div>
               <div
                  aria-multiline
                  className='my-link__side--back__description'
                  style={{ whiteSpace: 'pre-line' }}
                  dangerouslySetInnerHTML={link && { __html: link.description }}
               ></div>
            </div>
         </div>
      )
   );
}
