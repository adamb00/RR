import { FieldValues, useForm } from 'react-hook-form';
import Button from '../../ui/Buttons/Button';
import { useState } from 'react';
import IError from '../../interfaces/IError';
import SignUpValildReferralCode from './SignUpValildReferralCode';
import SignUpNoValidReferralCode from './SignUpNoValidReferralCode';
import { useNavigate } from 'react-router-dom';
import { useGetReferralCodeMutation, useRegisterMutation } from './slices/auth/authApiSlice';

export default function SignUp() {
   const { control, handleSubmit } = useForm();
   const [error, setError] = useState<IError>();
   const [validReferralCode, setValidReferralCode] = useState();
   const [register, { isLoading }] = useRegisterMutation();
   const [getReferral] = useGetReferralCodeMutation();

   const navigate = useNavigate();

   const handleInputChange = () => {
      setError(undefined);
   };

   const handleReferralAvailability = async (data: FieldValues) => {
      try {
         const { referralCode } = data;
         const res = await getReferral(referralCode).unwrap();
         if (res.status === 'error') setError(res.message);
         if (res.status === 'success') setValidReferralCode(res.user);

         // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
         setError(err.data);
      }
   };

   const handleSubmitForm = async (data: object) => {
      try {
         await register({ ...data, parent: validReferralCode });
         navigate('/');
         // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
         setError(err.data);
      }
   };

   return (
      <div className='signup'>
         <form action='' autoComplete='off' className='signup__form'>
            <div className='signup__form--welcome'>
               {validReferralCode ? (
                  <div className='heading-primary'>You are almost there!</div>
               ) : (
                  <div className='heading-primary'>Nice to meet you!</div>
               )}
               {!validReferralCode && (
                  <div className='heading-secondary'>Please provide us Your referral code first.</div>
               )}
               {validReferralCode && <div className='heading-secondary'>Please fill the form below to register.</div>}
            </div>

            {!validReferralCode && (
               <SignUpNoValidReferralCode control={control} error={error} handleInputChange={handleInputChange} />
            )}

            {validReferralCode && (
               <SignUpValildReferralCode control={control} error={error} handleInputChange={handleInputChange} />
            )}

            {error && (
               <p className='signup__form--error'>{error.message || 'Something went wrong. Please try again.'}</p>
            )}

            {!validReferralCode && (
               <Button onClick={handleSubmit(handleReferralAvailability)} className='btn btn--primary'>
                  Continue to register
               </Button>
            )}

            {validReferralCode && (
               //TODO SET REGISTER TEXT TO SENDING EMAIL, EMAIL SENT WHILE SENDING EMAIL
               <>
                  <Button onClick={handleSubmit(handleSubmitForm)} disabled={isLoading} className='btn btn--primary'>
                     Register now
                  </Button>
               </>
            )}
         </form>
      </div>
   );
}
