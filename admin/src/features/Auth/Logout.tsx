import Button from '@/ui/Buttons/Button';
import { logout } from './slices/auth/authSlice';
import { useAppDispatch } from '@/utils/redux-hooks';
import { useLogoutMutation } from './slices/auth/authApiSlice';
import { useNavigate } from 'react-router-dom';

export default function SignOut() {
   const dispatch = useAppDispatch();
   const [logoutApi, { isLoading }] = useLogoutMutation();
   const navigate = useNavigate();

   const handleLogout = async () => {
      await logoutApi({}).unwrap();
      dispatch(logout());
      navigate('/');
   };
   return (
      <Button disabled={isLoading} onClick={handleLogout}>
         Kijelentkezés
      </Button>
   );
}
