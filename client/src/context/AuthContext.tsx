// import { PropsWithChildren, createContext, useContext, useEffect, useReducer, useState } from 'react';
// import { AppState, AuthAction, AuthContextValue, UserData } from '../interfaces/AuthInterfaces';
// import { useCookies } from 'react-cookie';
// import { useSessionStorageState } from '../hooks/useSessionStorageState';
// import { useGetCurrentUser } from '../features/Auth/useUserAuth';
// import { SIGN_IN, SIGN_OUT } from '../utils/constants';

// const initialState: AppState = {
//    user: undefined,
//    token: undefined,
//    isAuthenticated: false,
// };

// const AuthContext = createContext<AuthContextValue | undefined>(undefined);

// const reducer = (state: AppState, action: AuthAction): AppState => {
//    switch (action.type) {
//       case SIGN_IN:
//          return { user: action.payload.user, token: action.payload.token, isAuthenticated: true };
//       case SIGN_OUT:
//          return { ...state, user: undefined, token: undefined, isAuthenticated: false };

//       default:
//          throw new Error('Unknown action');
//    }
// };
// const AuthProvider = ({ children }: PropsWithChildren) => {
//    const initialUserState: UserData | undefined = undefined;
//    const [, setCookies, removeCookies] = useCookies(['jwt']);
//    const [userLoggedIn, setUserLoggedIn] = useSessionStorageState<string | undefined>(initialUserState, 'user');

//    const [{ user, isAuthenticated, token }, dispatch] = useReducer(reducer, initialState);
//    const [isAdmin, setIsAdmin] = useState<boolean>(false);
//    const { currentUser: getCurrentUser, isLoading: isFetchingUser } = useGetCurrentUser();

//    useEffect(() => {
//       const signInUser = async () => {
//          if (userLoggedIn && getCurrentUser?.currentUser) {
//             dispatch({ type: SIGN_IN, payload: { token: token as string, user: getCurrentUser.currentUser } });
//          }
//       };

//       signInUser();
//    }, [userLoggedIn, getCurrentUser, token, user]);

//    useEffect(() => {
//       if (user?.role) setIsAdmin(user.role === 'Admin');
//    }, [user]);

//    const signin = (data: { token: string; expires: Date; data: UserData }) => {
//       dispatch({ type: SIGN_IN, payload: { token: data.token, user: data.data } });

//       if (data.token) {
//          setCookies('jwt', data.token, { expires: new Date(data.expires), path: '/' });
//          setUserLoggedIn(data.token);
//       }
//    };

//    //TODO AFTER LOGOUT THE PREVIOUS USER WILL GET IN THE CONTEXT UNTIL THE PAGE NOT REFRESHED
//    const signout = () => {
//       dispatch({ type: SIGN_OUT });
//       removeCookies('jwt');
//       setUserLoggedIn(undefined);
//       sessionStorage.removeItem('user');
//    };

//    const contextValue: AuthContextValue = {
//       user,
//       isAuthenticated,
//       isFetchingUser,
//       isAdmin,
//       token,
//       dispatch,
//       signin,
//       signout,
//    };

//    return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
// };

// export const useAuth = () => {
//    const context = useContext(AuthContext);
//    if (context === undefined) throw new Error('AuthContext was used outside AuthProvider');
//    return context;
// };

// export { AuthProvider, AuthContext };
