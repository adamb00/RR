import { useAuth } from '../../context/AuthContext';

export default function AvailablePoints() {
   const { user } = useAuth();
   return (
      <div className='home__points'>
         You have <span className='home__points--point'>{user?.availablePoints} </span>available points of total
         <span className='home__points--point'> {user?.accumulatedPoints}.</span>
      </div>
   );
}
