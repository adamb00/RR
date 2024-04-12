import { useLinks } from '@/contexts/LinkContext';
import { FieldValues, useForm } from 'react-hook-form';
import { useCreateLinkMutation } from './linkApiSlice';
import { emptyInputField } from '@/utils/helper';
import UserInput from '@/ui/UserInteractions/UserInput';
import Button from '@/ui/Buttons/Button';

export default function LinksForm() {
   const { control, handleSubmit } = useForm();
   const [createlink, { isLoading: isCreating }] = useCreateLinkMutation();
   const { setLinks } = useLinks();

   const handleOnSubmit = async (data: FieldValues) => {
      const res = await createlink(data).unwrap();
      setLinks(prevlink => [res.doc, ...prevlink]);
      emptyInputField('.user-input__input');
   };
   return (
      <form className='links__form' onSubmit={handleSubmit(handleOnSubmit)}>
         <UserInput control={control} name='link' label='' placeholder='Link megosztása' />
         <Button type='submit' disabled={isCreating}>
            Megosztás
         </Button>
      </form>
   );
}
