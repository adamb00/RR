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

   console.log(handleLink(link.link, user.referralCode));

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

   // if (device === 'Mobile')
   //    return (
   //       <Link className='shared-link__card' to={handleLink(link.link, user.referralCode)} target='_blank'>
   //          <div className='my-link'>
   //             <div className='my-link__header'>
   //                <img src={link.images[0]} alt={link.description} className='my-link__image my-link__image--mobile' />

   //                <div className='my-link__header--wrapper'>
   //                   <h1 className='heading-primary heading-primary--small'>{link.title}</h1>
   //                   <div className='my-link__header--desc'>{link.description}</div>
   //                </div>
   //             </div>
   //             <div className='my-link__container'>
   //                <iframe
   //                   width='120'
   //                   height='220'
   //                   src={link.video}
   //                   title={link.description}
   //                   allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
   //                   allowFullScreen
   //                ></iframe>
   //                <img src={link.images[2]} alt={link.description} className='my-link__image' />
   //             </div>
   //          </div>
   //       </Link>
   //    );

   return (
      <Link className='shared-link__card' to={handleLink(link.link, user.referralCode)} target='_blank'>
         {device !== 'Mobile' ? <MyLinkItem link={link} /> : <MyLinkItemMobile link={link} />}
      </Link>
   );
}
