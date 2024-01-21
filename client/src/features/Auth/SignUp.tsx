import { FieldValues, useForm } from 'react-hook-form';
import Button from '../../ui/Button';
import { useState } from 'react';
import { useCreateUser, useGetReferalCode } from './useUserAuth';
import IError from '../../interfaces/IError';
import SignUpValildReferralCode from './SignUpValildReferralCode';
import SignUpNoValidReferralCode from './SignUpNoValidReferralCode';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function SignUp() {
   const { user } = useAuth();
   const { control, handleSubmit } = useForm();
   const { getReferralCode } = useGetReferalCode();
   const [error, setError] = useState<IError>();
   const [validReferralCode, setValidReferralCode] = useState();
   const navigate = useNavigate();

   const { createUser, isCreating } = useCreateUser({
      onError: (error: IError) => {
         setError(error);
      },
   });

   const handleInputChange = () => {
      setError(undefined);
   };

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
      createUser(
         { ...data, parent: validReferralCode },
         {
            onSuccess: data => {
               if (data.status === 'error') {
                  setError(data);
               }
            },
         }
      );
   };

   if (user) navigate('/');

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
               <SignUpNoValidReferralCode control={control} handleInputChange={handleInputChange} />
            )}

            {validReferralCode && <SignUpValildReferralCode control={control} handleInputChange={handleInputChange} />}

            {error && (
               <p className='signup__form--error'>{error.message || 'Something went wrong. Please try again.'}</p>
            )}

            {!validReferralCode && (
               <Button onClick={handleSubmit(handleReferralAvailability)} className='btn btn--primary'>
                  Register
               </Button>
            )}

            {validReferralCode && (
               //TODO SET REGISTER TEXT TO SENDING EMAIL, EMAIL SENT WHILE SENDING EMAIL
               <>
                  <Button onClick={handleSubmit(handleSubmitForm)} disabled={isCreating} className='btn btn--primary'>
                     Register now
                  </Button>
               </>
            )}
         </form>
      </div>
   );
}
