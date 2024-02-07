import { useGetAllLinks } from './useLinks';
import Paginator from '../../ui/Paginator';
import { ILink } from '../../interfaces/ILink';
import LinkItem from './LinkItemUsers';
import useDeviceDetection from '../../hooks/useDetectDevice';
import { Draggable } from 'react-drag-reorder';
import { useEffect } from 'react';
import { useLocalStorageState } from '../../hooks/useLocalStorageState';
import { IoEyeOutline, IoSettingsOutline } from 'react-icons/io5';
import Icon from '../../ui/Icon';
import { Link } from 'react-router-dom';
import Loader from '../../ui/Loader';

import { useAppSelector } from '../../redux-hooks';
import RestrictedRoute from '../../ui/RestrictedRoute';

export default function Links() {
   const user = useAppSelector(state => state.auth.user);
   const { links, isLoading, count } = useGetAllLinks();
   const [orderedLinks, setOrderedLinks] = useLocalStorageState<ILink[]>([], 'orderedLinks');
   const device = useDeviceDetection();

   useEffect(() => {
      if (links) {
         setOrderedLinks(links.doc);
      }
   }, [links, setOrderedLinks]);

   useEffect(() => {
      if (links) {
         if (orderedLinks.length !== links.doc.length) {
            setOrderedLinks(links.doc);
         }
      }
   }, [links, orderedLinks, setOrderedLinks]);

   const handlePosChange = (currentPos: number, newPos: number) => {
      const newOrderedLinks = [...orderedLinks];
      const [movedLink] = newOrderedLinks.splice(currentPos, 1);
      newOrderedLinks.splice(newPos, 0, movedLink);

      setOrderedLinks(newOrderedLinks);
   };

   if (!user) return <RestrictedRoute />;

   if (isLoading || !links)
      return (
         <div className='links__loader'>
            <Loader size={250} />
         </div>
      );

   const activeLinks = orderedLinks.filter((link: ILink) => link.active);
   if (!links || activeLinks.length === 0) return <h1 className='heading-primary'>No links yet</h1>;

   return (
      <div className='link'>
         <div className='link__preview'>
            <Icon className='link__icon'>
               <IoSettingsOutline />
            </Icon>

            <Link to={`/${user!._id}`} target='_blank' rel='noopener noreferrer'>
               <Icon className='link__icon'>
                  <IoEyeOutline />
               </Icon>
            </Link>
         </div>
         <div className='links'>
            <Draggable onPosChange={handlePosChange}>
               {orderedLinks.map((link: ILink) => (
                  <LinkItem key={link._id} link={link} device={device} />
               ))}
            </Draggable>
         </div>
         <Paginator count={count} />
      </div>
   );
}
