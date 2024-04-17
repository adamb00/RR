import { IoIosArrowRoundBack } from 'react-icons/io';

import INotification from '@/interfaces/INotification';
import { useAppSelector } from '@/redux-hooks';
import { NavLink } from 'react-router-dom';

export default function NotificationsMenu() {
   const notifications = useAppSelector(state => state.auth.user?.notifications);
   if (!notifications) return;
   return (
      <div className='menu'>
         <nav className='menu__nav'>
            <ul className='menu__list'>
               <NavLink to='personal' className='menu__go-back'>
                  <IoIosArrowRoundBack />
               </NavLink>
               {notifications.map((notification: INotification) => (
                  <NavLink
                     key={notification._id}
                     className={({ isActive }) => (isActive ? 'menu__item menu__item--active' : 'menu__item')}
                     to={`notifications/${notification._id}`}
                  >
                     {notification.title}
                  </NavLink>
               ))}
            </ul>
         </nav>
      </div>
   );
}
