import { CiUnlock, CiUser } from 'react-icons/ci';
import Button from '../../ui/Buttons/Button';
import { useForm } from 'react-hook-form';
import UserInput from '../../ui/UserInteractions/UserInput';
import { IS_VALID_EMAIL, getErrorMessage, handleError } from '../../utils/helpers';
import { NavLink, useNavigate } from 'react-router-dom';
import IError from '../../interfaces/IError';
import { useState } from 'react';
import { setCredentials } from './slices/auth/authSlice';
import { useAppDispatch } from '../../redux-hooks';
import { useLoginMutation } from './slices/auth/authApiSlice';
import PasswordVisible from '../../ui/PasswordVisible';
import FormIcon from '../../ui/FormIcon';

export default function SignIn() {
   const navigate = useNavigate();
   const dispatch = useAppDispatch();
   const [loginApi, { isLoading }] = useLoginMutation();
   const { control, handleSubmit } = useForm();
   const [error, setError] = useState<string | IError | null>(null);
   const [isVisible, setIsVisible] = useState(false);

   const handleInputChange = () => {
      setError(null);
   };
   const handleSubmitForm = async (data: object) => {
      try {
         const res = await loginApi(data).unwrap();
         dispatch(setCredentials({ ...res }));

         navigate('/');
      } catch (error) {
         setError(() => getErrorMessage(error));
      }
   };

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
               eError={handleError(error, 'email')}
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
               <FormIcon tooltip='Enter Your e-mail address'>
                  <CiUser className='login__form--icon' />
               </FormIcon>
            </UserInput>
            <UserInput
               control={control}
               id='password'
               eError={handleError(error, 'password')}
               onChange={handleInputChange}
               name='password'
               className='login__form--input'
               fieldErrorClassname='login__form--error'
               type={isVisible ? 'text' : 'password'}
               placeholder='Enter Your password'
               rules={{
                  required: 'Password is required.',
                  minLength: {
                     value: 8,
                     message: 'Password needs a minimum of 8 characters',
                  },
               }}
            >
               <FormIcon tooltip='Enter Your password'>
                  <CiUnlock className='login__form--icon' />
               </FormIcon>
               <PasswordVisible className='login__form--icon' isVisible={isVisible} setIsVisible={setIsVisible} />
            </UserInput>

            {error && typeof error !== 'object' && <p className='login__form--error'>{error}</p>}

            <Button onClick={handleSubmit(handleSubmitForm)} disabled={isLoading} className='btn btn--primary'>
               Log in now
            </Button>
            <Button onClick={() => navigate('/signup')} disabled={isLoading} className='btn btn--secondary'>
               Don't you have an account yet? Register now!
            </Button>
            <NavLink to='/forgot-password' className='login__form--forgotPassword'>
               Forgot my password 😞
            </NavLink>
         </form>
      </div>
   );
}
