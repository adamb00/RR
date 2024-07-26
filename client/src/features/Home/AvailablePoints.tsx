import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../Auth/slices/auth/authSlice';
import { useTranslation } from 'react-i18next';
import { useCookies } from 'react-cookie';

import Information from '@/ui/Information';
import { useNavigate } from 'react-router-dom';
import { primaryColor } from '@/utils/constants';

export default function AvailablePoints() {
   const [cookies] = useCookies(['i18next']);
   const navigate = useNavigate();

   const user = useSelector(selectCurrentUser);
   const { t } = useTranslation();
   const [first, second, third] = t('AvailablePoints').split('$$');
   let thirdD = third;
   user.accumulatedPoints === 0 ? (thirdD = '-ból.') : (thirdD = '-ből.');

   const handleNavigateToWallet = () => {
      navigate('/account/personal#trc20');
   };

   const content = (
      <>
         <p>A jelenleg elérhető pontok és az eddig összegyűjtött pontok.</p>
         <p>
            A kiutalás akár 24-48 órát is igénybe vehet. A kiutaláshoz szükséges egy aktív{' '}
            <span onClick={handleNavigateToWallet} style={{ color: primaryColor }}>
               TRC20 tárca
            </span>
            .
         </p>
         <p>Minimum kiutalás 20$-tól. Csak egész értékeket tudunk kiutalni</p>
      </>
   );

   return (
      <div className='home__points'>
         <div>
            {first}
            <span className='home__points--point'>
               {user.availablePoints < 1 ? user.availablePoints.toFixed(1) : user.availablePoints}
            </span>
            {second}
            <span className='home__points--point'>
               {user.availablePoints > 1 ? user.accumulatedPoints.toFixed(1) : user.availablePoints}
            </span>
            {cookies.i18next === 'hu' && thirdD}
         </div>

         <Information className='home__information' cont={content} />
      </div>
   );
}
