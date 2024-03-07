import { ILink } from '../../../interfaces/ILink';

import { UserProfileData } from '../../../interfaces/AuthInterfaces';
import { Dispatch, SetStateAction, useState } from 'react';

import LinkHasNoPreview from './LinkHasNoPreview';
import LinkHasPreview from './LinkHasPreview';

interface LinkUserProps {
   link: ILink;
   device: string;
   user: UserProfileData | null;
   setIsOpen?: Dispatch<SetStateAction<boolean>>;
   setUrl?: Dispatch<SetStateAction<string>>;
}

export default function LinkUser({ link, device, user, setIsOpen, setUrl }: LinkUserProps) {
   const [isOpenModal, setIsOpenModal] = useState(false);
   const [isOpenDropdown, setIsOpenDropdown] = useState(false);

   const updatedLink = `${link.link}/${user?.referralCode}`;

   const handleOpenModal = () => {
      if (setIsOpen) setIsOpen(true);
      if (setUrl) setUrl(() => updatedLink);
   };

   if (!link.active) return;

   return (
      <div
         className={`my-link__wrapper${isOpenDropdown ? '--expanded' : ''}${
            link.isPreview ? '--preview my-link__wrapper' : '--basic my-link__wrapper'
         }`}
      >
         <LinkHasPreview
            link={link}
            isOpenModal={isOpenModal}
            setIsOpenModal={setIsOpenModal}
            updatedLink={updatedLink}
            handleOpenModal={handleOpenModal}
         />

         <LinkHasNoPreview
            link={link}
            device={device}
            setIsOpenDropdown={setIsOpenDropdown}
            updatedLink={updatedLink}
            handleOpenModal={handleOpenModal}
            isOpenDropdown={isOpenDropdown}
         />
      </div>
   );
}
