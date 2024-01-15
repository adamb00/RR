import { Outlet, useNavigation } from 'react-router-dom';
import Loader from './Loader';
import Header from './Header';

export default function AppLayout() {
   const navigation = useNavigation();
   const isLoading = navigation.state === 'loading';

   return (
      <>
         {isLoading && <Loader />}
         <main>
            <Header />
            <Outlet />
         </main>
      </>
   );
}
