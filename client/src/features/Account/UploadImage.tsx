import { FieldValues, useForm } from 'react-hook-form';
import Button from '../../ui/Buttons/Button';
import UserImageInput from '../../ui/UserInteractions/UserImageInput';
import { useUploadUserImageMutation } from '../Auth/slices/user/userApiSlice';
import { useState } from 'react';

export default function UploadImage() {
   const { control, handleSubmit } = useForm();
   const [uploadUserImageApi] = useUploadUserImageMutation();
   const [fileName, setFilename] = useState<string | null>(null);

   const handleUploadImage = async (data: FieldValues) => {
      const formData = new FormData();
      formData.append('image', data.image);
      await uploadUserImageApi(formData).unwrap();
      setFilename('');
   };

   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files && e.target.files[0];

      if (file) {
         setFilename(file.name);
      } else {
         setFilename(null);
      }
   };

   return (
      <div className='upload-image'>
         <h2 className='heading-secondary'>Choose a profile picture</h2>

         <label htmlFor='image' className='upload-image__input'>
            <span className='upload-image__span'>Choose a profile picture</span>
            <UserImageInput control={control} name='image' onChange={handleImageChange} />
            <span className='upload-image__filename'>{fileName}</span>
         </label>

         <Button className='btn btn--tertiary' onClick={handleSubmit(handleUploadImage)}>
            Upload
         </Button>
      </div>
   );
}
