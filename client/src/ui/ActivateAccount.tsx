import { useNavigate, useParams } from 'react-router-dom';
import { useActivateUser } from '../features/Auth/useUserAuth';
import { useEffect } from 'react';

export default function ActivateAccount() {
   const { token } = useParams();
   const { activateUser } = useActivateUser();
   const navigation = useNavigate();

   useEffect(() => {
      activateUser(token as string);
      navigation('/signin');
   }, [activateUser, token, navigation]);

   return <div></div>;
}
