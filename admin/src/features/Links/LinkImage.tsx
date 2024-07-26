import { ILink } from '@/interfaces/ILink';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useUploadLinkImageMutation, useUploadLinkVideoMutation } from './linkApiSlice';

interface LinkImageProps {
   link: ILink;
   isOpen: boolean;
   fetchLinks: () => void;
}

export default function LinkImage({ link, isOpen, fetchLinks }: LinkImageProps) {
   const [uploading, setUploading] = useState(false);
   const [uploadLinkImage] = useUploadLinkImageMutation();
   const [uploadLinkVideo] = useUploadLinkVideoMutation();
   const [error, setError] = useState('');
   const [isLoading, setIsLoading] = useState(false);
   const { control } = useForm();

   const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>, id: string) => {
      const images = event.target.files;

      if (images!.length > 2) {
         event.target.value = null || '';
         setError('Maximum 2 images');
         return;
      }

      if (images && !uploading) {
         setUploading(true);
         const formData = new FormData();

         for (let i = 0; i < images.length; i++) {
            formData.append('image', images[i]);
         }

         await uploadLinkImage({ data: formData, id }).unwrap();
         fetchLinks();
      }
   };
   const handleVideoChange = async (event: React.ChangeEvent<HTMLInputElement>, id: string) => {
      const video = event.target.files;
      const formData = new FormData();

      if (video) formData.append('video', video[0]);

      setIsLoading(true);
      await uploadLinkVideo({ data: formData, id }).unwrap();

      fetchLinks();
      setIsLoading(false);
   };
   return (
      <div className='links__image-container'>
         <div className='links__image-container--image'>
            <Controller
               control={control}
               name='image'
               render={({ field: { onBlur } }) => (
                  <form>
                     <label
                        className={link.images ? 'links__image-container--image' : 'links__image-container--label'}
                        htmlFor={link._id}
                     >
                        <img src={link.images[0]} alt='link image' className='links__image' />
                     </label>
                     <input
                        style={{ display: 'none' }}
                        type='file'
                        id={link._id}
                        multiple={true}
                        onChange={e => handleImageChange(e, link._id)}
                        onBlur={onBlur}
                     />
                  </form>
               )}
            />
         </div>
         {link.images.map((image: string, i: number) => (
            <React.Fragment key={i}>
               {i > 0 && (
                  <div className={`links__image-container--image links__image-container--image--${i + 1}`} key={i}>
                     <img src={image} alt='link image' className='links__image' />
                  </div>
               )}
            </React.Fragment>
         ))}
         {error && (
            <p
               style={{
                  color: 'red',
                  position: 'absolute',
                  bottom: 0,
               }}
            >
               {error}
            </p>
         )}

         {isOpen && (
            <Controller
               control={control}
               name='video'
               render={({ field: { onBlur } }) => (
                  <div>
                     <label htmlFor={`video--${link._id}`}>
                        <p className='links__video'>{isLoading ? 'Feltöltés alatt' : 'Video feltöltése'}</p>
                     </label>
                     <input
                        disabled={isLoading}
                        style={{ display: 'none' }}
                        type='file'
                        id={`video--${link._id}`}
                        onChange={e => handleVideoChange(e, link._id)}
                        onBlur={onBlur}
                     />
                  </div>
               )}
            />
         )}
      </div>
   );
}
