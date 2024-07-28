import ISystemNotifications from '@/interfaces/ISystemNotifications';

export default function SystemNotificationItem({ notification }: { notification: ISystemNotifications }) {
   return (
      <>
         {notification.type === 'Purchase' ? (
            <div className='system-notifications__item'>
               {notification.points} pontot szereztél {notification.name} által!
               {/* You have achieved {notification.points} points by {notification.name}! */}
            </div>
         ) : (
            <div className='system-notifications__item'>{notification.message}</div>
         )}
      </>
   );
}
