import { useLocation, Navigate, Outlet } from 'react-router-dom';

import { selectCurrentToken, selectCurrentUser } from '../features/Auth/slices/auth/authSlice';
import { useSelector } from 'react-redux';
interface RequireAuthProps {
   allowedRoles: string[];
}

export default function RequireAuth({ allowedRoles }: RequireAuthProps) {
   const token = useSelector(selectCurrentToken);
   const user = useSelector(selectCurrentUser);
   const location = useLocation();

   return token && allowedRoles.includes(user.role) ? (
      <Outlet />
   ) : (
      <Navigate to='/unauthorized' state={{ from: location }} replace />
   );
}
