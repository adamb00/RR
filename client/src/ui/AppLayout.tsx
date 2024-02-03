import { Outlet, useNavigation, useParams } from 'react-router-dom';
import Loader from './Loader';
import Header from './Header';
import { useIsNotification } from '../hooks/useIsNotification';
import { useAppDispatch } from '../redux-hooks';
import { useCallback, useEffect } from 'react';
import { setUser } from '../features/Auth/slices/auth/authSlice';
import { useGetCurrentUserMutation } from '../features/Auth/slices/auth/authApiSlice';
import { fetchNotifications } from '../features/Auth/slices/user/userSlice';

import { useFetchNotificationsMutation } from '../features/Auth/slices/user/userApiSlice';

export default function AppLayout() {
   const navigation = useNavigation();
   const isLoading = navigation.state === 'loading';
   const { id } = useParams();
   const { isNotification } = useIsNotification();
   const [getUser] = useGetCurrentUserMutation();
   const hasDynamicId = !!id;
   const dispatch = useAppDispatch();
   const [fetchNotificationsApi] = useFetchNotificationsMutation();

   const fetchNotificationsForUser = useCallback(
      async (user: { notifications: { read: boolean; _id: string }[] }) => {
         const fetchedNotifications = await Promise.all(
            user.notifications.map(async (notification: { read: boolean; _id: string }) => {
               const res = await fetchNotificationsApi(notification._id).unwrap();
               return { ...res.doc, read: notification.read };
            })
         );
         dispatch(fetchNotifications(fetchedNotifications));
      },
      [dispatch, fetchNotificationsApi]
   );

   useEffect(() => {
      const initializeApp = async () => {
         try {
            const storedUser = sessionStorage.getItem('user');

            if (storedUser) {
               const user = await getUser({}).unwrap();

               if (user.currentUser && user.currentUser.notifications) {
                  dispatch(setUser(user.currentUser));
                  await fetchNotificationsForUser(user.currentUser);
               } else {
                  console.error('User data is incomplete:', user);
               }
            }
         } catch (error) {
            console.error('Error initializing the app:', error);
         }
      };

      initializeApp();
   }, [dispatch, getUser, fetchNotificationsForUser]);

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
