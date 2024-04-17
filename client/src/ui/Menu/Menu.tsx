import { useAppSelector } from '@/redux-hooks';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

export default function Menu() {
   const { t } = useTranslation();
   const notifications = useAppSelector(state => state.auth.user?.notifications) || [];

   return (
      <div className='menu'>
         <nav className='menu__nav'>
            <ul className='menu__list'>
               <NavLink
                  to='personal'
                  className={({ isActive }) => (isActive ? 'menu__item menu__item--active' : 'menu__item')}
               >
                  {t('Personal information')}
               </NavLink>
               <NavLink
                  to={`notifications/${notifications.length > 0 ? notifications[0]._id : ''}`}
                  className={({ isActive }) => (isActive ? 'menu__item menu__item--active' : 'menu__item')}
               >
                  {t('Notifications')}
               </NavLink>
               <NavLink
                  to='security'
                  className={({ isActive }) => (isActive ? 'menu__item menu__item--active' : 'menu__item')}
               >
                  {t('Security')}
               </NavLink>
            </ul>
         </nav>
      </div>
   );
}
