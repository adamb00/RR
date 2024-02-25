import { useSelector } from 'react-redux';
import HomeAuth from './HomeAuth';
import HomeNoAuth from './HomeNoAuth';
import { selectCurrentUser } from '../Auth/slices/auth/authSlice';

export default function Home() {
   const user = useSelector(selectCurrentUser);

   console.log(import.meta.env.REACT_APP_NODE_ENV);

   console.log('try', import.meta.env.REACT_APP_BASE_URL);
   console.log('try', import.meta.env.REACT_APP_NODE_ENV);

   return <div className='home'>{user ? <HomeAuth /> : <HomeNoAuth />}</div>;
}
