// import Paginator from '../../ui/Paginator';
import { ILink } from '../../interfaces/ILink';
import LinkItem from './LinkItemUsers';
import useDeviceDetection from '../../hooks/useDetectDevice';
import { Draggable } from 'react-drag-reorder';

import Loader from '../../ui/Loader';

import RestrictedRoute from '../../ui/RestrictedRoute';
import { useUpdateLinkPosition } from '../../hooks/useUpdateLinkPosition';
import { selectCurrentUser } from '../Auth/slices/auth/authSlice';
import { useSelector } from 'react-redux';
import { IoCopyOutline, IoEyeOutline } from 'react-icons/io5';

import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import ShareModal from '../../ui/ShareModal';
import { BASE_URL_LINK } from '../../utils/constants';

export default function Links() {
   const user = useSelector(selectCurrentUser);
   const device = useDeviceDetection();
   const { isLoading, sortedLinks, handlePosChange } = useUpdateLinkPosition({ user });
   const [isOpen, setIsOpen] = useState(false);
   const [url, setUrl] = useState(BASE_URL_LINK + user._id);
   const handleOpenModal = () => setIsOpen(open => !open);

   if (isLoading)
      return (
         <div className='main'>
            <Loader size={250} />
         </div>
      );

   if (!user) return <RestrictedRoute />;

   const activeLinks = sortedLinks.filter((link: ILink) => link.active);

   if (!sortedLinks || activeLinks.length === 0) return <h1 className='heading-primary'>No links yet</h1>;

   return (
      <>
         <ShareModal isOpen={isOpen} setIsOpen={setIsOpen} url={url} />
         <div className='link'>
            <div className='link__container'>
               <div className='link__preview'>
                  <NavLink to={`/${user._id}`} target='noreffer _blank'>
                     <IoEyeOutline className='link__icon' />
                  </NavLink>

                  <NavLink to=''>
                     <IoCopyOutline className='link__icon' onClick={handleOpenModal} />
                  </NavLink>
               </div>

               <Draggable onPosChange={handlePosChange}>
                  {sortedLinks.map((link: ILink) => (
                     <LinkItem
                        key={link._id}
                        link={link}
                        device={device}
                        user={user}
                        setIsOpen={setIsOpen}
                        setUrl={setUrl}
                     />
                  ))}
               </Draggable>
            </div>

            {/* <Paginator count={count} /> */}
         </div>
      </>
   );
}
