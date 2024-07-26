import { createMonogram, userImage } from '@/utils/helpers';
import { useGetOneUser } from '../Auth/useUserAuth';

interface ChildrenProps {
   id: string;
}

export default function Children({ id }: ChildrenProps) {
   const { currentUser } = useGetOneUser('id', id as string);

   if (!currentUser) return;

   const { doc: user } = currentUser;
   console.log(user);

   if (user.photo) {
      return (
         <div className={`team__user ${user.active ? 'team__user--active' : 'team__user--inactive'}`}>
            <div className='team__user--image'>
               <img src={userImage(user.photo)} alt='User Image' />
            </div>
         </div>
      );
   }

   return (
      <div className={`team__user ${user.active ? 'team__user--active' : 'team__user--inactive'}`}>
         {createMonogram(user.name)}
      </div>
   );
}
