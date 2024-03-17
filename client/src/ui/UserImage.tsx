import { useEffect, useState } from 'react';
import { getUserImage } from '../services/apiUser';
import { UserProfileData } from '../interfaces/AuthInterfaces';
import Loader from './Loader';

interface UserImageProps {
   user?: UserProfileData;
}

export default function UserImage({ user }: UserImageProps) {
   const userPhoto = user?.photo;
   const [userImage, setUserImage] = useState<string | undefined>(userPhoto);
   const [isLoading, setIsLoading] = useState<boolean>(false);

   console.log(userPhoto);

   useEffect(() => {
      const fetchUserImage = async () => {
         try {
            if (userPhoto) {
               setIsLoading(true);
               const image = await getUserImage(userPhoto);
               setUserImage(image);
            }
         } catch (error) {
            console.error('Error fetching user image:', error);
         } finally {
            setIsLoading(false);
         }
      };

      fetchUserImage();
   }, [userPhoto]);

   if (isLoading) return <Loader size={100} />;
   if (!userImage) return <div>No image available</div>;

   return <img src={userImage} alt='User image' />;
}
