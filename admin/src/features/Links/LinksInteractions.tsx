import Switch from 'react-switch';
import Icon from '@/ui/Icon';
import { ILink } from '@/interfaces/ILink';
import { Dispatch, SetStateAction } from 'react';
import { useLinks } from '@/contexts/LinkContext';
import { useActivateLinkMutation, useDeleteLinkMutation } from '@/features/Links/linkApiSlice';

interface LinksInteractionsProps {
   link: ILink;
   isChecked: boolean;
   setIsChecked: Dispatch<SetStateAction<boolean>>;
}

export default function LinksInteractions({ link, isChecked, setIsChecked }: LinksInteractionsProps) {
   const { updateLink, removeLink } = useLinks();
   const [removeLinkAPI] = useDeleteLinkMutation();
   const [activateLinkApi] = useActivateLinkMutation();

   const handleOnChange = async () => {
      setIsChecked(!isChecked);
      console.log(link._id);
      const res = await activateLinkApi({ id: link._id, data: { active: !isChecked } }).unwrap();
      console.log(res);
      updateLink(res.doc);
   };

   const handleOnDelete = async () => {
      removeLink(link._id);
      await removeLinkAPI(link._id);
      setIsChecked(false);
   };
   return (
      <div className='links__group'>
         <Switch
            onChange={handleOnChange}
            checked={isChecked}
            offColor='#ed535b'
            onColor='#80e9ca'
            uncheckedIcon={false}
            checkedIcon={false}
            boxShadow='0px 1px 5px rgba(0, 0, 0, 0.6)'
            activeBoxShadow='0px 0px 1px 10px rgba(0, 0, 0, 0.2)'
            className='links__switch'
         />
         {/* <CopyToClipboard text={link.link}>
            <ButtonIcon onClick={() => {}} className='links__icon'>
               <CiMedicalClipboard />
            </ButtonIcon>
         </CopyToClipboard> */}

         <Icon onClick={handleOnDelete} className='links__icon links__icon--remove'>
            &#10005;
         </Icon>
      </div>
   );
}
