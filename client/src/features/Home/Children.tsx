import { memo } from 'react';
import Loader from '../../ui/Loader';
import { createMonogram } from '../../utils/helpers';
import { useGetOneUser } from '../Auth/useUserAuth';
import UserImage from '../../ui/UserImage';

interface ChildrenProps {
   id: string;
}

export default memo(function Children({ id }: ChildrenProps) {
   const { currentUser, isLoading: isLoadingUser } = useGetOneUser(id);

   if (!currentUser) return;
   if (isLoadingUser) return <Loader size={100} />;

   const { doc: user } = currentUser;

   if (user.photo) {
      return (
         <div className={`team__user ${user.active ? 'team__user--active' : 'team__user--inactive'}`}>
            <div className='team__user--image'>
               <UserImage user={user} />
            </div>
         </div>
      );
   }

   return (
      <div className={`team__user ${user.active ? 'team__user--active' : 'team__user--inactive'}`}>
         {createMonogram(user.name)}
      </div>
   );
});
