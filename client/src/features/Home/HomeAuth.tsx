import { useAuth } from '../../context/AuthContext';
import ShareLinks from '../Links/ShareLinks';
import Team from './Team';

export default function HomeAuth() {
   const { user } = useAuth();

   return (
      <>
         {user?.role === 'Admin' ? <ShareLinks /> : <p>Regular user</p>}
         <Team />
      </>
   );
}
