import { useAppSelector } from '../../redux-hooks';

export default function AvailablePoints() {
   const user = useAppSelector(state => state.auth.user);

   return (
      <div className='home__points'>
         You have <span className='home__points--point'>{user?.availablePoints} </span>available points of total
         <span className='home__points--point'> {user?.accumulatedPoints}.</span>
      </div>
   );
}
