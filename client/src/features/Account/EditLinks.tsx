import useDeviceDetection from '../../hooks/useDetectDevice';
import ShareLinks from '../Links/ShareLinks';
import { useGetAllLinks } from '../Links/useLinks';

import LinkItemAdmin from '../Links/LinkItemAdmin';
import Paginator from '../../ui/Paginator';
import { ILink } from '../../interfaces/ILink';
import Trash from '../../ui/Trash';
import Loader from '../../ui/Loader';

import { useAppSelector } from '../../redux-hooks';

export default function EditLinks() {
   const { links, isLoading, count } = useGetAllLinks();
   const isAdmin = useAppSelector(state => state.auth.user?.role === 'Admin');

   const device = useDeviceDetection();

   if (isLoading)
      return (
         <div className='links__loader'>
            <Loader size={100} />
         </div>
      );

   if (!links) return <h1 className='heading-primary'>No links yet</h1>;

   return (
      <div>
         <ShareLinks />
         <div className='links'>
            {links.doc.map((link: ILink) => (
               <LinkItemAdmin key={link._id} link={link} device={device} />
            ))}
         </div>
         <Paginator count={count} />
         {device === 'Desktop' && isAdmin && <Trash />}
      </div>
   );
}
