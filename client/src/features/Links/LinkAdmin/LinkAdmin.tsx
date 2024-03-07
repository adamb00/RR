import { ILink } from '../../../interfaces/ILink';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { truncateText } from '../../../utils/helpers';
import useDetectOrientation from '../../../hooks/useDetectOrientation';
import LinkAdminUploadImage from './LinkAdminUploadImage';
import LinkAdminInteractions from './LinkAdminInteractions';
import LinkAdminForm from './LinkAdminForm';

interface LinkItemProps {
   link: ILink;
   device: string;
}
export default function LinkAdmin({ link, device }: LinkItemProps) {
   const { control, handleSubmit } = useForm();

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
      <div className='link__links'>
         <LinkAdminUploadImage isChecked={isChecked} control={control} isOpen={isOpen} link={link} />
         <div className={`link__form link__form${isOpen ? '--open' : ''}`}>
            <div className='link__wrapper'>
               <div className='link__wrapper--group'>
                  <div className='link__item'>{handleIfLinkHasTitle()}</div>
                  <div className='link__item--link'>{currentLinkTitle() && handlePhoneView(`(${link.link})`, 60)}</div>
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
      </div>
   );
}
