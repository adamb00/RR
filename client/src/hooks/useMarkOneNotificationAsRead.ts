import { useDispatch } from 'react-redux';
import { useMarkNotificationMutation } from '../features/Auth/slices/user/userApiSlice';
import { markOneNotificationAsRead } from '../features/Auth/slices/auth/authSlice';

export const useMarkOneNotificationAsRead = (id?: string) => {
   const [markNotificationApi] = useMarkNotificationMutation();
   const dispatch = useDispatch();

   const handleOnMarkOneNotificationAsRead = async () => {
      try {
         const res = await markNotificationApi({ id }).unwrap();
         dispatch(markOneNotificationAsRead({ ...res }));
      } catch (err) {
         console.log(err);
      }
   };

   return handleOnMarkOneNotificationAsRead;
};
