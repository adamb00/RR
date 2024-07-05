import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUser, updateUser } from '../Auth/slices/auth/authSlice';
import { useTranslation } from 'react-i18next';
import { useCookies } from 'react-cookie';
import Button from '@/ui/Buttons/Button';
import { useUpdateUserMutation } from '../Auth/slices/user/userApiSlice';
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
   const [updateUserAPI] = useUpdateUserMutation();
   const dispatch = useDispatch();

   const handleExchangePoints = async () => {
      const data = { lastAsk: Date.now(), hasActiveAsk: true };
      const res = await updateUserAPI({ id: user._id, data }).unwrap();
      dispatch(updateUser({ ...res.data.data }));
   };

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
            <span className='home__points--point'>{user.availablePoints}</span>
            {second}
            <span className='home__points--point'>{user.accumulatedPoints}</span>
            {cookies.i18next === 'hu' && thirdD}
         </div>
         {user.availablePoints > 20 && (
            <Button
               onClick={handleExchangePoints}
               disabled={user.availablePoints < 20}
               className='home__points--button'
            >
               Pontok beváltása
            </Button>
         )}
         <Information className='home__information' cont={content} />
      </div>
   );
}
