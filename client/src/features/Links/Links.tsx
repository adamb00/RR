import { ILink } from '@/interfaces/ILink';
import LinkUser from './LinkUser/LinkUser';
import useDeviceDetection from '@/hooks/useDetectDevice';
import { selectCurrentUser } from '../Auth/slices/auth/authSlice';
import { useSelector } from 'react-redux';

import { useState } from 'react';
import ShareModal from '@/ui/Modals/ShareModal';
import LinksMenu from './LinksMenu';
import SocialModal from '@/ui/Modals/SocialModal';

export default function Links() {
   const user = useSelector(selectCurrentUser);

   const { availableLinks, username } = user;
   const device = useDeviceDetection();
   const [isOpenModal, setIsOpenModal] = useState(false);
   const [url, setUrl] = useState<string>('');
   const handleOpenModal = () => setIsOpenModal(open => !open);
   const [, setIsDraggable] = useState(false);

   const [sortedLinks] = useState<ILink[]>([...availableLinks].sort((a, b) => a.order - b.order));
   const [isOpenSocialModal, setIsOpenSocialModal] = useState(false);

   if (!sortedLinks) return <h1 className='heading-primary'>No links yet</h1>;

   return (
      <div className={`links `}>
         <ShareModal isOpen={isOpenModal} setIsOpen={setIsOpenModal} url={url} />
         <SocialModal isOpen={isOpenSocialModal} setIsOpen={setIsOpenSocialModal} user={user} />
         <LinksMenu
            username={username}
            setUrl={setUrl}
            handleOpenModal={handleOpenModal}
            setIsDraggable={setIsDraggable}
            setIsOpenSocialModal={setIsOpenSocialModal}
         />

         <div className='links__container'>
            {sortedLinks.map((link: ILink) => (
               <LinkUser
                  link={link}
                  device={device}
                  user={user}
                  setIsOpen={setIsOpenModal}
                  setUrl={setUrl}
                  key={link._id}
               />
            ))}
         </div>
      </div>
   );

   // return (
   //    <div className={`links `}>
   //       <ShareModal isOpen={isOpenModal} setIsOpen={setIsOpenModal} url={url} />
   //       <LinksMenu userId={_id} setUrl={setUrl} handleOpenModal={handleOpenModal} setIsDraggable={setIsDraggable} />

   //       <Reorder.Group values={sortedLinks} onReorder={handleReorder} className='links__container'>
   //          {sortedLinks.map((link: ILink) => (
   //             <Reorder.Item value={link} className='links__card' key={link._id} draggable={link.order !== 0}>
   //                <LinkUser link={link} device={device} user={user} setIsOpen={setIsOpenModal} setUrl={setUrl} />
   //             </Reorder.Item>
   //          ))}
   //       </Reorder.Group>
   //    </div>
   // );
}
