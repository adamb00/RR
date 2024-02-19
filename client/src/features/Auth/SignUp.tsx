import { FieldValues, useForm } from 'react-hook-form';
import Button from '../../ui/Buttons/Button';
import { useState } from 'react';
import IError from '../../interfaces/IError';
import SignUpValildReferralCode from './SignUpValildReferralCode';
import SignUpNoValidReferralCode from './SignUpNoValidReferralCode';
import { useNavigate } from 'react-router-dom';
import { useGetReferralCodeMutation, useRegisterMutation } from './slices/auth/authApiSlice';
import { getErrorMessage } from '../../utils/helpers';
import { useTranslation } from 'react-i18next';

export default function SignUp() {
   const { control, handleSubmit } = useForm();
   const [error, setError] = useState<IError | string | null>(null);
   const [validReferralCode, setValidReferralCode] = useState();
   const [register, { isLoading }] = useRegisterMutation();
   const [getReferral] = useGetReferralCodeMutation();
   const { t } = useTranslation();
   const navigate = useNavigate();

   const handleInputChange = () => {
      setError(null);
   };

   const handleReferralAvailability = async (data: FieldValues) => {
      try {
         const { referralCode } = data;
         const res = await getReferral(referralCode).unwrap();
         setValidReferralCode(res.user);
      } catch (error: unknown) {
         setError(() => getErrorMessage(error));
      }
   };

   const handleSubmitForm = async (data: object) => {
      try {
         await register({ ...data, parent: validReferralCode }).unwrap();
         navigate('/');
      } catch (error: unknown) {
         setError(() => getErrorMessage(error));
      }
   };

   return (
      <div className='signup'>
         <form action='' autoComplete='off' className='signup__form'>
            <div className='signup__form--welcome'>
               {validReferralCode ? (
                  <div className='heading-primary'>{t('You are almost there!')}</div>
               ) : (
                  <div className='heading-primary'>{t('Nice to meet you!')}</div>
               )}
               {!validReferralCode && (
                  <div className='heading-secondary'>{t('Please provide us Your referral code first.')}</div>
               )}
               {validReferralCode && (
                  <div className='heading-secondary'>{t('Please fill the form below to register.')}</div>
               )}
            </div>

            {!validReferralCode && (
               <SignUpNoValidReferralCode control={control} error={error} handleInputChange={handleInputChange} />
            )}

            {validReferralCode && (
               <SignUpValildReferralCode control={control} error={error} handleInputChange={handleInputChange} />
            )}

            {error && typeof error !== 'object' && <p className='signup__form--error'>{error}</p>}

            {!validReferralCode && (
               <Button onClick={handleSubmit(handleReferralAvailability)} className='btn btn--primary'>
                  {t('Continue to register')}
               </Button>
            )}

            {validReferralCode && (
               //TODO SET REGISTER TEXT TO SENDING EMAIL, EMAIL SENT WHILE SENDING EMAIL
               <>
                  <Button onClick={handleSubmit(handleSubmitForm)} disabled={isLoading} className='btn btn--primary'>
                     {t('Register now')}
                  </Button>
               </>
            )}
         </form>
      </div>
   );
}
