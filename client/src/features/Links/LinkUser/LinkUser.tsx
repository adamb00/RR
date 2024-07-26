import { ILink } from '@/interfaces/ILink';

import { UserProfileData } from '@/interfaces/AuthInterfaces';
import { Dispatch, SetStateAction } from 'react';

import { handleLink } from '@/utils/helpers';
import useDeviceDetection from '@/hooks/useDetectDevice';

interface LinkUserProps {
   link: ILink;
   device: string;
   user: UserProfileData | null;
   setIsOpen?: Dispatch<SetStateAction<boolean>>;
   setUrl?: Dispatch<SetStateAction<string>>;
}

export default function LinkUser({ link, user, setIsOpen, setUrl }: LinkUserProps) {
   const device = useDeviceDetection();
   const handleOpenModal = () => {
      if (setIsOpen) setIsOpen(true);
      if (setUrl) setUrl(() => handleLink(link.link, user!.referralCode));
   };

   if (!link.isPreview)
      return (
         <div className='links__card' onClick={handleOpenModal}>
            <div className='links__card--body links__card--body-no-preview'>
               <h1 className='heading-primary'>{link.title}</h1>
               <p className='links__card--description'>{link.description}</p>
            </div>
            {device !== 'Mobile' && (
               <div className='links__card--image-container'>
                  {link.images.map((image: string, i: number) => (
                     <img
                        key={i}
                        src={image}
                        alt={link.description}
                        className={`links__card--image-no-preview links__card--image-no-preview--${i + 1}`}
                        loading='lazy'
                     />
                  ))}
               </div>
            )}
         </div>
      );

   return (
      <div className='links__card' onClick={handleOpenModal}>
         <div className='links__card--body'>
            <h1 className='heading-primary'>{link.title}</h1>
            <p className='links__card--description'>{link.description}</p>
         </div>
         <img src={link.images[0]} alt={link.description} className='links__card--image' loading='lazy' />
      </div>
   );
}
