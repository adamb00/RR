import { ILink } from '@/interfaces/ILink';
import { truncateText } from '@/utils/helper';
import Switch from 'react-switch';

import { useActivateLinkMutation, useDeleteLinkMutation } from './linkApiSlice';
import LinksItemForm from './LinksItemForm';
import { Dispatch, SetStateAction, useState } from 'react';
import Icon from '@/ui/Icon';

interface LinkInteractionProps {
   link: ILink;
   isOpen: boolean;
   setIsOpen: Dispatch<SetStateAction<boolean>>;
   fetchLinks: () => void;
}

export default function LinkInteractions({ link, isOpen, setIsOpen, fetchLinks }: LinkInteractionProps) {
   const [removeLinkAPI] = useDeleteLinkMutation();
   const [activateLinkApi] = useActivateLinkMutation();

   const [isChecked, setIsChecked] = useState(false);
   const handleOnDelete = async (id: string) => {
      await removeLinkAPI(id);
      fetchLinks();
   };

   const handleOnChange = async (id: string) => {
      setIsChecked(!isChecked);
      await activateLinkApi({ id, data: { active: !isChecked } }).unwrap();
      fetchLinks();
   };
   return (
      <div className={`links__interactions links__interactions${isOpen ? '--open' : ''}`}>
         <div className='links__wrapper'>
            <div className='links__wrapper--group'>
               <div className='links__item'>{truncateText(link.title, 80) ?? truncateText(link.link, 80)}</div>
               {link.title && <div className='links__item--link'>{truncateText(link.link, 40)}</div>}
            </div>

            <div className='links__group'>
               <Switch
                  onChange={() => handleOnChange(link._id)}
                  checked={!!link.active}
                  offColor='#ed535b'
                  onColor='#80e9ca'
                  uncheckedIcon={false}
                  checkedIcon={false}
                  boxShadow='0px 1px 5px rgba(0, 0, 0, 0.6)'
                  activeBoxShadow='0px 0px 1px 10px rgba(0, 0, 0, 0.2)'
                  className='links__switch'
               />

               <Icon onClick={() => handleOnDelete(link._id)} className='links__icon links__icon--remove'>
                  &#10005;
               </Icon>
            </div>
         </div>
         <LinksItemForm
            isChecked={isChecked}
            setIsChecked={setIsChecked}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            // handleSubmit={handleSubmit}
            link={link}
         />
      </div>
   );
}
