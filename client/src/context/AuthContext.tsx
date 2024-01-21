import { PropsWithChildren, createContext, useContext, useEffect, useReducer } from 'react';
import { useLocalStorageState } from '../hooks/useLocalStorageState';
import { useCookies } from 'react-cookie';
import { AppState, AuthAction, AuthContextValue, UserData } from '../interfaces/AuthInterfaces';

const initialState: AppState = {
   user: undefined,
   token: undefined,
   isAuthenticated: false,
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const reducer = (state: AppState, action: AuthAction): AppState => {
   switch (action.type) {
      case 'signin':
         return { user: action.payload.data, token: action.payload.token, isAuthenticated: true };
      case 'signout':
         return { ...state, user: undefined, token: undefined, isAuthenticated: false };
      default:
         throw new Error('Unknown action');
   }
};

const AuthProvider = ({ children }: PropsWithChildren) => {
   const initialUserState: UserData | undefined = undefined;
   const [{ user, isAuthenticated, token }, dispatch] = useReducer(reducer, initialState);
   const [userLogginIn, setUserLoggedIn] = useLocalStorageState<UserData | undefined>(initialUserState, 'userData');
   const [cookies, setCookies, removeCookies] = useCookies(['jwt']);

   useEffect(() => {
      if (userLogginIn && userLogginIn.token) {
         dispatch({ type: 'signin', payload: { data: userLogginIn, token: userLogginIn.token } });
         setCookies('jwt', token, { expires: new Date(Date.now() + 1 * 60 * 60 * 1000) });
      }
   }, [userLogginIn, token, setCookies, cookies]);

   const signin = (data: { data: UserData; token: string }) => {
      dispatch({ type: 'signin', payload: data });
      setUserLoggedIn({ ...data.data, token: data.token });
      setCookies('jwt', token, { expires: new Date(Date.now() + 1 * 60 * 60 * 1000) });
   };
   const signout = () => {
      dispatch({ type: 'signout' });
      setUserLoggedIn(undefined);
      setCookies('jwt', undefined);
      removeCookies('jwt');
   };
   const contextValue: AuthContextValue = {
      user,
      isAuthenticated,
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
