import UserInput from '@/ui/UserInteractions/UserInput';
import ButtonIcon from '@/ui/Buttons/ButtonIcon';
import { IoChevronDown, IoChevronUp } from 'react-icons/io5';
import RichText from '@/ui/UserInteractions/RichText';
import Button from '@/ui/Buttons/Button';
import { emptyInputField } from '@/utils/helpers';
import { Control, FieldValues, UseFormHandleSubmit } from 'react-hook-form';
import { BallTriangle } from 'react-loader-spinner';
import { CiShare1 } from 'react-icons/ci';
import { Dispatch, SetStateAction } from 'react';
import { ILink } from '@/interfaces/ILink';
import { useUpdateLinkMutation } from '../linkApiSlice';
import { useLinks } from '@/context/LinkContext';
import { socket } from '@/utils/constants';

interface LinkAdminFormProps {
   isChecked: boolean;
   setIsChecked: Dispatch<SetStateAction<boolean>>;
   control: Control;
   isOpen: boolean;
   setIsOpen: Dispatch<SetStateAction<boolean>>;
   link: ILink;
   handleSubmit: UseFormHandleSubmit<FieldValues>;
}

export default function LinkAdminForm({
   isChecked,
   setIsChecked,
   control,
   isOpen,
   setIsOpen,
   handleSubmit,
   link,
}: LinkAdminFormProps) {
   const [updateLinkAPI, { isLoading: isUpdating }] = useUpdateLinkMutation();
   const { updateLink } = useLinks();

   const handleOnSubmit = async (data: FieldValues) => {
      const res = await updateLinkAPI({ id: link._id, data: { title: data.title } }).unwrap();
      socket.emit('link', { id: link._id, data: { title: data.title } });
      updateLink(res.doc);
      setIsChecked(true);
      emptyInputField('.admin-links__title--input');
   };
   const handleOpenDropdown = () => {
      setIsOpen((open: boolean) => !open);
   };

   const handleDescription = async (data: FieldValues) => {
      const res = await updateLinkAPI({ id: link._id, data: { description: data.description } }).unwrap();
      socket.emit('link', { id: link._id, data: { description: data.description } });
      updateLink(res.doc);
      setIsChecked(true);
      emptyInputField('.admin-links__form--richtext');
   };
   return (
      isChecked && (
         <>
            <form className='admin-links__title' onSubmit={handleSubmit(handleOnSubmit)}>
               <UserInput
                  name='title'
                  control={control}
                  placeholder={link.title ? 'You can easily modify the title' : 'Please add a title for the link'}
                  className='admin-links__title--input'
               >
                  <ButtonIcon className='btn--icon admin-links__title--icon' onClick={handleSubmit(handleOnSubmit)}>
                     {isUpdating ? <BallTriangle height={20} width={20} color='#ed535b' /> : <CiShare1 />}
                  </ButtonIcon>
               </UserInput>
               {isOpen && (
                  <div className='admin-links__form--large'>
                     <RichText control={control} name='description' className='admin-links__form--richtext' />{' '}
                     <Button className='btn btn--tertiary' onClick={handleSubmit(handleDescription)}>
                        Submit
                     </Button>
                  </div>
               )}
            </form>
            {isOpen ? (
               <IoChevronUp className='admin-links__chevron' onClick={handleOpenDropdown} />
            ) : (
               <IoChevronDown className='admin-links__chevron' onClick={handleOpenDropdown} />
            )}
         </>
      )
   );
}
