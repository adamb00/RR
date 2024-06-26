import { ViberIcon } from 'react-share';
import { iconSize, iconSizeMobile } from '@/utils/constants';
import { UserProfileData } from '@/interfaces/AuthInterfaces';
import { useGetImage } from '@/hooks/useGetImage';
import MyLinkHeaderSkeleton from './MyLinkHeaderSkeleton';
import useDeviceDetection from '@/hooks/useDetectDevice';
import { MenuProps } from '@/interfaces/MenuProps';
import Icon from '@/ui/Icon';
import { FaBell } from 'react-icons/fa';
import { ISocialLinks } from '@/interfaces/ISocialLinks';
import { SocialIcon } from 'react-social-icons';
import { Link } from 'react-router-dom';
import useDetectOrientation from '@/hooks/useDetectOrientation';

interface MyLinkHeaderProps extends MenuProps {
   user: UserProfileData;
   url: string;
}

export default function MyLinkHeader({ user, setIsOpen }: MyLinkHeaderProps) {
   const { image: userImage, isLoading: isLoadingUserImage } = useGetImage(user);
   const device = useDeviceDetection();
   const { socialLinks, username } = user;
   const orientation = useDetectOrientation();

   const getStyleForDeviceAndOrientation = (device: string, orientation: string): React.CSSProperties => {
      if (device === 'Desktop' && orientation === 'landscape') {
         return { width: 45, height: 45 };
      } else if (device === 'Desktop') {
         return { width: 100, height: 100 };
      } else if (device === 'Tablet') {
         return { width: 32, height: 32 };
      } else {
         return { width: 32, height: 32 };
      }
   };

   const iconStyle = getStyleForDeviceAndOrientation(device, orientation);

   if (isLoadingUserImage) return <MyLinkHeaderSkeleton />;

   return (
      <div className='shared-link__header'>
         <div className='shared-link__subscribe' onClick={() => setIsOpen(true)}>
            <Icon className='shared-link__subscribe--icon'>
               <FaBell />
            </Icon>
            <p className='shared-link__subscribe--text'>Subscribe</p>
         </div>
         <div className='shared-link__image'>
            <img src={userImage} alt='User Image' onClick={() => setIsOpen(true)} />
         </div>
         <div className='shared-link__header--wrapper'>
            <div>
               <div className='shared-link__username'>@{username}</div>
               <div className='sharemodal__container__wrapper'>
                  {socialLinks.map((link: ISocialLinks) =>
                     link.platform === 'viber' ? (
                        <Link to={link.url} key={link._id}>
                           <ViberIcon size={device !== 'Mobile' ? iconSize : iconSizeMobile} round />
                        </Link>
                     ) : (
                        <SocialIcon
                           network={link.platform}
                           url={link.url}
                           target='_blank'
                           key={link._id}
                           style={iconStyle}
                        />
                     )
                  )}
               </div>
            </div>
         </div>
      </div>
   );
}
