import { ILink } from '@/interfaces/ILink';
import { BackgroundGradient } from '@/ui/Aceternity/BackgroundGradient';
import { Link } from 'react-router-dom';

import { useGetImage } from '@/hooks/useGetImage';
import MyLinkWithoutPreview from './MyLinkWithoutPreview';

import MyLinkItemSkeleton from './MyLinkItemSkeleton';

interface MyLinkContainerProps {
   link: ILink;
}

export default function MyLinkContainer({ link }: MyLinkContainerProps) {
   const { image: linkImage, isLoading: isLoadingLinkImage } = useGetImage(link);

   if (isLoadingLinkImage) return <MyLinkItemSkeleton />;
   if (!link.isPreview) return <MyLinkWithoutPreview link={link} />;

   return (
      <BackgroundGradient>
         <Link className='shared-link__card' to={link.link} target='_blank'>
            <img src={linkImage} alt={link.description} className='shared-link__side shared-link__side--image' />
            <div className='shared-link__side shared-link__side--back'>
               <h1 className='heading-primary heading-primary--small'>{link.title}</h1>
               <p className='shared-link__description'>{link.description}</p>
            </div>
         </Link>
      </BackgroundGradient>
   );
}
