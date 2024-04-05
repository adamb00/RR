import { PropsWithChildren, useEffect, useState } from 'react';
import { getUserImage } from '../services/apiUser';
import { UserProfileData } from '../interfaces/AuthInterfaces';

interface UserImageProps {
   user?: UserProfileData;
}

export default function UserImage({ user, children }: PropsWithChildren<UserImageProps>) {
   const userPhoto = user!.photo;
   const [userImage, setUserImage] = useState<string | undefined>(userPhoto);
   const [isLoading, setIsLoading] = useState<boolean>(false);

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

   if (isLoading) return <>{children}</>;
   if (!userImage) return;

   return <img src={userImage} alt='User image' />;
}
