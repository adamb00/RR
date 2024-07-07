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
         <div className='shared-link__vid'>
            {/* <video src='https://www.youtube.com/watch?v=yu_x8qv6mfA'></video>*/}

            <video className='shared-link__vid--video' controls preload='preload' id='tlc' autoPlay muted loop>
               <source
                  src='https://fbfythyraexrdhlkdana.supabase.co/storage/v1/object/public/videos/TLC_EN.mp4'
                  // src='https://fbfythyraexrdhlkdana.supabase.co/storage/v1/object/public/videos/TLC_HUN.mp4?t=2024-06-28T07%3A34%3A04.812Z'
                  type='video/mp4'
               />
            </video>
         </div>
      </BackgroundGradient>
   );
}
