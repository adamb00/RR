import ISystemNotifications from '@/interfaces/ISystemNotifications';

export default function SystemNotificationItem({ notification }: { notification: ISystemNotifications }) {
   return (
      <div className='system-notifications__item'>
         You have achieved {notification.points} points by {notification.name}!
      </div>
   );
}
