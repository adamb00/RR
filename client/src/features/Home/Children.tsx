import Loader from '@/ui/Loader';
import { createMonogram } from '@/utils/helpers';
import { useGetOneUser } from '../Auth/useUserAuth';
import { useGetImage } from '@/hooks/useGetImage';

interface ChildrenProps {
   id: string;
}

export default function Children({ id }: ChildrenProps) {
   const { currentUser, isLoading: isLoadingUser } = useGetOneUser('id', id as string);
   const { image: userImage, isLoading: isLoadingImage } = useGetImage(currentUser);

   if (!currentUser) return;
   if (isLoadingUser || isLoadingImage) return <Loader size={100} />;

   const { doc: user } = currentUser;
   console.log(user);

   if (user.photo) {
      return (
         <div className={`team__user ${user.active ? 'team__user--active' : 'team__user--inactive'}`}>
            <div className='team__user--image'>
               <img src={userImage} alt='User Image' />
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
