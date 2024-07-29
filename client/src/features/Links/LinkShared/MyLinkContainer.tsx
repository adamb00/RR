import { ILink } from '@/interfaces/ILink';
import { Link } from 'react-router-dom';

import { UserProfileData } from '@/interfaces/AuthInterfaces';
import { handleLink } from '@/utils/helpers';
import useDeviceDetection from '@/hooks/useDetectDevice';
import MyLinkItemMobile from './MyLinkItemMobile';
import MyLinkItem from './MyLinkItem';

interface MyLinkContainerProps {
   link: ILink;
   user: UserProfileData;
}

export default function MyLinkContainer({ link, user }: MyLinkContainerProps) {
   const device = useDeviceDetection();

   if (link.isPreview)
      return (
         <Link className='shared-link__card' to={handleLink(link.link, user.referralCode)} target='_blank'>
            <img src={link.images[1]} alt={link.description} className='shared-link__side shared-link__side--image' />
            <div className='shared-link__side shared-link__side--back'>
               <h1 className='heading-primary heading-primary--small'>{link.title}</h1>
               <p className='shared-link__description'>{link.description}</p>
            </div>
         </Link>
      );

   return (
      <Link className='shared-link__card' to={handleLink(link.link, user.referralCode)} target='_blank'>
         {device !== 'Mobile' ? <MyLinkItem link={link} /> : <MyLinkItemMobile link={link} />}
      </Link>
   );
}
