import { useForm } from 'react-hook-form';
import UserImageInput from '@/ui/UserInteractions/UserImageInput';
import { useUploadUserImageMutation } from '@/features/Auth/slices/user/userApiSlice';
import { useState } from 'react';
import { useAppDispatch } from '@/redux-hooks';

import { selectCurrentUser, updateUser } from '@/features/Auth/slices/auth/authSlice';
import { useSelector } from 'react-redux';
import Loader from '@/ui/Loader';
import { useGetImage } from '@/hooks/useGetImage';

export default function UploadImage() {
   const [uploading, setUploading] = useState(false);
   const { control } = useForm();
   const [uploadUserImageApi] = useUploadUserImageMutation();
   const dispatch = useAppDispatch();
   const user = useSelector(selectCurrentUser);

   const { image: userImage, isLoading: isLoadingUserImage } = useGetImage(user);
   const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
      const image = event.target.files?.[0];

      if (image && !uploading) {
         setUploading(true);
         const formData = new FormData();
         formData.append('image', image);

         if (formData.has('image')) {
            try {
               const res = await uploadUserImageApi(formData).unwrap();
               dispatch(updateUser({ ...res.data.user }));
            } catch (error) {
               console.error('Error uploading image:', error);
            } finally {
               setUploading(false);
            }
         }
      }
   };

   return (
      <UserImageInput
         control={control}
         name='image'
         className='upload-image__container'
         onChange={handleImageChange}
         id={user._id}
      >
         <label className='upload-image' htmlFor={user._id}>
            {isLoadingUserImage || uploading ? (
               <Loader size={100} />
            ) : user.photo ? (
               <img src={userImage} alt='User Image' className='upload-image__image' />
            ) : (
               '+'
            )}
         </label>
      </UserImageInput>
   );
}
