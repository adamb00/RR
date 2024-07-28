import Button from '@/ui/Buttons/Button';
import UserInput from '@/ui/UserInteractions/UserInput';

import { useCreateLinkMutation, useGetLinksMutation } from './linkApiSlice';
import { useCallback, useEffect, useState } from 'react';
import { ILink } from '@/interfaces/ILink';
import { emptyInputField } from '@/utils/helper';

import LinkImage from './LinkImage';
import LinkInteractions from './LinkInteractions';
import { FieldValues, useForm } from 'react-hook-form';
import { IoChevronDown, IoChevronUp } from 'react-icons/io5';

export default function Links() {
   const { control, handleSubmit } = useForm();
   const [createlink, { isLoading: isCreating }] = useCreateLinkMutation();

   const [getLinks] = useGetLinksMutation();
   const [links, setLinks] = useState<ILink[]>();

   const [openLinkId, setOpenLinkId] = useState<string | null>(null);

   const fetchLinks = useCallback(async () => {
      const links = await getLinks({}).unwrap();
      setLinks(links.doc);
   }, [getLinks]);

   useEffect(() => {
      fetchLinks();
   }, [fetchLinks]);

   const handleOnSubmit = async (data: FieldValues) => {
      await createlink(data).unwrap();
      fetchLinks();
      emptyInputField('.user-input__input');
   };

   const handleOpenDropdown = (linkId: string) => {
      setOpenLinkId(currentId => (currentId === linkId ? null : linkId));
   };

   if (!links) return 'No link';

   return (
      <div className='links'>
         <form className='links__form' onSubmit={handleSubmit(handleOnSubmit)}>
            <UserInput control={control} name='link' label='' placeholder='Link megosztása' defaultValue='' />
            <Button type='submit' disabled={isCreating}>
               Megosztás
            </Button>
         </form>
         <div className='links__container'>
            {links.map((link: ILink) => (
               <div className='links__link' key={link._id}>
                  <LinkImage link={link} isOpen={openLinkId === link._id} fetchLinks={fetchLinks} />
                  <LinkInteractions
                     isOpen={openLinkId === link._id}
                     setIsOpen={() => handleOpenDropdown(link._id)}
                     link={link}
                     fetchLinks={fetchLinks}
                  />
                  {link.active && openLinkId === link._id ? (
                     <IoChevronUp
                        className='links__chevron'
                        onClick={() => handleOpenDropdown(link._id)}
                        id={link._id}
                     />
                  ) : (
                     <IoChevronDown
                        className='links__chevron'
                        onClick={() => handleOpenDropdown(link._id)}
                        id={link._id}
                     />
                  )}
               </div>
            ))}
         </div>
      </div>
   );
}
