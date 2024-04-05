import { useOutsideClick } from '@/hooks/useOutsideClick';
import Icon from '@/ui/Icon';
import { Dispatch, SetStateAction, useState } from 'react';

import {
   IoChevronBack,
   IoChevronForward,
   IoCopyOutline,
   IoEyeOutline,
   IoSettingsOutline,
   IoShareSocialOutline,
} from 'react-icons/io5';
// import { RiDragDropLine } from 'react-icons/ri';
import { NavLink } from 'react-router-dom';

interface LinksMenuProps {
   userId: string;
   setUrl: Dispatch<SetStateAction<string>>;
   setIsDraggable: Dispatch<SetStateAction<boolean>>;
   setIsOpenSocialModal: Dispatch<SetStateAction<boolean>>;
   handleOpenModal: () => void;
}

export default function LinksMenu({ userId, setUrl, handleOpenModal, setIsOpenSocialModal }: LinksMenuProps) {
   const [isOpenMenu, setIsOpenMenu] = useState(false);

   const ref = useOutsideClick(() => setIsOpenMenu(false));

   return (
      <div className={`links__side-menu ${isOpenMenu ? 'open' : 'closed'}`} ref={ref}>
         <NavLink
            to={`/${userId}`}
            target='_blank'
            onClick={() => {
               setIsOpenMenu(false);
            }}
         >
            <IoEyeOutline className='links__icon' />
         </NavLink>

         <Icon
            className='links__icon'
            onClick={() => {
               setUrl(import.meta.env.VITE_BASE_URL_LINK + userId);
               handleOpenModal();
               setIsOpenMenu(false);
            }}
         >
            <IoCopyOutline />
         </Icon>

         {/* <Icon
            className='links__icon links__icon'
            onClick={() => {
               setIsOpenMenu(false);
               setIsDraggable(true);
            }}
         >
            <RiDragDropLine />
         </Icon> */}
         <Icon
            className='links__icon links__icon--settings'
            onClick={() => {
               setIsOpenMenu(false);
            }}
         >
            <IoSettingsOutline />
         </Icon>
         <Icon
            className='links__icon'
            onClick={() => {
               setIsOpenMenu(false);
               setIsOpenSocialModal(true);
            }}
         >
            <IoShareSocialOutline />
         </Icon>

         <Icon className='links__icon links__icon--chevron' onClick={() => setIsOpenMenu(open => !open)}>
            {isOpenMenu ? <IoChevronBack /> : <IoChevronForward />}
         </Icon>
      </div>
   );
}
