import { CiUnlock, CiUser } from 'react-icons/ci';
import Button from '../../ui/Buttons/Button';
import { useForm } from 'react-hook-form';
import UserInput from '../../ui/UserInteractions/UserInput';
import { IS_VALID_EMAIL } from '../../utils/helpers';
import { NavLink, useNavigate } from 'react-router-dom';
import { useLoginUser } from './useUserAuth';
import IError from '../../interfaces/IError';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

export default function SignIn() {
   const navigate = useNavigate();
   const { user } = useAuth();
   const { control, handleSubmit } = useForm();
   const { loginUser, isLogging } = useLoginUser({
      onError: (error: IError) => {
         setError(error);
      },
   });
   const [error, setError] = useState<IError>();

   const handleInputChange = () => {
      setError(undefined);
   };

   const handleSubmitForm = (data: object) => {
      loginUser(
         { ...data },
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
      <div className='login'>
         <form action='' onSubmit={handleSubmit(handleSubmitForm)} className='login__form' autoComplete='new-password'>
            <div className='login__form--welcome'>
               <div className='heading-primary'>Welcome back!</div>
               <div className='heading-secondary'>We are really happy to see you again!</div>
            </div>
            <UserInput
               control={control}
               name='email'
               onChange={handleInputChange}
               className='login__form--input'
               fieldErrorClassname='login__form--error'
               type='text'
               placeholder='Enter Your e-mail address'
               rules={{
                  required: 'Email address is required.',
                  validate: {
                     matchPattern: IS_VALID_EMAIL,
                  },
               }}
            >
               <CiUser className='login__form--icon' />
            </UserInput>
            <UserInput
               control={control}
               eError={error?.message}
               onChange={handleInputChange}
               name='password'
               className='login__form--input'
               fieldErrorClassname='login__form--error'
               type='password'
               placeholder='Enter Your password'
               rules={{
                  required: 'Password is required.',
                  minLength: {
                     value: 8,
                     message: 'Password needs a minimum of 8 characters',
                  },
               }}
            >
               <CiUnlock className='login__form--icon' />
            </UserInput>

            {error && (
               <p className='login__form--error'>{error.message || 'Something went wrong. Please try again.'}</p>
            )}
            <Button onClick={handleSubmit(handleSubmitForm)} disabled={isLogging} className='btn btn--primary'>
               Log in now
            </Button>
            <Button onClick={() => navigate('/signup')} disabled={isLogging} className='btn btn--secondary'>
               Don't you have an account yet? Register now!
            </Button>
            <NavLink to='/' className='login__form--forgotPassword'>
               Forgot my password 😞
            </NavLink>
         </form>
      </div>
   );
}
