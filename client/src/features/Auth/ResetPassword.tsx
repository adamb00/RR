import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useResetPasswordMutation } from './slices/auth/authApiSlice';
import { FieldValues, useForm, useWatch } from 'react-hook-form';
import Button from '@/ui/Buttons/Button';
import UserInput from '@/ui/UserInteractions/UserInput';
import FormIcon from '@/ui/FormIcon';
import { CiUnlock } from 'react-icons/ci';
import PasswordVisible from '@/ui/PasswordVisible';
import { useAppDispatch } from '@/redux-hooks';
import { setCredentials } from './slices/auth/authSlice';
import IError from '@/interfaces/IError';
import { getErrorMessage } from '@/utils/helpers';

export default function ResetPassword() {
   const { token } = useParams();
   const { handleSubmit, control } = useForm();
   const [resetPasswordApi, { isLoading }] = useResetPasswordMutation();
   const [error, setError] = useState<string | IError | null>(null);

   const dispatch = useAppDispatch();
   const navigate = useNavigate();
   const password = useWatch({ control, name: 'password' });
   const [isVisible, setIsVisible] = useState(false);

   const handleResetPassword = async (data: FieldValues) => {
      try {
         const res = await resetPasswordApi({ data, token }).unwrap();
         dispatch(setCredentials({ ...res }));
         navigate('/');
      } catch (err) {
         setError(() => getErrorMessage(err));
      }
   };

   return (
      <div>
         <h1 className='heading-primary'>Reset your password now!</h1>
         <form action='' onSubmit={handleSubmit(handleResetPassword)} className='reset-password__form'>
            <UserInput
               control={control}
               name='password'
               id='password'
               className='reset-password__form--input'
               fieldErrorClassname='reset-password__form--error'
               type={isVisible ? 'text' : 'password'}
               placeholder='Your password'
               rules={{
                  required: 'Password is required.',
                  minLength: {
                     value: 8,
                     message: 'Password needs a minimum of 8 characters',
                  },
               }}
            >
               <FormIcon tooltip='Enter Your password'>
                  <CiUnlock className='reset-password__form--icon' />
               </FormIcon>
               <PasswordVisible
                  className='reset-password__form--icon'
                  isVisible={isVisible}
                  setIsVisible={setIsVisible}
               />
            </UserInput>
            <UserInput
               control={control}
               name='passwordConfirm'
               id='passwordConfirm'
               className='reset-password__form--input'
               fieldErrorClassname='reset-password__form--error'
               type={isVisible ? 'text' : 'password'}
               placeholder='Your password again'
               rules={{
                  required: 'Please confirm your password',
                  validate: (value: string) => value === password || 'The passwords do not match',
               }}
            >
               <FormIcon tooltip='Confirm Your password'>
                  <CiUnlock className='reset-password__form--icon' />
               </FormIcon>
            </UserInput>

            {error && typeof error !== 'object' && <p className='reset-password__form--error'>{error}</p>}
            <Button type='submit' disabled={isLoading} className='btn btn--primary'>
               Reset Password
            </Button>
         </form>
      </div>
   );
}
