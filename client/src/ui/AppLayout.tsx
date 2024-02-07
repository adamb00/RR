import { Outlet, useNavigation, useParams } from 'react-router-dom';
import Loader from './Loader';
import Header from './Header';
import { useIsNotification } from '../hooks/useIsNotification';
import { useAppDispatch, useAppSelector } from '../redux-hooks';
import { useCallback, useEffect } from 'react';
import { setUser } from '../features/Auth/slices/auth/authSlice';
import { useGetCurrentUserMutation } from '../features/Auth/slices/auth/authApiSlice';
import { fetchNotifications, fetchSocketNotification } from '../features/Auth/slices/user/userSlice';

import io from 'socket.io-client';
import INotification from '../interfaces/INotification';
import { useFetchNotificationsMutation } from '../features/Auth/slices/user/userApiSlice';
import { UserProfileData } from '../interfaces/AuthInterfaces';
import { BASE_URL_SOCKET } from '../utils/helpers';

const socket = io(BASE_URL_SOCKET);

export default function AppLayout() {
   const navigation = useNavigation();
   const isLoading = navigation.state === 'loading';
   const { id } = useParams();
   const { isNotification } = useIsNotification();
   const [getUser] = useGetCurrentUserMutation();
   const hasDynamicId = !!id;
   const dispatch = useAppDispatch();
   const [fetchNotificationsApi] = useFetchNotificationsMutation();
   const user = useAppSelector(state => state.auth.user);

   const handleNotificationCreated = useCallback(
      (data: INotification) => {
         console.log(data);
         dispatch(fetchSocketNotification({ ...data, read: false }));
      },
      [dispatch]
   );

   const fetchNotificationsForUser = useCallback(
      async (user: { notifications: { read: boolean; _id: string }[] }) => {
         if (user) {
            const fetchedNotifications = await Promise.all(
               user.notifications.map(async (notification: { read: boolean; _id: string }) => {
                  const res = await fetchNotificationsApi(notification._id).unwrap();
                  return { ...res.doc, read: notification.read };
               })
            );
            dispatch(fetchNotifications(fetchedNotifications));
         }
      },
      [dispatch, fetchNotificationsApi]
   );

   useEffect(() => {
      socket.on('notification_created', handleNotificationCreated);
      fetchNotificationsForUser(user as UserProfileData);

      return () => {
         socket.off('notification_created', handleNotificationCreated);
      };
   }, [fetchNotificationsForUser, handleNotificationCreated, user]);

   useEffect(() => {
      const initializeApp = async () => {
         try {
            const storedUser = sessionStorage.getItem('user');

            if (storedUser) {
               const user = await getUser({}).unwrap();

               if (user.currentUser && user.currentUser.notifications) {
                  dispatch(setUser(user.currentUser));
               } else {
                  console.error('User data is incomplete:', user);
               }
            }
         } catch (error) {
            console.error('Error initializing the app:', error);
         }
      };

      initializeApp();

      const intervalId = setInterval(() => {
         initializeApp();
      }, 10000);

      return () => {
         clearInterval(intervalId);
      };
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
