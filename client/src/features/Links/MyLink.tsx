import { useParams } from 'react-router-dom';
import { useGetOneUser } from '../Auth/useUserAuth';
import Loader from '../../ui/Loader';
import { ILink } from '../../interfaces/ILink';
import LinkItem from './LinkItemUsers';
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
      <div className='my-link__container'>
         <ShareModal isOpen={isOpen} setIsOpen={setIsOpen} url={url} />

         <div className='user-image'>
            <UserImage user={user} />
         </div>
         <div className='links'>
            {user.availableLinks.map((link: ILink) => (
               <LinkItem key={link._id} link={link} device={device} user={user} setIsOpen={setIsOpen} setUrl={setUrl} />
            ))}
         </div>
      </div>
   );
}
