import { useMarkNotificationMutation } from '../features/Auth/slices/user/userApiSlice';
import { markNotificationAsRead } from '../features/Auth/slices/user/userSlice';
import { useAppDispatch } from '../redux-hooks';

export const useMarkOneNotificationAsRead = (id: string) => {
   const [markNotificationApi] = useMarkNotificationMutation();
   const dispatch = useAppDispatch();

   const handleOnMarkOneNotificationAsRead = async () => {
      try {
         const res = await markNotificationApi({ id }).unwrap();
         dispatch(markNotificationAsRead({ ...res }));
      } catch (err) {
         console.log(err);
      }
   };

   return handleOnMarkOneNotificationAsRead;
};
