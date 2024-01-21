import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useAuth } from '../context/AuthContext';

const useLogoutIfCookieExpires = (token: string) => {
   const [cookies, removeCookie] = useCookies(['jwt']);
   const { signout } = useAuth();

   useEffect(() => {
      const checkCookieExpiration = () => {
         if (cookies.jwt && new Date(cookies.jwt).getTime() < Date.now()) {
            signout();
            removeCookie('jwt', token);
         }
      };

      checkCookieExpiration();

      const intervalId = setInterval(checkCookieExpiration, 60 * 1000);

      return () => clearInterval(intervalId);
   }, [cookies.jwt, removeCookie, signout, token]);
};

export default useLogoutIfCookieExpires;
