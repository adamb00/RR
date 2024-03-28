import { Control, useWatch } from 'react-hook-form';
import UserInput from '@/ui/UserInteractions/UserInput';
import { CiUnlock, CiUser, CiMail, CiCalendarDate } from 'react-icons/ci';
import { IS_VALID_EMAIL, handleError } from '@/utils/helpers';
import IError from '@/interfaces/IError';
import { useState } from 'react';
import PasswordVisible from '@/ui/PasswordVisible';
import FormIcon from '@/ui/FormIcon';
import { useTranslation } from 'react-i18next';
import { GiPhone } from 'react-icons/gi';
import SelectCountry from '@/ui/UserInteractions/SelectCountry';

interface SignUpValidReferralCodeProps {
   control: Control;
   handleInputChange: () => void;
   error: IError | string | null;
}

export default function SignUpValildReferralCode({ control, handleInputChange, error }: SignUpValidReferralCodeProps) {
   const password = useWatch({ control, name: 'password' });
   const [isVisible, setIsVisible] = useState(false);
   const { t } = useTranslation();

   return (
      <>
         <div className='signup__form--group'>
            <UserInput
               type='text'
               onChange={handleInputChange}
               name='name'
               id='name'
               control={control}
               placeholder={t('Full name')}
               className='signup__form--input'
               fieldErrorClassname='signup__form--error'
               rules={{
                  required: t('Please tell us Your full name.'),
               }}
            >
               <FormIcon tooltip={t('Please tell us Your full name.')}>
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
               placeholder={t('Your e-mail address')}
               rules={{
                  required: t('Email address is required.'),

                  //TODO ERROR FORDITASA
                  validate: {
                     matchPattern: IS_VALID_EMAIL,
                  },
               }}
            >
               <FormIcon tooltip={t('Enter Your e-mail address')}>
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
               placeholder={t('Your password')}
               rules={{
                  required: t('Password is required'),
                  minLength: {
                     value: 8,
                     message: t('Password needs a minimum of 8 characters'),
                  },
               }}
            >
               <FormIcon tooltip={t('Enter Your password')}>
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
               placeholder={t('Your password again')}
               rules={{
                  required: t('Please confirm your password'),
                  validate: (value: string) => value === password || t('The passwords do not match'),
               }}
            >
               <FormIcon tooltip='Confirm Your password'>
                  <CiUnlock className='signup__form--icon' />
               </FormIcon>
            </UserInput>
         </div>
         <div className='signup__form--group signup__form--group__date'>
            <div className='signup__form--country'>
               <SelectCountry
                  className='signup__form--country__input'
                  control={control}
                  name='nationality'
                  id='nationality'
               />
            </div>
            <UserInput
               control={control}
               name='phone'
               id='phone'
               className='signup__form--input'
               fieldErrorClassname='signup__form--error'
               type='text'
               onChange={handleInputChange}
               placeholder={t('Your phone number')}
               rules={{
                  required: t('Please provide us Your phone number.'),
               }}
            >
               <FormIcon tooltip={t('Enter Your phone number')}>
                  <GiPhone className='signup__form--icon' />
               </FormIcon>
            </UserInput>
         </div>
         <UserInput
            control={control}
            name='birthday'
            id='birthday'
            onChange={handleInputChange}
            className='signup__form--input signup__form--input__date'
            fieldErrorClassname='signup__form--error'
            type='date'
         >
            <FormIcon tooltip={t('Please provide us when did You born')}>
               <CiCalendarDate className='signup__form--icon' />
            </FormIcon>
         </UserInput>
      </>
   );
}
