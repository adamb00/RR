import { ILink } from '@/interfaces/ILink';
import LinksUploadImage from './LinksUploadImage';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import LinksInteractions from './LinksInteractions';
import { IoChevronDown, IoChevronUp } from 'react-icons/io5';
import LinksItemForm from './LinksItemForm';
import { truncateText } from '@/utils/helper';

interface LinkItemProps {
   link: ILink;
}

export default function LinksItem({ link }: LinkItemProps) {
   const { control, handleSubmit } = useForm();
   const [isChecked, setIsChecked] = useState(false);
   const [isOpen, setIsOpen] = useState(false);

   const handleOpenDropdown = () => {
      setIsOpen((open: boolean) => !open);
   };

   useEffect(() => {
      setIsChecked(link.active);
   }, [link.active]);

   const currentLinkTitle = () => truncateText(link.title, 80) ?? truncateText(link.link, 80);

   return (
      <div className='links__link'>
         <LinksUploadImage isChecked={isChecked} isOpen={isOpen} link={link} control={control} />
         <div className={`links__interactions links__interactions${isOpen ? '--open' : ''}`}>
            <div className='links__wrapper'>
               <div className='links__wrapper--group'>
                  <div className='links__item'>{currentLinkTitle()}</div>
                  {link.title && <div className='links__item--link'>{truncateText(link.link, 40)}</div>}
               </div>

               <LinksInteractions isChecked={isChecked} setIsChecked={setIsChecked} link={link} />
            </div>
            <LinksItemForm
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
            <IoChevronUp className='links__chevron' onClick={handleOpenDropdown} />
         ) : (
            <IoChevronDown className='links__chevron' onClick={handleOpenDropdown} />
         )}
      </div>
   );
}
