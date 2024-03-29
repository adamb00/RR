import useDeviceDetection from '@/hooks/useDetectDevice';
import ShareLinks from '@/features/Links/ShareLinks';

import LinkAdmin from '@/features/Links/LinkAdmin/LinkAdmin';
import { ILink } from '@/interfaces/ILink';
import Loader from '@/ui/Loader';
import RestrictedRoute from '@/ui/RestrictedRoute';
import { useSelector } from 'react-redux';
import { selectIsAdmin } from '@/features/Auth/slices/auth/authSlice';
import { useTranslation } from 'react-i18next';

import { useLinks } from '@/context/LinkContext';

export default function EditLinks() {
   const isAdmin = useSelector(selectIsAdmin);
   const { t } = useTranslation();

   const { links, isLoading } = useLinks();

   const device = useDeviceDetection();

   if (!isAdmin) return <RestrictedRoute />;

   if (!links)
      return (
         <div className='admin-links'>
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
   return (
      <>
         <ShareLinks />
         <div className='admin-links'>
            {links.map((link: ILink) => (
               <LinkAdmin key={link._id} link={link} device={device} />
            ))}
         </div>
      </>
   );
}
