import Button from '@/ui/Buttons/Button';
import UserInput from '@/ui/UserInteractions/UserInput';
import { FieldValues, useForm } from 'react-hook-form';
import { useLoginMutation } from './slices/auth/authApiSlice';
import { useAppDispatch } from '@/utils/redux-hooks';
import { setCredentials } from './slices/auth/authSlice';

export default function Login() {
   const { control, handleSubmit } = useForm();
   const dispatch = useAppDispatch();

   const [loginApi, { isLoading }] = useLoginMutation();

   const handleOnSubmit = async (data: FieldValues) => {
      const res = await loginApi(data).unwrap();
      dispatch(setCredentials({ ...res }));
   };
   return (
      <div className='login'>
         <form onSubmit={handleSubmit(handleOnSubmit)} className='login__form'>
            <UserInput name='email' type='text' control={control} label='Email cím' />
            <UserInput name='password' type='password' control={control} label='Jelszó' />
            <Button disabled={isLoading}>Bejelentkezés</Button>
         </form>
      </div>
   );
}
