import { Control, useWatch } from 'react-hook-form';
import UserInput from '../../ui/UserInteractions/UserInput';
import { CiUnlock, CiUser, CiMail, CiGlobe, CiCalendarDate } from 'react-icons/ci';
import { IS_VALID_EMAIL, handleError } from '../../utils/helpers';
import IError from '../../interfaces/IError';
import { useState } from 'react';
import PasswordVisible from '../../ui/PasswordVisible';
import FormIcon from '../../ui/FormIcon';

interface SignUpValidReferralCodeProps {
   control: Control;
   handleInputChange: () => void;
   error: IError | string | null;
}

export default function SignUpValildReferralCode({ control, handleInputChange, error }: SignUpValidReferralCodeProps) {
   const password = useWatch({ control, name: 'password' });
   const [isVisible, setIsVisible] = useState(false);

   return (
      <>
         <div className='signup__form--group'>
            <UserInput
               type='text'
               onChange={handleInputChange}
               name='name'
               id='name'
               control={control}
               placeholder='Full name'
               className='signup__form--input'
               fieldErrorClassname='signup__form--error'
               rules={{
                  required: 'Please tell us Your full name.',
               }}
            >
               <FormIcon tooltip='Enter Your full name'>
                  <CiUser className='signup__form--icon' />
               </FormIcon>
            </UserInput>

            <UserInput
               control={control}
               name='email'
               id='email'
               className='signup__form--input'
               fieldErrorClassname='signup__form--error'
               eError={handleError(error, 'email')}
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
               <FormIcon tooltip='Enter Your e-mail address'>
                  <CiMail className='signup__form--icon' />
               </FormIcon>
            </UserInput>
         </div>
         <div className='signup__form--group'>
            <UserInput
               control={control}
               name='password'
               id='password'
               className='signup__form--input'
               fieldErrorClassname='signup__form--error'
               type={isVisible ? 'text' : 'password'}
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
               <FormIcon tooltip='Enter Your password'>
                  <CiUnlock className='signup__form--icon' />
               </FormIcon>
               <PasswordVisible className='signup__form--icon' isVisible={isVisible} setIsVisible={setIsVisible} />
            </UserInput>
            <UserInput
               control={control}
               name='passwordConfirm'
               id='passwordConfirm'
               className='signup__form--input'
               fieldErrorClassname='signup__form--error'
               type={isVisible ? 'text' : 'password'}
               onChange={handleInputChange}
               placeholder='Your password again'
               rules={{
                  required: 'Please confirm your password',
                  validate: (value: string) => value === password || 'The passwords do not match',
               }}
            >
               <FormIcon tooltip='Confirm Your password'>
                  <CiUnlock className='signup__form--icon' />
               </FormIcon>
            </UserInput>
         </div>
         <div className='signup__form--group signup__form--group__date'>
            <UserInput
               control={control}
               name='nationality'
               id='nationality'
               className='signup__form--input'
               fieldErrorClassname='signup__form--error'
               type='text'
               onChange={handleInputChange}
               placeholder='Your country'
               rules={{
                  required: 'Please provide us where are you from.',
               }}
            >
               <FormIcon tooltip='Enter where are you from'>
                  <CiGlobe className='signup__form--icon' />
               </FormIcon>
            </UserInput>
            <UserInput
               control={control}
               name='birthday'
               id='birthday'
               onChange={handleInputChange}
               className='signup__form--input signup__form--input__date'
               fieldErrorClassname='signup__form--error'
               type='date'
            >
               <FormIcon tooltip='Please provide us when did You born'>
                  <CiCalendarDate className='signup__form--icon' />
               </FormIcon>
            </UserInput>
         </div>
      </>
   );
}
