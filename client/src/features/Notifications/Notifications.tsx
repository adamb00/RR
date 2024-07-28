import NotificationItem from './NotificationItem';
import { useAppSelector } from '../../redux-hooks';
import { useTranslation } from 'react-i18next';

export default function Notifications() {
   const notifications = useAppSelector(state => state.auth.user?.notifications);
   const { t } = useTranslation();
   if (!notifications || notifications.length < 1)
      return <h1 className='heading-primary'>{t('Currently you have no notification')}</h1>;

   return <NotificationItem />;
}
