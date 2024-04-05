import { useState } from 'react';
import UserImageInput from '@/ui/UserInteractions/UserImageInput';
import Loader from '@/ui/Loader';
import { useUpdateLinkMutation, useUploadLinkImageMutation } from '../linkApiSlice';
import { Control } from 'react-hook-form';
import { ILink } from '@/interfaces/ILink';
import { useLinks } from '@/context/LinkContext';
import UserCheckboxInput from '@/ui/UserInteractions/UserCheckboxInput';
import { socket } from '@/utils/constants';
import { useGetImage } from '@/hooks/useGetImage';

interface LinkAdminUploadImageProps {
   isChecked: boolean;
   isOpen: boolean;
   link: ILink;
   control: Control;
}

export default function LinkAdminUploadImage({ isChecked, control, isOpen, link }: LinkAdminUploadImageProps) {
   const [uploading, setUploading] = useState(false);
   const [uploadLinkImage] = useUploadLinkImageMutation();
   const { updateLink } = useLinks();
   const [updateLinkAPI] = useUpdateLinkMutation();
   const { image: linkImage, isLoading: isLoadingLinkImage } = useGetImage(link);

   const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
      const image = event.target.files?.[0];

      if (image && !uploading) {
         setUploading(true);
         const formData = new FormData();
         formData.append('image', image);

         if (formData.has('image')) {
            try {
               const res = await uploadLinkImage({ data: formData, id: link._id }).unwrap();
               socket.emit('link', { id: link._id, data: { image: res.data.image } });

               updateLink(res.data);
            } catch (error) {
               console.error('Error uploading image:', error);
            } finally {
               setUploading(false);
            }
         }
      }
   };

   const handleFullScreen = async (event: React.ChangeEvent<HTMLInputElement>) => {
      const data = event.target.checked;
      const res = await updateLinkAPI({ id: link._id, data: { isPreview: data } }).unwrap();
      socket.emit('link', { id: link._id, data: { isPreview: data } });

      updateLink(res.doc);
   };
   const handlePrimary = async (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.checked) {
         const res = await updateLinkAPI({ id: link._id, data: { order: 0 } }).unwrap();
         socket.emit('link', { id: link._id, data: { order: 0 } });
         updateLink(res.doc);
      } else {
         const res = await updateLinkAPI({ id: link._id, data: { order: 1 } }).unwrap();
         socket.emit('link', { id: link._id, data: { order: 1 } });
         updateLink(res.doc);
      }
   };
   return (
      isChecked && (
         <div className='admin-links__image-container'>
            <div className='admin-links__admin'>
               <UserImageInput control={control} name='image' onChange={handleImageChange} id={link._id}>
                  <label className='admin-links__admin--label' htmlFor={link._id}>
                     {isLoadingLinkImage || uploading ? (
                        <Loader size={100} />
                     ) : link.image && isChecked ? (
                        <img src={linkImage} alt={link.description} className='admin-links__image' />
                     ) : (
                        '+'
                     )}
                  </label>
               </UserImageInput>
            </div>
            {isOpen && link.image && (
               <div className='admin-links__checkbox'>
                  <UserCheckboxInput
                     control={control}
                     name='isPreview'
                     onChange={handleFullScreen}
                     defaultChecked={link.isPreview}
                  >
                     <label htmlFor='isPreview'>Full Screen?</label>
                  </UserCheckboxInput>
                  <UserCheckboxInput
                     control={control}
                     name='primary'
                     onChange={handlePrimary}
                     defaultChecked={link.order === 0}
                  >
                     <label htmlFor='primary'>Primary?</label>
                  </UserCheckboxInput>
               </div>
            )}
         </div>
      )
   );
}
