import { useAppSelector } from '../../redux-hooks';
import HomeAuth from './HomeAuth';
import HomeNoAuth from './HomeNoAuth';

export default function Home() {
   const user = useAppSelector(state => state.auth.user);

   return <div className='home'>{user ? <HomeAuth /> : <HomeNoAuth />}</div>;
}
