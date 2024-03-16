// import Paginator from '../../ui/Paginator';
import { ILink } from '../../interfaces/ILink';
import LinkUser from './LinkUser/LinkUser';
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

export default function Links() {
   const user = useSelector(selectCurrentUser);
   const device = useDeviceDetection();
   const { isLoading, sortedLinks, handlePosChange } = useUpdateLinkPosition({ user });
   const [isOpen, setIsOpen] = useState(false);
   const [url, setUrl] = useState<string>('');
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
      <div className='my-link'>
         <ShareModal isOpen={isOpen} setIsOpen={setIsOpen} url={url} />
         <div className='my-link__preview'>
            <NavLink to={`/${user._id}`} target='noreffer _blank'>
               <IoEyeOutline className='my-link__icon' />
            </NavLink>

            <NavLink to=''>
               <IoCopyOutline
                  className='my-link__icon'
                  onClick={() => {
                     setUrl(import.meta.env.VITE_BASE_URL_LINK + user._id);
                     handleOpenModal();
                  }}
               />
            </NavLink>
         </div>

         <div className='my-link__container'>
            <Draggable onPosChange={handlePosChange}>
               {sortedLinks.map((link: ILink) => (
                  <LinkUser
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
   );
}
