import { ILink } from '../../interfaces/ILink';
import { CiMedicalClipboard } from 'react-icons/ci';
import ButtonIcon from '../../ui/ButtonIcon';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useAuth } from '../../context/AuthContext';
import { useDeleteOneLink } from './useLinks';
import { useDrag } from 'react-dnd';
interface LinkItemProps {
   link: ILink;
   isMobile: boolean;
}
export default function LinkItem({ link, isMobile }: LinkItemProps) {
   const { user } = useAuth();
   const { isDeleting, deleteLink } = useDeleteOneLink();

   const isAdmin = user?.role === 'Admin';

   const [{ isDragging }, drag] = useDrag(() => ({
      type: 'BOX',
      item: { id: link._id },
      collect: monitor => ({
         isDragging: monitor.isDragging(),
      }),
   }));

   const handleCopy = () => {
      console.log('copied');
   };

   const handleRemove = () => {
      deleteLink(link._id);
   };

   return (
      <div className='links__wrapper' ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
         <div className='links__item'>{link.link}</div>
         <CopyToClipboard text={link.link}>
            <ButtonIcon onClick={handleCopy} className='links__icon'>
               <CiMedicalClipboard />
            </ButtonIcon>
         </CopyToClipboard>

         {isAdmin && isMobile && (
            <ButtonIcon onClick={handleRemove} disabled={isDeleting} className='links__icon links__icon--remove'>
               &#10005;
            </ButtonIcon>
         )}
      </div>
   );
}
