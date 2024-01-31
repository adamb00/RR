import { PropsWithChildren, createContext, useContext, useEffect, useReducer } from 'react';
import { AppState, AuthAction, AuthContextValue, UserData } from '../interfaces/AuthInterfaces';
import { useCookies } from 'react-cookie';
import { useSessionStorageState } from '../hooks/useSessionStorageState';
import { useGetCurrentUser } from '../features/Auth/useUserAuth';

const initialState: AppState = {
   user: undefined,
   token: undefined,
   isAuthenticated: false,
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const reducer = (state: AppState, action: AuthAction): AppState => {
   switch (action.type) {
      case 'signin':
         return { user: action.payload.user, token: action.payload.token, isAuthenticated: true };
      case 'signout':
         return { ...state, user: undefined, token: undefined, isAuthenticated: false };

      default:
         throw new Error('Unknown action');
   }
};
const AuthProvider = ({ children }: PropsWithChildren) => {
   const initialUserState: UserData | undefined = undefined;
   const [, setCookies, removeCookies] = useCookies(['jwt']);
   const [userLoggedIn, setUserLoggedIn] = useSessionStorageState<string | undefined>(initialUserState, 'user');
   const [{ user, isAuthenticated, token }, dispatch] = useReducer(reducer, initialState);
   const { currentUser: getCurrentUser, isLoading: isFetchingUser } = useGetCurrentUser();

   useEffect(() => {
      const signInUser = async () => {
         if (userLoggedIn && getCurrentUser?.currentUser) {
            dispatch({ type: 'signin', payload: { token: token as string, user: getCurrentUser?.currentUser } });
         }
      };

      signInUser();
   }, [userLoggedIn, getCurrentUser, token]);

   const isAdmin = user?.role === 'Admin';

   const signin = (data: { token: string; expires: Date; data: UserData }) => {
      dispatch({ type: 'signin', payload: { token: data.token, user: data.data } });
      setCookies('jwt', data.token, { expires: new Date(data.expires) });
      setUserLoggedIn(data.token);

      const now = new Date().getTime();
      const expirationTime = new Date(data.expires).getTime() - now;
      const logoutTimer = setTimeout(() => {
         signout();
      }, expirationTime);
      sessionStorage.setItem('logoutTimer', logoutTimer.toString());
   };

   //TODO AFTER LOGOUT THE PREVIOUS USER WILL GET IN THE CONTEXT WHILE THE PAGE NOT REFRESHED
   const signout = () => {
      dispatch({ type: 'signout' });
      removeCookies('jwt');
      setUserLoggedIn(undefined);

      sessionStorage.removeItem('user');

      const logoutTimer = sessionStorage.getItem('logoutTimer');
      if (logoutTimer) {
         clearTimeout(parseInt(logoutTimer, 10));
         sessionStorage.removeItem('logoutTimer');
      }
   };

   const contextValue: AuthContextValue = {
      user,
      isAuthenticated,
      isFetchingUser,
      isAdmin,
      token,
      dispatch,
      signin,
      signout,
   };

   return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
   const context = useContext(AuthContext);
   if (context === undefined) throw new Error('AuthContext was used outside AuthProvider');
   return context;
};

export { AuthProvider, AuthContext };
