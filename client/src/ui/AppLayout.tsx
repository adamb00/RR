import { Outlet, useParams } from 'react-router-dom';

import Header from './Header';
import { useIsNotification } from '../hooks/useIsNotification';
import { useAppDispatch } from '../redux-hooks';
import { memo, useCallback, useEffect, useState } from 'react';

import io from 'socket.io-client';
import INotification from '../interfaces/INotification';
import { useFetchNotificationsMutation } from '../features/Auth/slices/user/userApiSlice';
import { useSelector } from 'react-redux';
import { selectCurrentUser, updateUser } from '../features/Auth/slices/auth/authSlice';

const socket = io(import.meta.env.VITE_BASE_URL_SOCKET);

export default memo(function AppLayout() {
   const { id } = useParams();
   const { isNotification } = useIsNotification();
   const hasDynamicId = !!id;
   const dispatch = useAppDispatch();
   const [fetchNotificationsApi] = useFetchNotificationsMutation();
   const [notificationsFetched, setNotificationsFetched] = useState(false);
   const user = useSelector(selectCurrentUser);

   const handleNotificationCreated = useCallback(
      async (data: INotification) => {
         if (user && user.notifications) {
            try {
               const fetchedNotifications = await Promise.all(
                  user.notifications.map(async (notification: { read: boolean; _id: string }) => {
                     const res = await fetchNotificationsApi(notification._id).unwrap();
                     return { ...res.doc, read: notification.read };
                  })
               );
               const sortedNotifications = fetchedNotifications.sort((a, b) => {
                  return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
               });

               const updatedNotifications = [...sortedNotifications, { ...data, read: false }];

               const newUser = { ...user, notifications: updatedNotifications };
               dispatch(updateUser(newUser));
            } catch (error) {
               console.error('Error fetching notifications:', error);
            }
         }
      },
      [dispatch, fetchNotificationsApi, user]
   );

   const fetchNotificationsForUser = useCallback(
      async (user: { notifications: { read: boolean; _id: string }[]; role: string }) => {
         if (user && user.role !== 'Admin') {
            const fetchedNotifications = await Promise.all(
               user.notifications.map(async (notification: { read: boolean; _id: string }) => {
                  const res = await fetchNotificationsApi(notification._id).unwrap();
                  return { ...res.doc, read: notification.read };
               })
            );
            const sortedNotifications = fetchedNotifications.sort((a, b) => {
               return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
            });
            const updatedNotifications = [...sortedNotifications];

            const newUser = { ...user, notifications: updatedNotifications };

            dispatch(updateUser(newUser));
         }
      },
      [dispatch, fetchNotificationsApi]
   );

   if (!notificationsFetched && user) {
      fetchNotificationsForUser(user);
      setNotificationsFetched(true);
   }

   useEffect(() => {
      socket.on('notification_created', handleNotificationCreated);

      return () => {
         socket.off('notification_created', handleNotificationCreated);
      };
   }, [dispatch, fetchNotificationsForUser, handleNotificationCreated, notificationsFetched, setNotificationsFetched, user]);

   return (
      <>
         <main className='main'>
            {(!hasDynamicId || isNotification) && <Header />}
            <Outlet />
         </main>
      </>
   );
});
