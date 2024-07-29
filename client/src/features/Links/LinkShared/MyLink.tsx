import { useParams } from 'react-router-dom';
import { useGetOneUser } from '@/features/Auth/useUserAuth';
import { ILink } from '@/interfaces/ILink';
import 'react-loading-skeleton/dist/skeleton.css';
import MyLinkHeader from './MyLinkHeader';
import { UserProfileData } from '@/interfaces/AuthInterfaces';
import MyLinkSkeleton from './MyLinkSkeleton';
import MyLinkContainer from './MyLinkContainer';
import SubscribeModal from '@/ui/Modals/SubscribeModal';
import { useState } from 'react';
import useDeviceDetection from '@/hooks/useDetectDevice';

export default function MyLink() {
   const { username } = useParams();
   const device = useDeviceDetection();

   const { currentUser, isLoading: currentUserIsLoading } = useGetOneUser('username', username as string);

   const [isModalOpen, setIsModalOpen] = useState(false);
   const user: UserProfileData | undefined = currentUser?.doc;
   const url = `${import.meta.env.VITE_BASE_URL_LINK}/${username}}`;

   if (currentUserIsLoading) return <MyLinkSkeleton />;

   if (!user) return <p>No user found</p>;

   return (
      <div className='shared-link'>
         <SubscribeModal setIsOpen={setIsModalOpen} isOpen={isModalOpen} user={user} />
         <MyLinkHeader url={url} user={user} setIsOpen={setIsModalOpen} isOpen={isModalOpen} />
         {device === 'Mobile' && user.description && (
            <div className='shared-link__desc' dangerouslySetInnerHTML={{ __html: `"${user.description}"` }}></div>
         )}

         <div className='shared-link__container'>
            {user.availableLinks
               .sort((a, b) => a.order - b.order)
               .map((link: ILink) => (
                  <MyLinkContainer link={link} key={link._id} user={user} />
               ))}
         </div>
      </div>
   );
}
