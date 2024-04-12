import { useState } from 'react';
import UserImageInput from '@/ui/UserInteractions/UserInputImage';
import Loader from '@/ui/Loader';
import { useUpdateLinkMutation, useUploadLinkImageMutation } from '@/features/Links/linkApiSlice';
import { Control } from 'react-hook-form';
import { ILink } from '@/interfaces/ILink';
import UserCheckboxInput from '@/ui/UserInteractions/UserInputCheckbox';
// import { socket } from '@/utils/constants';
import { useGetImage } from '@/hooks/useGetImage';
import { useLinks } from '@/contexts/LinkContext';

interface LinksUploadImageProps {
   isChecked: boolean;
   isOpen: boolean;
   link: ILink;
   control: Control;
}

export default function LinksUploadImage({ isChecked, control, isOpen, link }: LinksUploadImageProps) {
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
               // socket.emit('link', { id: link._id, data: { image: res.data.image } });

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
      // socket.emit('link', { id: link._id, data: { isPreview: data } });

      updateLink(res.doc);
   };
   const handlePrimary = async (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.checked) {
         const res = await updateLinkAPI({ id: link._id, data: { order: 0 } }).unwrap();
         // socket.emit('link', { id: link._id, data: { order: 0 } });
         updateLink(res.doc);
      } else {
         const res = await updateLinkAPI({ id: link._id, data: { order: 1 } }).unwrap();
         // socket.emit('link', { id: link._id, data: { order: 1 } });
         updateLink(res.doc);
      }
   };
   return (
      isChecked && (
         <div className='links__image-container'>
            <div className='links__image-container--image'>
               <UserImageInput control={control} name='image' onChange={handleImageChange}>
                  <label className='links__image-container--label' htmlFor='image'>
                     {isLoadingLinkImage || uploading ? (
                        <Loader size={100} />
                     ) : link.image && isChecked ? (
                        <img src={linkImage} alt={link.description} className='links__image' />
                     ) : (
                        '+'
                     )}
                  </label>
               </UserImageInput>
            </div>
            {isOpen && link.image && (
               <div className='links__checkbox'>
                  <UserCheckboxInput
                     control={control}
                     name='isPreview'
                     onChange={handleFullScreen}
                     defaultChecked={link.isPreview}
                  >
                     <label htmlFor='isPreview'>Teljes kép?</label>
                  </UserCheckboxInput>
                  <UserCheckboxInput
                     control={control}
                     name='primary'
                     onChange={handlePrimary}
                     defaultChecked={link.order === 0}
                  >
                     <label htmlFor='primary'>Elsődleges?</label>
                  </UserCheckboxInput>
               </div>
            )}
         </div>
      )
   );
}
