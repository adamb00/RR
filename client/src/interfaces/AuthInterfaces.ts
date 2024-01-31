import { Dispatch } from 'react';
import INotification from './INotification';

export interface UserLinks {
   title: string;
   link: string;
   active: boolean;
}

export interface UserData {
   name: string;
   email: string;
   role: 'Admin' | 'User';
   password: string;
   birthday: string;
   availablePoints: number;
   accumulatedPoints: number;
   createdAt: string;
   nationality: string;
   referralCode: number;
   level: number;
   children_level_1: string[];
   children_level_2: string[];
   children_level_3: string[];
   active: boolean;
   notifications: INotification[];
   passwordChangedAt: string;
   _id: string;
   __v: number;
   token: string;
}

export interface AppState {
   user: UserData | undefined;
   token: string | undefined;
   isAuthenticated: boolean;
}

export interface SigninAction {
   type: 'signin';
   payload: {
      user?: UserData;
      token: string;
      expires?: Date;
   };
}

export interface SignoutAction {
   type: 'signout';
}

export interface UpdateAction {
   type: 'updateUser';
   payload: UserData;
}

export type AuthAction = SigninAction | SignoutAction;

export interface AuthContextValue {
   user: UserData | undefined;
   isAuthenticated: boolean;
   isFetchingUser: boolean;
   isAdmin: boolean;
   token: string | undefined;
   dispatch: Dispatch<AuthAction>;
   signin: (data: { expires: Date; token: string; data: UserData }) => void;
   signout: () => void;
}
