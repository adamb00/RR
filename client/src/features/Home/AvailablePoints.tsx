import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../Auth/slices/auth/authSlice';
import { useTranslation } from 'react-i18next';
import { useCookies } from 'react-cookie';

export default function AvailablePoints() {
   const [cookies] = useCookies(['i18next']);

   const user = useSelector(selectCurrentUser);
   const { t } = useTranslation();
   const [first, second, third] = t('AvailablePoints').split('$$');
   let thirdD = third;
   user.accumulatedPoints === 0 ? (thirdD = '-ból.') : (thirdD = '-ből.');

   return (
      <div className='home__points'>
         {first}
         <span className='home__points--point'>{user.availablePoints}</span>
         {second}
         <span className='home__points--point'>{user.accumulatedPoints}</span>
         {cookies.i18next === 'hu' && thirdD}
      </div>
   );
}
