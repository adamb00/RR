import { ILink } from '@/interfaces/ILink';
import { Link } from 'react-router-dom';

import { UserProfileData } from '@/interfaces/AuthInterfaces';
import { handleLink } from '@/utils/helpers';
import useDeviceDetection from '@/hooks/useDetectDevice';

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

   if (device === 'Mobile')
      return (
         <Link className='shared-link__card' to={handleLink(link.link, user.referralCode)} target='_blank'>
            <div className='my-link'>
               <div className='my-link__header'>
                  <img src={link.images[0]} alt={link.description} className='my-link__image my-link__image--mobile' />

                  <div className='my-link__header--wrapper'>
                     <h1 className='heading-primary heading-primary--small'>{link.title}</h1>
                     <div className='my-link__header--desc'>{link.description}</div>
                  </div>
               </div>
               <div className='my-link__container'>
                  <iframe
                     width='120'
                     height='220'
                     src={link.video}
                     title='R&amp;R BCAA citrom és ananász - mangó ízben'
                     allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                     allowFullScreen
                  ></iframe>
                  <img src={link.images[2]} alt={link.description} className='my-link__image' />
               </div>
            </div>
         </Link>
      );

   return (
      <Link className='shared-link__card' to={handleLink(link.link, user.referralCode)} target='_blank'>
         <div className='my-link'>
            <div className='my-link__header'>
               <iframe
                  className='my-link__video'
                  src={link.video}
                  title='R&amp;R BCAA citrom és ananász - mangó ízben'
                  allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                  allowFullScreen
               ></iframe>

               <div className='my-link__header--wrapper'>
                  <h1 className='heading-primary heading-primary--small'>{link.title}</h1>
                  <div className='my-link__header--desc'>{link.description}</div>
               </div>
            </div>
            <div className='my-link__container'>
               <img src={link.images[0]} alt={link.description} className='my-link__image my-link__image--0' />
               <img src={link.images[2]} alt={link.description} className='my-link__image my-link__image--2' />
               <img src={link.images[1]} alt={link.description} className='my-link__image my-link__image--1' />
            </div>
         </div>
      </Link>
      // <BackgroundGradient>
      //    <Link className='shared-link__card' to={handleLink(link.link, user.referralCode)} target='_blank'>
      //       <img src={link.images[1]} alt={link.description} className='shared-link__side shared-link__side--image' />
      //       <div className='shared-link__side shared-link__side--back'>
      //          <h1 className='heading-primary heading-primary--small'>{link.title}</h1>
      //          <p className='shared-link__description'>{link.description}</p>
      //       </div>
      //    </Link>
      // </BackgroundGradient>
   );
}
