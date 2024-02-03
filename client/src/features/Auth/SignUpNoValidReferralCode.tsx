import { CiBarcode } from 'react-icons/ci';
import UserInput from '../../ui/UserInteractions/UserInput';
import { IS_VALID_NUMBER } from '../../utils/helpers';
import { Control } from 'react-hook-form';
import IError from '../../interfaces/IError';

interface SignUpNoValidReferralCodeProps {
   control: Control;
   handleInputChange: () => void;
   error?: IError;
}

export default function SignUpNoValidReferralCode({
   control,
   handleInputChange,
   error,
}: SignUpNoValidReferralCodeProps) {
   return (
      <>
         <UserInput
            type='text'
            onChange={handleInputChange}
            control={control}
            name='referralCode'
            placeholder='Referral code'
            fieldErrorClassname='signup__form--error'
            eError={error && error.message}
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
   );
}
