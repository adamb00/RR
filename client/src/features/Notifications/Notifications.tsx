import NotificationsAdmin from './NotificationsAdmin';
import NotificationItem from './NotificationItem';
import { useAppSelector } from '../../redux-hooks';
import { useSelector } from 'react-redux';
import { selectIsAdmin } from '../Auth/slices/auth/authSlice';
import { useTranslation } from 'react-i18next';

export default function Notifications() {
   const isAdmin = useSelector(selectIsAdmin);
   const notifications = useAppSelector(state => state.user.notifications);
   const { t } = useTranslation();
   if ((!notifications || notifications.length < 1) && !isAdmin)
      return <h1 className='heading-primary'>{t('Currently you have no notifciations')}</h1>;

   return isAdmin ? <NotificationsAdmin /> : <NotificationItem />;
}
