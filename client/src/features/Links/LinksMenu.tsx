import { useOutsideClick } from '@/hooks/useOutsideClick';
import Icon from '@/ui/Icon';
import Information from '@/ui/Information';
import { Dispatch, SetStateAction, useState } from 'react';

import {
   IoChevronBack,
   IoChevronForward,
   IoCopyOutline,
   IoEyeOutline,
   IoSettingsOutline,
   IoShareSocialOutline,
} from 'react-icons/io5';
import { NavLink } from 'react-router-dom';

interface LinksMenuProps {
   username: string;
   setUrl: Dispatch<SetStateAction<string>>;
   setIsDraggable: Dispatch<SetStateAction<boolean>>;
   setIsOpenSocialModal: Dispatch<SetStateAction<boolean>>;
   handleOpenModal: () => void;
}

export default function LinksMenu({ username, setUrl, handleOpenModal, setIsOpenSocialModal }: LinksMenuProps) {
   const [isOpenMenu, setIsOpenMenu] = useState(false);

   const ref = useOutsideClick(() => setIsOpenMenu(false));

   return (
      <div className={`links__side-menu ${isOpenMenu ? 'open' : 'closed'}`} ref={ref}>
         <div className='links__navlink'>
            <Information cont={'Ezt az oldalt fogják látni a vásárlók.'} className='links__information' />
            <NavLink
               to={`/${username}`}
               target='_blank'
               onClick={() => {
                  setIsOpenMenu(false);
               }}
            >
               <IoEyeOutline className='links__icon' />
            </NavLink>
         </div>

         <div className='links__navlink'>
            <Information cont={'Saját link egyszerű megosztása.'} className='links__information' />

            <Icon
               className='links__icon'
               onClick={() => {
                  setUrl(import.meta.env.VITE_BASE_URL_LINK + username);
                  handleOpenModal();
                  setIsOpenMenu(false);
               }}
            >
               <IoCopyOutline />
            </Icon>
         </div>

         {/* <Icon
            className='links__icon links__icon'
            onClick={() => {
               setIsOpenMenu(false);
               setIsDraggable(true);
            }}
         >
            <RiDragDropLine />
         </Icon> */}
         <div className='links__navlink'>
            <Information cont={'Különböző beállítások. (Még fejlesztés alatt)'} className='links__information' />

            <Icon
               className='links__icon links__icon--settings'
               onClick={() => {
                  setIsOpenMenu(false);
               }}
            >
               <IoSettingsOutline />
            </Icon>
         </div>
         <div className='links__navlink'>
            <Information cont={'Social media linkek'} className='links__information' />
            <Icon
               className='links__icon'
               onClick={() => {
                  setIsOpenMenu(false);
                  setIsOpenSocialModal(true);
               }}
            >
               <IoShareSocialOutline />
            </Icon>
         </div>

         <Icon className='links__icon links__icon--chevron' onClick={() => setIsOpenMenu(open => !open)}>
            {isOpenMenu ? <IoChevronBack /> : <IoChevronForward />}
         </Icon>
      </div>
   );
}
