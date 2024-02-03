import { Outlet, useNavigation, useParams } from 'react-router-dom';
import Loader from './Loader';
import Header from './Header';
import { useIsNotification } from '../hooks/useIsNotification';
import { useAppDispatch } from '../redux-hooks';
import { useEffect } from 'react';
import { setUser } from '../features/Auth/slices/authSlice';
import { useGetCurrentUserMutation } from '../features/Auth/slices/usersApiSlice';

export default function AppLayout() {
   const navigation = useNavigation();
   const isLoading = navigation.state === 'loading';
   const { id } = useParams();
   const { isNotification } = useIsNotification();
   const [getUser] = useGetCurrentUserMutation();
   const hasDynamicId = !!id;
   const dispatch = useAppDispatch();

   useEffect(() => {
      const initializeApp = async () => {
         try {
            const storedUser = sessionStorage.getItem('user');

            if (storedUser) {
               const user = await getUser({}).unwrap();

               dispatch(setUser(user.currentUser));
            }
         } catch (error) {
            console.error('Error initializing the app:', error);
         }
      };

      initializeApp();
   }, [dispatch, getUser]);

   return (
      <>
         {isLoading && <Loader size={250} />}
         <main>
            {(!hasDynamicId || isNotification) && <Header />}
            <Outlet />
         </main>
      </>
   );
}
