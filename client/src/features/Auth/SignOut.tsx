import Button from '../../ui/Buttons/Button';
import { logout } from './slices/authSlice';
import { useAppDispatch } from '../../redux-hooks';
import { useLogoutMutation } from './slices/usersApiSlice';
import { useNavigate } from 'react-router-dom';

export default function SignOut() {
   const dispatch = useAppDispatch();
   const [logoutApi] = useLogoutMutation();
   const navigate = useNavigate();

   const handleLogout = async () => {
      await logoutApi({}).unwrap();
      dispatch(logout());
      navigate('/');
   };
   return (
      <Button onClick={handleLogout} className='btn btn--primary'>
         Log out
      </Button>
   );
}
