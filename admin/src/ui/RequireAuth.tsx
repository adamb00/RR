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

   // If user is not authenticated, redirect to the login page
   if (!token) {
      return <Navigate to='/' replace />;
   }

   // If user is authenticated but doesn't have the required role, redirect to unauthorized page
   if (!allowedRoles.includes(user.role)) {
      return <Navigate to='/' state={{ from: location }} replace />;
   }

   // If user is authenticated and has the required role, render the child routes
   return <Outlet />;
}
