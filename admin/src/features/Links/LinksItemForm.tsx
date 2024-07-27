import UserInput from '@/ui/UserInteractions/UserInput';

import Button from '@/ui/Buttons/Button';
import { emptyInputField } from '@/utils/helper';
import { FieldValues, useForm } from 'react-hook-form';
import { Dispatch, SetStateAction } from 'react';
import { ILink } from '@/interfaces/ILink';
import { useUpdateLinkMutation } from '@/features/Links/linkApiSlice';
import UserCheckboxInput from '@/ui/UserInteractions/UserInputCheckbox';

interface LinksItemFormProps {
   isChecked: boolean;
   setIsChecked: Dispatch<SetStateAction<boolean>>;
   isOpen: boolean;
   setIsOpen: Dispatch<SetStateAction<boolean>>;
   link: ILink;
}

export default function LinksItemForm({ setIsChecked, isOpen, link }: LinksItemFormProps) {
   const [updateLinkAPI] = useUpdateLinkMutation();
   const { handleSubmit, control } = useForm();

   const handleOnSubmit = async (data: FieldValues) => {
      const primary = data.primary ? { order: 0 } : { order: 1 };
      const updatedData = { ...link, ...data, ...primary };
      await updateLinkAPI({ id: link._id, data: updatedData }).unwrap();
      setIsChecked(true);
      emptyInputField('.links__title--input');
   };

   return (
      <>
         {isOpen && (
            <form className='links__admin-form' onSubmit={handleSubmit(handleOnSubmit)} id={link._id}>
               <UserInput
                  label=''
                  id={link._id}
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
               <UserInput
                  label=''
                  control={control}
                  name='video'
                  placeholder={link.video || 'Video hozzáadása a linkhez'}
               />
               {isOpen && link.images && (
                  <div className='links__checkbox'>
                     <UserCheckboxInput control={control} name='isPreview' defaultChecked={link.isPreview}>
                        <label htmlFor='isPreview'>Teljes kép?</label>
                     </UserCheckboxInput>
                     <UserCheckboxInput
                        control={control}
                        name='primary'
                        // onChange={e => handlePrimary(e, link._id)}
                        defaultChecked={link.order === 0}
                     >
                        <label htmlFor='primary'>Elsődleges?</label>
                     </UserCheckboxInput>
                     <UserCheckboxInput control={control} name='isModify' defaultChecked={link.isModify}>
                        <label htmlFor='modify'>Módosítható?</label>
                     </UserCheckboxInput>
                  </div>
               )}

               <Button type='submit' className='btn'>
                  Ok
               </Button>
            </form>
         )}
      </>
   );
}
