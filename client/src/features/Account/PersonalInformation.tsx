// import { useTranslation } from 'react-i18next';
import UpdateUser from './UpdateUser';
import UploadImage from './UploadImage';

export default function PersonalInformation() {
   // const { t } = useTranslation();
   return (
      <div className='personal-information'>
         <h1 className='heading-primary'>Személyes adatok módosítása</h1>
         {/* <h1 className='heading-primary'>{t('Update your personal data')}</h1> */}
         <UploadImage />
         <UpdateUser />
      </div>
   );
}
