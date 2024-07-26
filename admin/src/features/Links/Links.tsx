import Button from '@/ui/Buttons/Button';
import UserInput from '@/ui/UserInteractions/UserInput';
import { FieldValues, useForm } from 'react-hook-form';
import { useCreateLinkMutation, useGetLinksMutation } from './linkApiSlice';
import { useCallback, useEffect, useState } from 'react';
import { ILink } from '@/interfaces/ILink';
import { emptyInputField } from '@/utils/helper';
import { IoChevronDown, IoChevronUp } from 'react-icons/io5';

import LinkImage from './LinkImage';
import LinkInteractions from './LinkInteractions';

export default function Links() {
   const { control, handleSubmit } = useForm();
   const [createlink, { isLoading: isCreating }] = useCreateLinkMutation();

   const [getLinks] = useGetLinksMutation();
   const [links, setLinks] = useState<ILink[]>();

   const [isOpen, setIsOpen] = useState(false);

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

   const handleOpenDropdown = () => {
      setIsOpen((open: boolean) => !open);
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
            {links &&
               links.map((link: ILink) => (
                  <div className='links__link' key={link._id}>
                     <LinkImage link={link} isOpen={isOpen} fetchLinks={fetchLinks} />
                     <LinkInteractions isOpen={isOpen} setIsOpen={setIsOpen} link={link} fetchLinks={fetchLinks} />
                     {link.active && isOpen ? (
                        <IoChevronUp className='links__chevron' onClick={handleOpenDropdown} id={link._id} />
                     ) : (
                        <IoChevronDown className='links__chevron' onClick={handleOpenDropdown} id={link._id} />
                     )}
                  </div>
               ))}
         </div>
      </div>
   );
}
