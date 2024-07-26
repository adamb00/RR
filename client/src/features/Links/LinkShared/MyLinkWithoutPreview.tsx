import { ILink } from '@/interfaces/ILink';
import { BackgroundGradient } from '@/ui/Aceternity/BackgroundGradient';
import { Link } from 'react-router-dom';

import { UserProfileData } from '@/interfaces/AuthInterfaces';
import { handleLink } from '@/utils/helpers';

interface MyLinkContainerProps {
   link: ILink;
   user: UserProfileData;
}

export default function MyLinkWithoutPreview({ link, user }: MyLinkContainerProps) {
   return (
      <Link to={handleLink(link.link, user.referralCode)} target='_blank' className='shared-link__no-preview'>
         <div className='shared-link__no-preview--body'>
            <div>
               <h1 className='heading-primary heading-primary--small'>{link.title}</h1>
               <p className='shared-link__description'>{link.description}</p>
            </div>
            <div className='shared-link__vid'>
               <video className='shared-link__vid--video' controls preload='preload' id='tlc' autoPlay muted loop>
                  <source src={link.video} type='video/mp4' />
               </video>
            </div>
         </div>
         <div className='shared-link__no-preview--body__album'>
            <img src={link.images[0]} alt={link.description} className='shared-link__no-preview--image' />
            <img src={link.images[1]} alt={link.description} className='shared-link__no-preview--image' />
            <img src={link.images[2]} alt={link.description} className='shared-link__no-preview--image' />
         </div>
      </Link>
   );
}
