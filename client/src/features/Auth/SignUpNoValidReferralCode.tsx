import { CiBarcode } from 'react-icons/ci';
import UserInput from '../../ui/UserInteractions/UserInput';
import { IS_VALID_NUMBER } from '../../utils/helpers';
import { Control } from 'react-hook-form';

interface SignUpNoValidReferralCodeProps {
   control: Control;
   handleInputChange: () => void;
}

export default function SignUpNoValidReferralCode({ control, handleInputChange }: SignUpNoValidReferralCodeProps) {
   return (
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
   );
}
