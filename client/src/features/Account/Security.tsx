import { FieldValues, useForm, useWatch } from 'react-hook-form';
import UserInput from '../../ui/UserInteractions/UserInput';
import { useState } from 'react';
import FormIcon from '../../ui/FormIcon';
import { CiUnlock } from 'react-icons/ci';
import PasswordVisible from '../../ui/PasswordVisible';
import IError from '../../interfaces/IError';
import Button from '../../ui/Buttons/Button';
import { useUpdatePasswordMutation } from '../Auth/slices/user/userApiSlice';
import { useAppDispatch } from '../../redux-hooks';
import { setCredentials } from '../Auth/slices/auth/authSlice';
import { emptyInputField, getErrorMessage, handleError } from '../../utils/helpers';
import { useTranslation } from 'react-i18next';

export default function Security() {
   const { control, handleSubmit } = useForm();
   const password = useWatch({ control, name: 'password' });
   const currentPassword = useWatch({ control, name: 'passwordCurrent' });
   const [error, setError] = useState<string | IError | null>(null);
   const [updatePassword, { isLoading }] = useUpdatePasswordMutation();
   const dispatch = useAppDispatch();
   const { t } = useTranslation();

   const handleResetPassword = async (data: FieldValues) => {
      try {
         const res = await updatePassword(data).unwrap();
         dispatch(setCredentials({ ...res }));
         emptyInputField('.new');
         emptyInputField('.current');
         emptyInputField('.newConfirm');
         setError(null);
      } catch (err) {
         setError(() => getErrorMessage(err));
      }
   };

   const [isVisible, setIsVisible] = useState(false);
   return (
      <div>
         <h1 className='heading-primary'>{t('Update your password')}</h1>
         <form action='' className='account__change-password__form' onSubmit={handleSubmit(handleResetPassword)}>
            <UserInput
               control={control}
               name='passwordCurrent'
               id='passwordCurrent'
               //TODO TRANSLATE THE ERROR COME FROM THE SERVER
               eError={handleError(error, 'passwordCurrent')}
               className='account__change-password__form--input current'
               fieldErrorClassname='account__change-password__form--error'
               type={isVisible ? 'text' : 'password'}
               placeholder={t('Your current password')}
               rules={{
                  required: t('Password is required'),
                  minLength: {
                     value: 8,
                     message: t('Password needs a minimum of 8 characters'),
                  },
               }}
            >
               <FormIcon tooltip={t('Enter Your current password')}>
                  <CiUnlock className='account__change-password__form--icon' />
               </FormIcon>
               <PasswordVisible
                  className='account__change-password__form--icon'
                  isVisible={isVisible}
                  setIsVisible={setIsVisible}
               />
            </UserInput>
            <UserInput
               control={control}
               name='password'
               id='password'
               className='account__change-password__form--input new'
               fieldErrorClassname='account__change-password__form--error'
               type={isVisible ? 'text' : 'password'}
               placeholder={t('Your new password')}
               rules={{
                  required: t('Password is required'),
                  minLength: {
                     value: 8,
                     message: t('Password needs a minimum of 8 characters'),
                  },
                  validate: (value: string) => value !== currentPassword || t('New password cannot be the same'),
               }}
            >
               <FormIcon tooltip={t('Enter Your new password')}>
                  <CiUnlock className='account__change-password__form--icon' />
               </FormIcon>
            </UserInput>
            <UserInput
               control={control}
               name='passwordConfirm'
               id='passwordConfirm'
               className='account__change-password__form--input newConfirm'
               fieldErrorClassname='account__change-password__form--error'
               type={isVisible ? 'text' : 'password'}
               placeholder={t('Your new password again')}
               rules={{
                  required: t('Please confirm your password'),
                  validate: (value: string) => value === password || t('The passwords do not match'),
               }}
            >
               <FormIcon tooltip={t('Confirm Your new password')}>
                  <CiUnlock className='account__change-password__form--icon' />
               </FormIcon>
            </UserInput>

            {error && typeof error !== 'object' && <p className='account__change-password__form--error'>{error}</p>}
            <Button type='submit' disabled={isLoading} className='btn btn--primary'>
               {t('Reset Password')}
            </Button>
         </form>
      </div>
   );
}
