// import { Outlet, useParams } from 'react-router-dom';
// import Header from './Header';
// import { useIsNotification } from '../hooks/useIsNotification';
// import { socket } from '@/utils/constants';
// import { useEffect } from 'react';
// import { useRefreshUserMutation } from '@/features/Auth/slices/auth/authApiSlice';
// import { useDispatch } from 'react-redux';
// import { updateUser } from '@/features/Auth/slices/auth/authSlice';

import TestComp from '@/utils/TestComp';

export default function AppLayout() {
   // const { username } = useParams();
   // const { isNotification } = useIsNotification();
   // const hasDynamicId = !!username;
   // const [refreshUser] = useRefreshUserMutation();
   // const dispatch = useDispatch();

   // useEffect(() => {
   //    const handleNotification = async () => {
   //       const res = await refreshUser({}).unwrap();
   //       dispatch(updateUser(res.data));
   //    };

   //    socket.on('notification_created', handleNotification);

   //    return () => {
   //       socket.off('notification_created', handleNotification);
   //    };
   // }, [dispatch, refreshUser]);
   return (
      <>
         <TestComp />
         {/* <main className='main'>
            {(!hasDynamicId || isNotification) && <Header />}
            <Outlet />
         </main> */}
      </>
   );
}
