import UserInput from '@/ui/UserInteractions/UserInput';

import Button from '@/ui/Buttons/Button';
import { emptyInputField } from '@/utils/helpers';
import { Control, FieldValues, UseFormHandleSubmit } from 'react-hook-form';
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

export default function LinkAdminForm({ setIsChecked, control, isOpen, handleSubmit, link }: LinkAdminFormProps) {
   const [updateLinkAPI] = useUpdateLinkMutation();
   const { updateLink } = useLinks();

   const handleOnSubmit = async (data: FieldValues) => {
      const updatedData = { ...data, ...link };

      const res = await updateLinkAPI({ id: link._id, data: updatedData }).unwrap();

      socket.emit('link', { id: link._id, data });
      updateLink(res.doc);
      setIsChecked(true);
      emptyInputField('.admin-links__title--input');
   };
   return (
      <>
         {isOpen && (
            <form className='admin-links__admin-form' onSubmit={handleSubmit(handleOnSubmit)}>
               <UserInput
                  control={control}
                  name='title'
                  className='admin-links__admin-form--input'
                  placeholder={link.title ? 'You can easily modify the title' : 'Please add a title for the link'}
               />

               <UserInput
                  control={control}
                  name='description'
                  className='admin-links__admin-form--input'
                  placeholder={link.description || 'Please add a description for the link'}
               />
               <Button type='submit' className='btn btn--grey'>
                  Submit
               </Button>
            </form>
         )}
      </>
   );
}

// {/* <form className='admin-links__title' onSubmit={handleSubmit(handleOnSubmit)}>
//    <UserInput
//       name='title'
//       control={control}
//       placeholder={link.title ? 'You can easily modify the title' : 'Please add a title for the link'}
//       className='admin-links__title--input'
//    >
//       <ButtonIcon className='btn--icon admin-links__title--icon' onClick={handleSubmit(handleOnSubmit)}>
//          {isUpdating ? <BallTriangle height={20} width={20} color='#ed535b' /> : <CiShare1 />}
//       </ButtonIcon>
//    </UserInput>
//    {isOpen && (
//       <div className='admin-links__form--large'>
//          {/* <RichText control={control} name='description' className='admin-links__form--richtext' /> */}
//          <UserInput
//             control={control}
//             name='description'
//             className='admin-links__description--input'
//             placeholder={link.description || 'Please add a description for the link'}
//          >
//             <ButtonIcon
//                className='btn--icon admin-links__description--icon'
//                onClick={handleSubmit(handleDescription)}
//             >
//                {isUpdating ? <BallTriangle height={20} width={20} color='#ed535b' /> : <CiShare1 />}
//             </ButtonIcon>
//          </UserInput>
//          {/* <Button className='btn btn--tertiary' onClick={handleSubmit(handleDescription)}>
//             Submit
//          </Button> */}
//       </div>
//    )}
// </form> */}
