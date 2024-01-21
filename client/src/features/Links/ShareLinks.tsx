import { FieldValues, useForm } from 'react-hook-form';
import UserInput from '../../ui/UserInput';
import { CiShare1 } from 'react-icons/ci';
import ButtonIcon from '../../ui/ButtonIcon';
import { useCreateLink } from './useLinks';
import IError from '../../interfaces/IError';
import { useState } from 'react';
import { BallTriangle } from 'react-loader-spinner';

export default function ShareLinks() {
   const [error, setError] = useState<IError>();

   const { control, handleSubmit } = useForm();
   const { createLink, isCreating } = useCreateLink({
      onError: (error: IError) => {
         setError(error);
      },
   });
   const handleOnClick = (data: FieldValues) => {
      const { link } = data;
      createLink(link, {
         onSuccess: data => {
            if (data.status === 'error') {
               setError(data);
            }
         },
      });
      const inputElement = document.querySelector('.share-links__input') as HTMLInputElement;
      if (inputElement) {
         inputElement.value = '';
      }
   };
   return (
      <form className='share-links' onSubmit={handleSubmit(handleOnClick)}>
         <UserInput
            control={control}
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
         {error && <p className='share-links__error'>{error.message || 'Something went wrong. Please try again.'}</p>}
         <ButtonIcon className='btn--icon share-links__icon' onClick={handleSubmit(handleOnClick)}>
            {isCreating ? <BallTriangle height={20} width={20} color='#ed535b' /> : <CiShare1 />}
         </ButtonIcon>
      </form>
      //TODO SET THE STYLES IN SCSS
   );
}
