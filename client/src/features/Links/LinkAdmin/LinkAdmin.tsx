import { ILink } from '@/interfaces/ILink';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { truncateText } from '@/utils/helpers';
import useDetectOrientation from '@/hooks/useDetectOrientation';
import LinkAdminUploadImage from './LinkAdminUploadImage';
import LinkAdminInteractions from './LinkAdminInteractions';
import { IoChevronDown, IoChevronUp } from 'react-icons/io5';

import LinkAdminForm from './LinkAdminForm';

interface LinkItemProps {
   link: ILink;
   device: string;
}
export default function LinkAdmin({ link, device }: LinkItemProps) {
   const { control, handleSubmit } = useForm();
   const handleOpenDropdown = () => {
      setIsOpen((open: boolean) => !open);
   };

   const [isChecked, setIsChecked] = useState(false);
   const [isOpen, setIsOpen] = useState(false);

   const orientation = useDetectOrientation();

   useEffect(() => {
      setIsChecked(link.active);
   }, [link.active]);

   const currentLinkTitle = () => link.title ?? '';

   const handleIfLinkHasTitle = () => {
      return currentLinkTitle() ? currentLinkTitle() : handlePhoneView(link.link);
   };

   const handlePhoneView = (text: string, phoneLength = 29) => {
      let view = text;
      if (device === 'Tablet' && orientation === 'portrait') {
         view = truncateText(text, 35);
      }
      if (device === 'Mobile' && orientation === 'landscape') {
         view = truncateText(text, 65);
      }
      if (device === 'Mobile' && orientation === 'portrait') {
         view = truncateText(text, phoneLength);
      }

      return view;
   };

   return (
      <div className='admin-links__link'>
         <LinkAdminUploadImage isChecked={isChecked} control={control} isOpen={isOpen} link={link} />
         <div className={`admin-links__interactions admin-links__interactions${isOpen ? '--open' : ''}`}>
            <div className='admin-links__wrapper'>
               <div className='admin-links__wrapper--group'>
                  <div className='admin-links__item'>{handleIfLinkHasTitle()}</div>
                  <div className='admin-links__item--link'>
                     {currentLinkTitle() && handlePhoneView(`(${link.link})`, 60)}
                  </div>
               </div>
               <LinkAdminInteractions link={link} isChecked={isChecked} setIsChecked={setIsChecked} />
            </div>
            <LinkAdminForm
               isChecked={isChecked}
               setIsChecked={setIsChecked}
               control={control}
               isOpen={isOpen}
               setIsOpen={setIsOpen}
               handleSubmit={handleSubmit}
               link={link}
            />
         </div>
         {link.active && isOpen ? (
            <IoChevronUp className='admin-links__chevron' onClick={handleOpenDropdown} />
         ) : (
            <IoChevronDown className='admin-links__chevron' onClick={handleOpenDropdown} />
         )}
      </div>
   );
}
