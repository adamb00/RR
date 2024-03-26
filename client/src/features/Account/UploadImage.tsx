import { FieldValues, useForm } from 'react-hook-form';
import Button from '../../ui/Buttons/Button';
import UserImageInput from '../../ui/UserInteractions/UserImageInput';
import { useUploadUserImageMutation } from '../Auth/slices/user/userApiSlice';
import { useState } from 'react';
import { useAppDispatch } from '../../redux-hooks';
import { useTranslation } from 'react-i18next';
import { truncateText } from '../../utils/helpers';
import { updateUser } from '../Auth/slices/auth/authSlice';

export default function UploadImage() {
   const { control, handleSubmit } = useForm();
   const [uploadUserImageApi] = useUploadUserImageMutation();
   const [fileName, setFilename] = useState<string | null>(null);
   const dispatch = useAppDispatch();
   const { t } = useTranslation();

   const handleUploadImage = async (data: FieldValues) => {
      const formData = new FormData();
      formData.append('image', data.image);

      const res = await uploadUserImageApi(formData).unwrap();
      dispatch(updateUser({ ...res.data.user }));

      setFilename(null);
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
         <h2 className='heading-secondary'>{t('Choose a profile picture')}</h2>

         <label htmlFor='image' className='upload-image__input'>
            <span className='upload-image__span'>{t('Choose a profile picture')}</span>
            <UserImageInput control={control} name='image' onChange={handleImageChange} id='image' />
            <span className='upload-image__filename'>{fileName && truncateText(fileName, 25)}</span>
         </label>

         <Button className='btn btn--tertiary' onClick={handleSubmit(handleUploadImage)}>
            {t('Upload')}
         </Button>
      </div>
   );
}
