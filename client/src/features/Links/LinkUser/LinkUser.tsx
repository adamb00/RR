import { ILink } from '@/interfaces/ILink';

import { UserProfileData } from '@/interfaces/AuthInterfaces';
import { Dispatch, SetStateAction } from 'react';

import { useGetImage } from '@/hooks/useGetImage';
import LinksSkeleton from './LinksSkeleton';

interface LinkUserProps {
   link: ILink;
   device: string;
   user: UserProfileData | null;
   setIsOpen?: Dispatch<SetStateAction<boolean>>;
   setUrl?: Dispatch<SetStateAction<string>>;
}

export default function LinkUser({ link, user, setIsOpen, setUrl }: LinkUserProps) {
   const { image: linkImage, isLoading: isLoadingLinkImage } = useGetImage(link);

   let updatedLink: string;

   if (link.link.endsWith('/')) {
      updatedLink = `${link.link}${user?.referralCode}`;
   } else {
      updatedLink = `${link.link}/${user?.referralCode}`;
   }

   if (isLoadingLinkImage) return <LinksSkeleton />;

   const handleOpenModal = () => {
      if (setIsOpen) setIsOpen(true);
      if (setUrl) setUrl(() => updatedLink);
   };

   if (!link.isPreview)
      return (
         <div className='links__card' onClick={handleOpenModal}>
            <div className='links__card--body links__card--body-no-preview'>
               <h1 className='heading-primary'>{link.title}</h1>
               <p className='links__card--description'>{link.description}</p>
            </div>
            <img src={linkImage} alt={link.description} className='links__card--image-no-preview' loading='lazy' />
         </div>
      );

   return (
      <div className='links__card' onClick={handleOpenModal}>
         <div className='links__card--body'>
            <h1 className='heading-primary'>{link.title}</h1>
            <p className='links__card--description'>{link.description}</p>
         </div>
         <img src={linkImage} alt={link.description} className='links__card--image' loading='lazy' />
      </div>
   );
}
