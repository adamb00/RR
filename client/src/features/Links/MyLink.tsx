import { useParams } from 'react-router-dom';
import { useGetOneUser } from '../Auth/useUserAuth';
import Loader from '../../ui/Loader';
import { ILink } from '../../interfaces/ILink';
import LinkUser from './LinkUser/LinkUser';
import useDeviceDetection from '../../hooks/useDetectDevice';
import UserImage from '../../ui/UserImage';
import { useState } from 'react';
import ShareModal from '../../ui/ShareModal';

export default function MyLink() {
   const { id } = useParams();
   const { currentUser, isLoading } = useGetOneUser(id as string);

   const user = currentUser?.doc;
   const [isOpen, setIsOpen] = useState(false);
   const [url, setUrl] = useState('');

   const device = useDeviceDetection();

   if (isLoading)
      return (
         <div className='main'>
            <Loader size={250} />
         </div>
      );

   return (
      <div className='shared-link'>
         <ShareModal isOpen={isOpen} setIsOpen={setIsOpen} url={url} />

         <div className='shared-link__image'>
            <UserImage user={user} />
         </div>
         <div className='shared-link__container'>
            {user.availableLinks.map((link: ILink) => (
               <LinkUser key={link._id} link={link} device={device} user={user} setIsOpen={setIsOpen} setUrl={setUrl} />
            ))}
         </div>
      </div>
   );
}
