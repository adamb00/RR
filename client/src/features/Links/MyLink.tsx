import { useParams } from 'react-router-dom';
import { useGetOneUser } from '../Auth/useUserAuth';
import Loader from '../../ui/Loader';
import { ILink } from '../../interfaces/ILink';
import LinkItem from './LinkItemUsers';
import useDeviceDetection from '../../hooks/useDetectDevice';
import UserImage from '../../ui/UserImage';
import { memo } from 'react';

export default memo(function MyLink() {
   const { id } = useParams();
   const { currentUser, isLoading } = useGetOneUser(id as string);

   const device = useDeviceDetection();

   if (isLoading)
      return (
         <div className='main'>
            <Loader size={250} />
         </div>
      );
   const user = currentUser.doc;

   return (
      <div className='my-link__container'>
         <div className='user-image'>
            <UserImage user={user} />
         </div>
         <div className='links'>
            {user.availableLinks.map((link: ILink) => (
               <LinkItem key={link._id} link={link} device={device} user={user} />
            ))}
         </div>
      </div>
   );
});
