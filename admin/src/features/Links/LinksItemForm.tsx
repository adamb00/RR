import UserInput from '@/ui/UserInteractions/UserInput';

import Button from '@/ui/Buttons/Button';
import { emptyInputField } from '@/utils/helper';
import { Control, FieldValues, UseFormHandleSubmit } from 'react-hook-form';
import { Dispatch, SetStateAction } from 'react';
import { ILink } from '@/interfaces/ILink';
import { useUpdateLinkMutation } from '@/features/Links/linkApiSlice';
import { useLinks } from '@/contexts/LinkContext';
// import { socket } from '@/utils/constants';

interface LinksItemFormProps {
   isChecked: boolean;
   setIsChecked: Dispatch<SetStateAction<boolean>>;
   control: Control;
   isOpen: boolean;
   setIsOpen: Dispatch<SetStateAction<boolean>>;
   link: ILink;
   handleSubmit: UseFormHandleSubmit<FieldValues>;
}

export default function LinksItemForm({ setIsChecked, control, isOpen, handleSubmit, link }: LinksItemFormProps) {
   const [updateLinkAPI] = useUpdateLinkMutation();
   const { updateLink } = useLinks();

   const handleOnSubmit = async (data: FieldValues) => {
      const updatedData = { ...data, ...link };

      console.log(updatedData);

      const res = await updateLinkAPI({ id: link._id, data: updatedData }).unwrap();

      // socket.emit('link', { id: link._id, data });
      updateLink(res.doc);
      setIsChecked(true);
      emptyInputField('.links__title--input');
   };
   return (
      <>
         {isOpen && (
            <form className='links__admin-form' onSubmit={handleSubmit(handleOnSubmit)}>
               <UserInput
                  label=''
                  control={control}
                  name='title'
                  placeholder={link.title ? 'Linkhez tartozó cím módosítása' : 'Cím hozzáadása a linkhez'}
               />

               <UserInput
                  label=''
                  control={control}
                  name='description'
                  placeholder={link.description || 'Leírás hozzáadása a linkhez'}
               />
               <Button type='submit' className='btn'>
                  Ok
               </Button>
            </form>
         )}
      </>
   );
}
