import { useParams } from 'react-router-dom';
import { useGetOneUser } from '../Auth/useUserAuth';

export default function MyLink() {
   const { id } = useParams();
   const { currentUser } = useGetOneUser(id as string);

   return <div>{currentUser?.doc.name}</div>;
}
