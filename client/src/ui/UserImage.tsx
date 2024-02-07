import { useAppSelector } from '../redux-hooks';
import { useGetUserImage } from '../features/Auth/useUserAuth';

export default function UserImage() {
   const user = useAppSelector(state => state.auth.user);
   const { image } = useGetUserImage(user?.photo as string);

   if (!image) return;

   return (
      <div className='user-image'>
         <img src={image} alt='User image' />
      </div>
   );
}
