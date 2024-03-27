import { useParams } from 'react-router-dom';
import { useGetOneUser } from '../Auth/useUserAuth';
import Loader from '../../ui/Loader';
import { ILink } from '../../interfaces/ILink';
import LinkUser from './LinkUser/LinkUser';
import useDeviceDetection from '../../hooks/useDetectDevice';
import UserImage from '../../ui/UserImage';
import { useState } from 'react';
import ShareModal from '../../ui/Modals/ShareModal';
import {
   FacebookMessengerIcon,
   FacebookMessengerShareButton,
   TelegramIcon,
   WhatsappIcon,
   WhatsappShareButton,
   ViberIcon,
   ViberShareButton,
   TelegramShareButton,
} from 'react-share';
import { iconSize } from '@/utils/constants';

export default function MyLink() {
   const { id } = useParams();
   const { currentUser, isLoading } = useGetOneUser(id as string);

   const user = currentUser?.doc;
   const [isOpen, setIsOpen] = useState(false);
   const [url, setUrl] = useState(`${import.meta.env.VITE_BASE_URL_LINK}/${id}`);

   console.log(id);

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

         <div className='shared-link__header'>
            <div className='shared-link__image'>
               <UserImage user={user} />
            </div>
            <div className='shared-link__header--wrapper'>
               <div className='shared-link__username'>
                  <p>{user.username}</p>
               </div>
               <div className='sharemodal__container__wrapper'>
                  <div className='sharemodal__container--item'>
                     <FacebookMessengerShareButton url={url} appId={import.meta.env.VITE_FACEBOOK_APP_ID}>
                        <FacebookMessengerIcon size={iconSize} round />
                     </FacebookMessengerShareButton>
                  </div>
                  <div className='sharemodal__container--item'>
                     <ViberShareButton url={url}>
                        <ViberIcon size={iconSize} round />
                     </ViberShareButton>
                  </div>
                  <div className='sharemodal__container--item'>
                     <TelegramShareButton url={url}>
                        <TelegramIcon size={iconSize} round />
                     </TelegramShareButton>
                  </div>
                  <div className='sharemodal__container--item'>
                     <WhatsappShareButton url={url}>
                        <WhatsappIcon size={iconSize} round />
                     </WhatsappShareButton>
                  </div>
               </div>
            </div>
         </div>
         <div className='shared-link__container'>
            {user.availableLinks.map((link: ILink) => (
               <LinkUser key={link._id} link={link} device={device} user={user} setIsOpen={setIsOpen} setUrl={setUrl} />
            ))}
         </div>
      </div>
   );
}
