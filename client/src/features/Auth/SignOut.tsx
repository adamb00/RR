import Button from '../../ui/Buttons/Button';
import { logout } from './slices/auth/authSlice';
import { useAppDispatch } from '../../redux-hooks';
import { useLogoutMutation } from './slices/auth/authApiSlice';
import { useNavigate } from 'react-router-dom';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

export default memo(function SignOut() {
   const dispatch = useAppDispatch();
   const [logoutApi] = useLogoutMutation();
   const navigate = useNavigate();
   const { t } = useTranslation();

   const handleLogout = async () => {
      await logoutApi({}).unwrap();
      dispatch(logout());
      navigate('/');
   };
   return (
      <Button onClick={handleLogout} className='btn btn--primary'>
         {t('Log out')}
      </Button>
   );
});
