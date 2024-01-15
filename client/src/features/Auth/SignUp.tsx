import { FieldValues, useForm, useWatch } from 'react-hook-form';

import UserInput from '../../ui/UserInput';
import { CiBarcode, CiUnlock, CiUser, CiMail, CiGlobe, CiCalendarDate } from 'react-icons/ci';

import Button from '../../ui/Button';
import { useState } from 'react';
import { IS_VALID_EMAIL, IS_VALID_NUMBER } from '../../utils/helpers';
import { useCreateUser, useGetReferalCode } from './useUserAuth';
import IError from '../../interfaces/IError';

export default function SignUp() {
   const { control, handleSubmit } = useForm();
   const password = useWatch({ control, name: 'password' });
   const [error, setError] = useState<IError>();
   const [validReferralCode, setValidReferralCode] = useState();

   const { createUser, isCreating } = useCreateUser({
      onError: (error: IError) => {
         setError(error);
      },
   });

   const handleInputChange = () => {
      setError(undefined);
   };

   const { getReferralCode } = useGetReferalCode();

   const handleReferralAvailability = (data: FieldValues) => {
      const { referralCode } = data;
      getReferralCode(referralCode, {
         onSuccess: data => {
            setValidReferralCode(data.user);
            if (data.status === 'error') {
               setError(data);
            }
         },
      });
   };

   const handleSubmitForm = (data: object) => {
      createUser({ ...data, parent: validReferralCode });
   };

   return (
      <div className='signup'>
         <form action='' autoComplete='off' className='signup__form'>
            <div className='signup__form--welcome'>
               <div className='heading-primary'>Hello!</div>
               {!validReferralCode && (
                  <div className='heading-secondary'>Please provide us Your referral code first.</div>
               )}
               {validReferralCode && <div className='heading-secondary'>Please fill the form below to register.</div>}
            </div>

            {!validReferralCode && (
               <>
                  <UserInput
                     type='text'
                     onChange={handleInputChange}
                     control={control}
                     name='referralCode'
                     placeholder='Referral code'
                     fieldErrorClassname='signup__form--error'
                     className='signup__form--input'
                     rules={{
                        required: 'Referral code is required.',
                        validate: {
                           matchPattern: IS_VALID_NUMBER,
                        },
                     }}
                  >
                     <CiBarcode className='signup__form--icon' />
                  </UserInput>
               </>
            )}

            {validReferralCode && (
               <>
                  <div className='signup__form--group'>
                     <UserInput
                        type='text'
                        onChange={handleInputChange}
                        name='name'
                        control={control}
                        placeholder='Full name'
                        className='signup__form--input'
                        fieldErrorClassname='signup__form--error'
                     >
                        <CiUser className='signup__form--icon' />
                     </UserInput>

                     <UserInput
                        control={control}
                        name='email'
                        className='signup__form--input'
                        fieldErrorClassname='signup__form--error'
                        type='text'
                        onChange={handleInputChange}
                        placeholder='Your e-mail address'
                        rules={{
                           required: 'Email address is required.',
                           validate: {
                              matchPattern: IS_VALID_EMAIL,
                           },
                        }}
                     >
                        <CiMail className='signup__form--icon' />
                     </UserInput>
                  </div>
                  <div className='signup__form--group'>
                     <UserInput
                        control={control}
                        name='password'
                        className='signup__form--input'
                        fieldErrorClassname='signup__form--error'
                        type='password'
                        onChange={handleInputChange}
                        placeholder='Your password'
                        rules={{
                           required: 'Password is required.',
                           minLength: {
                              value: 8,
                              message: 'Password needs a minimum of 8 characters',
                           },
                        }}
                     >
                        <CiUnlock className='signup__form--icon' />
                     </UserInput>
                     <UserInput
                        control={control}
                        name='passwordConfirm'
                        className='signup__form--input'
                        fieldErrorClassname='signup__form--error'
                        type='password'
                        onChange={handleInputChange}
                        placeholder='Your password again'
                        rules={{
                           required: 'Please confirm your password',
                           validate: (value: string) => value === password || 'The passwords do not match',
                        }}
                     >
                        <CiUnlock className='signup__form--icon' />
                     </UserInput>
                  </div>
                  <div className='signup__form--group'>
                     <UserInput
                        control={control}
                        name='birthday'
                        onChange={handleInputChange}
                        className='signup__form--input'
                        fieldErrorClassname='signup__form--error'
                        type='date'
                     >
                        <CiCalendarDate className='signup__form--icon' />
                     </UserInput>
                     <UserInput
                        control={control}
                        name='nationality'
                        className='signup__form--input'
                        fieldErrorClassname='signup__form--error'
                        type='text'
                        onChange={handleInputChange}
                        placeholder='Your country'
                     >
                        <CiGlobe className='signup__form--icon' />
                     </UserInput>
                  </div>
               </>
            )}

            {error && (
               <p className='signup__form--error'>{error.message || 'Something went wrong. Please try again.'}</p>
            )}

            {!validReferralCode && (
               <Button onClick={handleSubmit(handleReferralAvailability)} className='btn btn--primary'>
                  Register
               </Button>
            )}

            {validReferralCode && (
               <Button onClick={handleSubmit(handleSubmitForm)} disabled={isCreating} className='btn btn--primary'>
                  Register now
               </Button>
            )}
         </form>
      </div>
   );
}
