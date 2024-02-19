import useDeviceDetection from '../../hooks/useDetectDevice';
import ShareLinks from '../Links/ShareLinks';
import { useGetAllLinks } from '../Links/useLinks';

import LinkItemAdmin from '../Links/LinkItemAdmin';
// import Paginator from '../../ui/Paginator';
import { ILink } from '../../interfaces/ILink';
import Trash from '../../ui/Trash';
import Loader from '../../ui/Loader';
import RestrictedRoute from '../../ui/RestrictedRoute';
import { useSelector } from 'react-redux';
import { selectIsAdmin } from '../Auth/slices/auth/authSlice';
import { useTranslation } from 'react-i18next';

export default function EditLinks() {
   const { links, isLoading } = useGetAllLinks();
   const isAdmin = useSelector(selectIsAdmin);
   const { t } = useTranslation();

   const device = useDeviceDetection();

   if (!isAdmin) return <RestrictedRoute />;

   if (!links)
      return (
         <div className='link'>
            <h1 className='heading-primary'>{t('No links created yet')}</h1>
            <ShareLinks />
         </div>
      );

   if (isLoading)
      return (
         <div className='link__loader'>
            <Loader size={100} />
         </div>
      );
   //TODO IF NO LINK CREATED YET IN THE ADMIN ACOCUNT MENU AUTOMATICALLY REDIRECTS TO MY-LINKS PAGE
   return (
      <>
         <ShareLinks />
         <div className='link'>
            {links.doc
               .sort((a: ILink, b: ILink) => a.order - b.order)
               .map((link: ILink) => (
                  <LinkItemAdmin key={link._id} link={link} device={device} />
               ))}
         </div>
         {/* <Paginator count={count} /> */}
         {device === 'Desktop' && isAdmin && <Trash />}
      </>
   );
}
