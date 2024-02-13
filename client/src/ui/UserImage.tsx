import { memo, useEffect } from 'react';
import Loader from './Loader';
import { useAppDispatch, useAppSelector } from '../redux-hooks';
import { setImage } from '../features/Auth/slices/user/userSlice';
import { getUserImage } from '../services/apiUser';
import { UserProfileData } from '../interfaces/AuthInterfaces';

interface UserImageProps {
   user: UserProfileData;
}

export default memo(function UserImage({ user }: UserImageProps) {
   const dispatch = useAppDispatch();
   const userImage = useAppSelector(state => state.user.image);

   useEffect(() => {
      if (!userImage) {
         const fetchUserImage = async () => {
            const image = await getUserImage(user.photo);
            dispatch(setImage(image));
         };
         fetchUserImage();
      }
   }, [dispatch, user.photo, userImage]);

   if (!userImage) return <Loader size={100} />;

   return <img src={userImage} alt='User image' />;
});
