import { useAuth } from '../../context/AuthContext';
import HomeAuth from './HomeAuth';
import HomeNoAuth from './HomeNoAuth';

export default function Home() {
   const { user } = useAuth();

   return <div className='home'>{user ? <HomeAuth /> : <HomeNoAuth />}</div>;
}
