import { Outlet, useLocation, useNavigation, useParams } from 'react-router-dom';
import Loader from './Loader';
import Header from './Header';

export default function AppLayout() {
   const navigation = useNavigation();
   const isLoading = navigation.state === 'loading';
   const location = useLocation();

   const { id } = useParams();
   const isNotification = location.pathname.includes('notifications');
   const hasDynamicId = !!id;

   return (
      <>
         {isLoading && <Loader />}
         <main>
            {(!hasDynamicId || isNotification) && <Header />}
            <Outlet />
         </main>
      </>
   );
}
