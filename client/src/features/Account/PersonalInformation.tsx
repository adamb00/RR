import UpdateUser from './UpdateUser';
import UploadImage from './UploadImage';

export default function PersonalInformation() {
   return (
      <div className='personal-information'>
         <h1 className='heading-primary'>Update your personal data</h1>
         <UploadImage />
         <UpdateUser />
      </div>
   );
}
