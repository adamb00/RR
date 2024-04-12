import { Routes, Route } from 'react-router-dom';
import AppLayout from './ui/AppLayout';
import RequireAuth from './ui/RequireAuth';
import Links from './features/Links/Links';
import Login from './features/Auth/Login';
import { selectCurrentUser } from './features/Auth/slices/auth/authSlice';
import { useSelector } from 'react-redux';
import Notifications from './features/Notifications/Notifications';
import Account from './features/Account/Account';

export default function App() {
   const user = useSelector(selectCurrentUser);
   return (
      <Routes>
         <Route path='/' element={<AppLayout />}>
            {!user && <Route path='/' element={<Login />} />}
            {user && (
               <Route element={<RequireAuth allowedRoles={['Admin']} />}>
                  <Route path='/' element={<Links />} />
                  <Route path='/notifications' element={<Notifications />} />
                  <Route path='/account' element={<Account />} />
               </Route>
            )}
         </Route>
      </Routes>
   );
}
