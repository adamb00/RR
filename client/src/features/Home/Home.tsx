import { useSelector } from 'react-redux';
import HomeAuth from './HomeAuth';
import HomeNoAuth from './HomeNoAuth';
import { selectCurrentUser } from '../Auth/slices/auth/authSlice';

export default function Home() {
   const user = useSelector(selectCurrentUser);

   console.log(process.env.BASE_URL);
   console.log('vite', process.env.NODE_ENV);
   console.log('try', process.env.REACT_APP_BASE_URL);
   console.log('try', process.env.REACT_APP_NODE_ENV);

   return <div className='home'>{user ? <HomeAuth /> : <HomeNoAuth />}</div>;
}
