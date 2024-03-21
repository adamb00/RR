import { useState } from 'react';
import UserImageInput from '../../../ui/UserInteractions/UserImageInput';
import Loader from '../../../ui/Loader';
import LinkImage from '../../../ui/LinkImage';
import { useUpdateLinkMutation, useUploadLinkImageMutation } from '../linkApiSlice';
import { Control } from 'react-hook-form';
import { ILink } from '../../../interfaces/ILink';
import { useLinks } from '../../../context/LinkContext';
import UserCheckboxInput from '../../../ui/UserInteractions/UserCheckboxInput';
import { socket } from '../../../utils/constants';

interface LinkAdminUploadImageProps {
   isChecked: boolean;
   isOpen: boolean;
   link: ILink;
   control: Control;
}

export default function LinkAdminUploadImage({ isChecked, control, isOpen, link }: LinkAdminUploadImageProps) {
   const [uploading, setUploading] = useState(false);
   const [uploadLinkImage, { isLoading }] = useUploadLinkImageMutation();
   const { updateLink } = useLinks();
   const [updateLinkAPI] = useUpdateLinkMutation();

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
   return (
      isChecked && (
         <div className='link__image-container'>
            <div className='link__admin'>
               <UserImageInput control={control} name='image' onChange={handleImageChange} id={link._id}>
                  <label className='link__admin--label' htmlFor={link._id}>
                     {isLoading || uploading ? (
                        <Loader size={100} />
                     ) : link.image && isChecked ? (
                        <LinkImage link={link} className='link__image' />
                     ) : (
                        '+'
                     )}
                  </label>
               </UserImageInput>
            </div>
            {isOpen && link.image && (
               <div className='link__checkbox'>
                  <UserCheckboxInput
                     control={control}
                     name='isPreview'
                     onChange={handleFullScreen}
                     defaultChecked={link.isPreview}
                  >
                     <label htmlFor='isPreview'>Full Screen?</label>
                  </UserCheckboxInput>
               </div>
            )}
         </div>
      )
   );
}
