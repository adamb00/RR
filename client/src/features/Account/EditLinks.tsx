import useDeviceDetection from '../../hooks/useDetectDevice';
import ShareLinks from '../Links/ShareLinks';

import LinkAdmin from '../Links/LinkAdmin/LinkAdmin';
import { ILink } from '../../interfaces/ILink';
import Loader from '../../ui/Loader';
import RestrictedRoute from '../../ui/RestrictedRoute';
import { useSelector } from 'react-redux';
import { selectIsAdmin } from '../Auth/slices/auth/authSlice';
import { useTranslation } from 'react-i18next';

import { useLinks } from '../../context/LinkContext';

export default function EditLinks() {
   const isAdmin = useSelector(selectIsAdmin);
   const { t } = useTranslation();

   const { links, isLoading } = useLinks();

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
   return (
      <>
         <ShareLinks />
         <div className='link'>
            {links.map((link: ILink) => (
               <LinkAdmin key={link._id} link={link} device={device} />
            ))}
         </div>
      </>
   );
}
