import { CiBarcode } from 'react-icons/ci';
import UserInput from '@/ui/UserInteractions/UserInput';
import { IS_VALID_NUMBER, handleError } from '@/utils/helpers';
import { Control } from 'react-hook-form';
import IError from '@/interfaces/IError';
import FormIcon from '@/ui/FormIcon';
import { useTranslation } from 'react-i18next';

interface SignUpNoValidReferralCodeProps {
   control: Control;
   handleInputChange: () => void;
   error: IError | string | null;
}

export default function SignUpNoValidReferralCode({
   control,
   handleInputChange,
   error,
}: SignUpNoValidReferralCodeProps) {
   const { t } = useTranslation();
   return (
      <>
         <UserInput
            type='text'
            onChange={handleInputChange}
            control={control}
            name='referralCode'
            placeholder={t('Referral code')}
            fieldErrorClassname='signup__form--error'
            eError={handleError(error, 'referralCode')}
            className='signup__form--input'
            rules={{
               required: t('Referral code is required.'),
               validate: {
                  //TODO JELSZO ERROR FORDITASA
                  matchPattern: IS_VALID_NUMBER,
               },
            }}
         >
            <FormIcon tooltip={t('Enter Your referral code.')}>
               <CiBarcode className='signup__form--icon' />
            </FormIcon>
         </UserInput>
      </>
   );
}
