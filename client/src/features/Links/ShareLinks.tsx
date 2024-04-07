import { FieldValues, useForm } from 'react-hook-form';
import UserInput from '@/ui/UserInteractions/UserInput';
import { CiShare1 } from 'react-icons/ci';
import ButtonIcon from '@/ui/Buttons/ButtonIcon';
import { BallTriangle } from 'react-loader-spinner';
import { useCreateLink } from './useLinks';
// import { emptyInputField } from '@/utils/helpers';
// import { useCreateLinkMutation } from './linkApiSlice';
// import { useLinks } from '@/context/LinkContext';

export default function ShareLinks() {
   const { control, handleSubmit } = useForm();
   const { createLink, isCreating } = useCreateLink();
   // const [createLink, { isLoading: isCreating }] = useCreateLinkMutation();
   // const { setLinks } = useLinks();
   const handleOnSubmit = async (data: FieldValues) => {
      createLink(data.link);
      // console.log('ShareLinksData', data);
      // const res = await createLink(data).unwrap();
      // console.log('ShareLinksRes', res);
      // setLinks(prevlink => [res.doc, ...prevlink]);
      // emptyInputField('.share-links__input');
   };
   return (
      <form className='share-links' onSubmit={handleSubmit(handleOnSubmit)}>
         <UserInput
            control={control}
            id='link'
            name='link'
            className='share-links__input'
            placeholder='Share your links...'
            fieldErrorClassname='share-links__error'
            type='text'
            rules={{
               required: 'Please provide a link you want to share.',
               minLength: {
                  value: 1,
                  message: 'Please provide a link you want to share.',
               },
            }}
         />
         <ButtonIcon className='btn--icon share-links__icon' onClick={handleSubmit(handleOnSubmit)}>
            {isCreating ? <BallTriangle height={20} width={20} color='#ed535b' /> : <CiShare1 />}
         </ButtonIcon>
      </form>
      //TODO SET THE STYLES IN SCSS
   );
}
