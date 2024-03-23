import { useState } from 'react';
import Button from '../../ui/Buttons/Button';
import AvailablePoints from './AvailablePoints';
import Team from './Team';
import InviteModal from './InviteModal';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../Auth/slices/auth/authSlice';

export default function HomeAuth() {
   const [inviteModalOpen, setInviteModalOpen] = useState<boolean>(false);
   const user = useSelector(selectCurrentUser);

   return (
      <>
         {inviteModalOpen && (
            <InviteModal
               setInviteModalOpen={setInviteModalOpen}
               url={`${import.meta.env.VITE_BASE_URL_LINK}/#/signup/${user.referralCode}`}
            />
         )}
         <AvailablePoints />
         <Button className='btn btn--tertiary home__invite' onClick={() => setInviteModalOpen(true)}>
            Build your own family now!
         </Button>
         <Team />
      </>
   );
}
