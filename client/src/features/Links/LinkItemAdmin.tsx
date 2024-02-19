import { ILink } from '../../interfaces/ILink';
import { CiMedicalClipboard, CiShare1 } from 'react-icons/ci';
import ButtonIcon from '../../ui/Buttons/ButtonIcon';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { useDeleteOneLink, useUpdateLink } from './useLinks';
import { useDrag } from 'react-dnd';

import Switch from 'react-switch';
import { useEffect, useState } from 'react';
import UserInput from '../../ui/UserInteractions/UserInput';
import { FieldValues, useForm } from 'react-hook-form';
import { emptyInputField, truncateText } from '../../utils/helpers';
import useDetectOrientation from '../../hooks/useDetectOrientation';
import { BallTriangle } from 'react-loader-spinner';
import { useSelector } from 'react-redux';
import { selectIsAdmin } from '../Auth/slices/auth/authSlice';

interface LinkItemProps {
   link: ILink;
   device: string;
}
export default function LinkItemAdmin({ link, device }: LinkItemProps) {
   const { control, handleSubmit } = useForm();
   const isAdmin = useSelector(selectIsAdmin);

   const { updateLink, isUpdating } = useUpdateLink();
   const { isDeleting, deleteLink } = useDeleteOneLink();
   const [isChecked, setIsChecked] = useState(false);

   const orientation = useDetectOrientation();

   const [{ isDragging }, drag] = useDrag(() => ({
      type: 'BOX',
      item: { id: link._id },
      collect: monitor => ({
         isDragging: monitor.isDragging(),
      }),
   }));

   const handleOnChange = () => {
      setIsChecked(!isChecked);
      updateLink({ id: link._id, data: { active: !isChecked } });
   };

   useEffect(() => {
      setIsChecked(link.active);
   }, [link.active]);

   const currentLinkTitle = () => link.title ?? '';

   const handleIfLinkHasTitle = () => {
      return currentLinkTitle() ? currentLinkTitle() : device === 'Mobile' ? handlePhoneView(link.link) : link.link;
   };

   const handleOnSubmit = async (data: FieldValues) => {
      updateLink({ id: link._id, data: { title: data.title } });

      setIsChecked(true);
      emptyInputField('.link__title--input');
   };

   const handleOnDelete = async (linkId: string) => {
      deleteLink(linkId);
      setIsChecked(false);
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

   return (
      <div className='link__links' ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
         <div className='link__wrapper'>
            <div className='link__wrapper--group'>
               <div className='link__item'>{handleIfLinkHasTitle()}</div>
               <div className='link__item--link'>{currentLinkTitle() && handlePhoneView(`(${link.link})`, 60)}</div>
            </div>

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

               {isAdmin && device !== 'Desktop' && (
                  <ButtonIcon
                     onClick={() => handleOnDelete(link._id)}
                     disabled={isDeleting}
                     className='link__icon link__icon--remove'
                  >
                     &#10005;
                  </ButtonIcon>
               )}
            </div>
         </div>
         {isChecked && (
            <form className='link__title' onSubmit={handleSubmit(handleOnSubmit)}>
               <UserInput
                  name='title'
                  control={control}
                  placeholder={link.title ? 'You can easily modify the title' : 'Please add a title for the link'}
                  className='link__title--input'
               >
                  <ButtonIcon className='btn--icon link__title--icon' onClick={handleSubmit(handleOnSubmit)}>
                     {isUpdating ? <BallTriangle height={20} width={20} color='#ed535b' /> : <CiShare1 />}
                  </ButtonIcon>
               </UserInput>
            </form>
         )}
      </div>
   );
}
