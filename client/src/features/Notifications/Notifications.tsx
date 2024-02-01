import { Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import NotificationsAdmin from './NotificationsAdmin';

export default function Notifications() {
   const { isAdmin } = useAuth();
   return isAdmin ? <NotificationsAdmin /> : <Outlet />;
}
