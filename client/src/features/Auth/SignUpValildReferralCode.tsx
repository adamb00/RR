import { Control, useWatch } from 'react-hook-form';
import UserInput from '../../ui/UserInteractions/UserInput';
import { CiUnlock, CiUser, CiMail, CiGlobe, CiCalendarDate } from 'react-icons/ci';
import { IS_VALID_EMAIL } from '../../utils/helpers';

interface SignUpValidReferralCodeProps {
   control: Control;
   handleInputChange: () => void;
}

export default function SignUpValildReferralCode({ control, handleInputChange }: SignUpValidReferralCodeProps) {
   const password = useWatch({ control, name: 'password' });

   return (
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
         <div className='signup__form--group signup__form--group__date'>
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
            <UserInput
               control={control}
               name='birthday'
               onChange={handleInputChange}
               className='signup__form--input signup__form--input__date'
               fieldErrorClassname='signup__form--error'
               type='date'
            >
               <CiCalendarDate className='signup__form--icon' />
            </UserInput>
         </div>
      </>
   );
}
