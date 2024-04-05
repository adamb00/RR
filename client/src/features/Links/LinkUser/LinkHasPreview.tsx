import ShareModal from '@/ui/Modals/ShareModal';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import ButtonIcon from '@/ui/Buttons/ButtonIcon';
import { PiDotsThree } from 'react-icons/pi';
import { ILink } from '@/interfaces/ILink';
import { Dispatch, SetStateAction } from 'react';
import { useGetImage } from '@/hooks/useGetImage';

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
   const { image: linkImage } = useGetImage(link);
   return (
      link.isPreview && (
         <div className='links__card'>
            <ShareModal isOpen={isOpenModal} setIsOpen={setIsOpenModal} url={link.link} />
            <div className='links__side links__side--front'>
               <img src={linkImage} alt={link.description} className='links__wrapper--image' />
            </div>
            <div className='links__side links__side--back'>
               <h1 className='heading-primary'>{link.title}</h1>
               <div className='links__group links__group--preview'>
                  <CopyToClipboard text={updatedLink}>
                     <ButtonIcon className='links__icon' onClick={handleOpenModal}>
                        <PiDotsThree />
                     </ButtonIcon>
                  </CopyToClipboard>
               </div>
               <div
                  aria-multiline
                  className='links__side--back__description'
                  style={{ whiteSpace: 'pre-line' }}
                  dangerouslySetInnerHTML={link && { __html: link.description }}
               ></div>
            </div>
         </div>
      )
   );
}
