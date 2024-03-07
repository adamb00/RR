import CopyToClipboard from 'react-copy-to-clipboard';
import Switch from 'react-switch';
import ButtonIcon from '../../../ui/Buttons/ButtonIcon';
import { CiMedicalClipboard } from 'react-icons/ci';
import Icon from '../../../ui/Icon';
import { ILink } from '../../../interfaces/ILink';
import { Dispatch, SetStateAction } from 'react';
import { useLinks } from '../../../context/LinkContext';
import { useDeleteLinkMutation, useUpdateLinkMutation } from '../linkApiSlice';

interface LinkAdminInteractionsProps {
   link: ILink;
   isChecked: boolean;
   setIsChecked: Dispatch<SetStateAction<boolean>>;
}

export default function LinkAdminInteractions({ link, isChecked, setIsChecked }: LinkAdminInteractionsProps) {
   const [updateLinkAPI] = useUpdateLinkMutation();
   const { updateLink, removeLink } = useLinks();
   const [removeLinkAPI] = useDeleteLinkMutation();

   const handleOnChange = async () => {
      setIsChecked(!isChecked);
      const res = await updateLinkAPI({ id: link._id, data: { active: !isChecked } }).unwrap();
      updateLink(res.doc);
   };

   const handleOnDelete = async () => {
      removeLink(link._id);
      await removeLinkAPI(link._id);
      setIsChecked(false);
   };
   return (
      <div className='link__group'>
         <Switch
            onChange={handleOnChange}
            checked={isChecked}
            offColor='#ed535b'
            onColor='#80e9ca'
            uncheckedIcon={false}
            checkedIcon={false}
            boxShadow='0px 1px 5px rgba(0, 0, 0, 0.6)'
            activeBoxShadow='0px 0px 1px 10px rgba(0, 0, 0, 0.2)'
            className='link__switch'
         />
         <CopyToClipboard text={link.link}>
            <ButtonIcon onClick={() => {}} className='link__icon'>
               <CiMedicalClipboard />
            </ButtonIcon>
         </CopyToClipboard>

         <Icon onClick={handleOnDelete} className='link__icon link__icon--remove'>
            &#10005;
         </Icon>
      </div>
   );
}
