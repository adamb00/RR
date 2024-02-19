import { useTranslation } from 'react-i18next';
import UpdateUser from './UpdateUser';
import UploadImage from './UploadImage';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../Auth/slices/auth/authSlice';

export default function PersonalInformation() {
   const { t } = useTranslation();
   const user = useSelector(selectCurrentUser);

   console.log(user);
   return (
      <div className='personal-information'>
         <h1 className='heading-primary'>{t('Update your personal data')}</h1>
         <UploadImage />
         <UpdateUser />
      </div>
   );
}
