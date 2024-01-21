import { createMonogram } from '../../utils/helpers';
import { useGetOneUser } from '../Auth/useUserAuth';
import PuffLoader from 'react-spinners/PuffLoader';

interface ChildrenProps {
   id: string;
}

export default function Children({ id }: ChildrenProps) {
   const { currentUser, isLoading: isLoadingUser } = useGetOneUser(id);

   if (isLoadingUser) return <PuffLoader color='#ed535b' />;

   const { doc: user } = currentUser;

   return (
      <div className={`team__user ${user.active ? 'team__user--active' : 'team__user--inactive'}`}>
         {createMonogram(user.name)}
      </div>
   );
}
