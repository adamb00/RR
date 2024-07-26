// import { useEffect, useState } from 'react';
// import { getImage } from '@/services/apiImage';
// import { UserProfileData } from '@/interfaces/AuthInterfaces';
// import { ILink } from '@/interfaces/ILink';

// type ResourceData = UserProfileData | ILink;

// export const useGetImage = <T extends ResourceData>(data: T | undefined) => {
//    const [image, setImage] = useState<string | undefined>(data ? getImagePath(data) : undefined);
//    const [isLoading, setIsLoading] = useState<boolean>(false);
//    useEffect(() => {
//       const fetchDataImage = async () => {
//          try {
//             const imagePath = getImagePath(data);
//             if (data && imagePath) {
//                setIsLoading(true);
//                const fetchedImage = await getImage(imagePath);
//                setImage(fetchedImage);
//             }
//          } catch (err) {
//             console.log(err);
//          } finally {
//             setIsLoading(false);
//          }
//       };

//       fetchDataImage();
//    }, [data]);

//    return { image, isLoading };
// };

// const getImagePath = (data: UserProfileData | ILink | undefined) => {
//    if (data && 'photo' in data) {
//       return data.photo;
//    } else if (data && 'image' in data) {
//       return data.image;
//    }
//    return undefined;
// };
