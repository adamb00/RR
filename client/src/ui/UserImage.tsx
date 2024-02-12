import { memo, useEffect, useState } from 'react';
import { useGetUserImage } from '../features/Auth/useUserAuth';
import Loader from './Loader';
import { UserProfileData } from '../interfaces/AuthInterfaces';

interface UserImageProps {
   user: UserProfileData | null;
}

export default memo(function UserImage({ user }: UserImageProps) {
   const { image, isLoading } = useGetUserImage((user && user.photo) || '');
   const [userImage, setUserImage] = useState<string>();

   useEffect(() => {
      if (image) setUserImage(image);
   }, [image, user]);

   if (isLoading) return <Loader size={100} />;

   if (!image) return;

   return <img src={userImage} alt='User image' />;
});
