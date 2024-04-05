import { useState } from 'react';
import UserInput from '@/ui/UserInteractions/UserInput';
import { FieldValues, useForm } from 'react-hook-form';
import { IS_VALID_EMAIL, handleError } from '@/utils/helpers';
import FormIcon from '@/ui/FormIcon';
import { CiUser } from 'react-icons/ci';
import Button from '@/ui/Buttons/Button';
import { useForgotPassword } from './useUserAuth';
import IError from '@/interfaces/IError';

export default function ForgotPassword() {
   const { control, handleSubmit } = useForm();
   const { forgotPassword } = useForgotPassword();
   const [error, setError] = useState<string | IError | null>(null);
   const [isLoading, setIsLoading] = useState('Submit');

   const handleForgotPassword = (data: FieldValues) => {
      try {
         setIsLoading(() => 'Sending e-mail...');
         forgotPassword(
            { ...data },
            {
               onSuccess: data => {
                  if (data.status === 'error') setError(() => data.message);
                  if (data.status === 'success') setIsLoading(() => 'E-mail sent...');
               },
            }
         );
      } catch (err) {
         console.log(err);
      }
   };

   return (
      <div className='forgot-password'>
         <h1 className='heading-primary'>Forgot your password?</h1>
         <form action='' onSubmit={handleSubmit(handleForgotPassword)} className='forgot-password__form'>
            <UserInput
               control={control}
               name='email'
               className='forgot-password__form--input'
               eError={handleError(error, 'email')}
               fieldErrorClassname='login__form--error'
               type='text'
               placeholder='Enter Your e-mail address'
               rules={{
                  required: 'Email address is required.',
                  validate: {
                     matchPattern: IS_VALID_EMAIL,
                  },
               }}
            >
               <FormIcon tooltip='Enter Your e-mail address'>
                  <CiUser className='forgot-password__form--icon' />
               </FormIcon>
            </UserInput>
            <Button type='submit' className='btn btn--primary'>
               {isLoading}
            </Button>
         </form>
      </div>
   );
}
