import { ILink } from '@/interfaces/ILink';
import { BackgroundGradient } from '@/ui/Aceternity/BackgroundGradient';
import { Link } from 'react-router-dom';

import { useGetImage } from '@/hooks/useGetImage';
import MyLinkWithoutPreview from './MyLinkWithoutPreview';

import MyLinkItemSkeleton from './MyLinkItemSkeleton';
import { UserProfileData } from '@/interfaces/AuthInterfaces';
import { handleLink } from '@/utils/helpers';

interface MyLinkContainerProps {
   link: ILink;
   user: UserProfileData;
}

export default function MyLinkContainer({ link, user }: MyLinkContainerProps) {
   const { image: linkImage, isLoading: isLoadingLinkImage } = useGetImage(link);

   if (isLoadingLinkImage) return <MyLinkItemSkeleton />;
   if (!link.isPreview) return <MyLinkWithoutPreview link={link} user={user} />;

   return (
      <BackgroundGradient>
         <Link className='shared-link__card' to={handleLink(link.link, user.referralCode)} target='_blank'>
            <img src={linkImage} alt={link.description} className='shared-link__side shared-link__side--image' />
            <div className='shared-link__side shared-link__side--back'>
               <h1 className='heading-primary heading-primary--small'>{link.title}</h1>
               <p className='shared-link__description'>{link.description}</p>
            </div>
         </Link>
      </BackgroundGradient>
   );
}
