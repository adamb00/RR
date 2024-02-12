import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../Auth/slices/auth/authSlice';

export default function AvailablePoints() {
   const user = useSelector(selectCurrentUser);

   return (
      <div className='home__points'>
         You have <span className='home__points--point'>{user?.availablePoints} </span>available points of total
         <span className='home__points--point'> {user?.accumulatedPoints}.</span>
      </div>
   );
}
