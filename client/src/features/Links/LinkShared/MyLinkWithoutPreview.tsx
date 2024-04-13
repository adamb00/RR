import { useGetImage } from '@/hooks/useGetImage';
import { ILink } from '@/interfaces/ILink';
import { BackgroundGradient } from '@/ui/Aceternity/BackgroundGradient';
import { Link } from 'react-router-dom';
import MyLinkItemSkeleton from './MyLinkItemSkeleton';
import { UserProfileData } from '@/interfaces/AuthInterfaces';
import { handleLink } from '@/utils/helpers';

interface MyLinkContainerProps {
   link: ILink;
   user: UserProfileData;
}

export default function MyLinkWithoutPreview({ link, user }: MyLinkContainerProps) {
   const { image: linkImage, isLoading: isLoadingLinkImage } = useGetImage(link);

   if (isLoadingLinkImage) return <MyLinkItemSkeleton />;

   return (
      <BackgroundGradient className='container'>
         <Link to={handleLink(link.link, user.referralCode)} target='_blank' className='shared-link__no-preview'>
            <img src={linkImage} alt={link.description} className='shared-link__no-preview--image' />
            <div className='shared-link__no-preview--body'>
               <h1 className='heading-primary heading-primary--small'>{link.title}</h1>
               <p className='shared-link__description'>{link.description}</p>
            </div>
         </Link>
      </BackgroundGradient>
   );
}
