import { Outlet, useParams } from 'react-router-dom';

import Header from './Header';
import { useIsNotification } from '../hooks/useIsNotification';
import { useAppDispatch, useAppSelector } from '../redux-hooks';
import { memo, useCallback, useEffect } from 'react';
import { fetchNotifications, fetchSocketNotification, setImage } from '../features/Auth/slices/user/userSlice';

import io from 'socket.io-client';
import INotification from '../interfaces/INotification';
import { useFetchNotificationsMutation } from '../features/Auth/slices/user/userApiSlice';
import { UserProfileData } from '../interfaces/AuthInterfaces';
// import { BASE_URL_SOCKET } from '../utils/constants';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../features/Auth/slices/auth/authSlice';
import { getUserImage } from '../services/apiUser';

const socket = io(import.meta.env.VITE_BASE_URL_SOCKET);

export default memo(function AppLayout() {
   const { id } = useParams();
   const { isNotification } = useIsNotification();
   const hasDynamicId = !!id;
   const dispatch = useAppDispatch();
   const [fetchNotificationsApi] = useFetchNotificationsMutation();
   const user = useSelector(selectCurrentUser);
   const userImage = useAppSelector(state => state.user.image);

   const isNotificationsFetched = useAppSelector(state => state.user.isNotificationsFetched);

   const handleNotificationCreated = useCallback(
      (data: INotification) => {
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

   const fetchUserImage = useCallback(async () => {
      if (!userImage) {
         const image = await getUserImage(user?.photo);
         dispatch(setImage(image));
      }
   }, [user, dispatch, userImage]);

   useEffect(() => {
      socket.on('notification_created', handleNotificationCreated);

      if (!isNotificationsFetched && user) {
         fetchNotificationsForUser(user as UserProfileData);
      }

      if (user) fetchUserImage();

      return () => {
         socket.off('notification_created', handleNotificationCreated);
      };
   }, [dispatch, fetchNotificationsForUser, fetchUserImage, handleNotificationCreated, isNotificationsFetched, user]);

   return (
      <>
         <main>
            {(!hasDynamicId || isNotification) && <Header />}
            <Outlet />
         </main>
      </>
   );
});
