import { useParams } from 'react-router-dom';
import { useGetOneUser } from '../Auth/useUserAuth';
import Loader from '../../ui/Loader';
import { ILink } from '../../interfaces/ILink';
import LinkItem from './LinkItemUsers';
import useDeviceDetection from '../../hooks/useDetectDevice';
import UserImage from '../../ui/UserImage';
import { useCallback, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux-hooks';
import { getUserImage } from '../../services/apiUser';
import { setImage } from '../Auth/slices/user/userSlice';
import ShareModal from '../../ui/ShareModal';

export default function MyLink() {
   const { id } = useParams();
   const { currentUser, isLoading } = useGetOneUser(id as string);
   const userImage = useAppSelector(state => state.user.image);
   const dispatch = useAppDispatch();
   const user = currentUser?.doc;
   const [isOpen, setIsOpen] = useState(false);
   const [url, setUrl] = useState('');

   const fetchUserImage = useCallback(async () => {
      if (!userImage && user) {
         const image = await getUserImage(user?.photo);
         dispatch(setImage(image));
      }
   }, [user, dispatch, userImage]);

   useEffect(() => {
      if (user) fetchUserImage();
   }, [fetchUserImage, user]);

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
