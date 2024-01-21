import { useGetAllLinks } from './useLinks';
import Paginator from '../../ui/Paginator';
import PuffLoader from 'react-spinners/PuffLoader';
import { ILink } from '../../interfaces/ILink';
import LinkItem from './LinkItem';
import Trash from '../../ui/Trash';
import { useIsMobile } from '../../hooks/useIsMobile';
import { useAuth } from '../../context/AuthContext';
import useDeviceDetection from '../../hooks/useDetectDevice';

export default function Links() {
   const { links, isLoading, count } = useGetAllLinks();
   const { isMobile } = useIsMobile();
   const { user } = useAuth();
   const isAdmin = user?.role === 'Admin';
   const device = useDeviceDetection();

   if (isLoading || !links)
      return (
         <div className='links__loader'>
            <PuffLoader color='#ed535b' size={100} />
         </div>
      );

   return (
      <>
         <div className='links'>
            {links.doc.map((link: ILink) => (
               <LinkItem key={link._id} link={link} isMobile={isMobile} />
            ))}
         </div>
         <Paginator count={count} />
         {/* {!isMobile && isAdmin && <Trash />} */}
         {device !== 'mobile' && device !== 'tablet' && isAdmin && <Trash />}
      </>
   );
}
