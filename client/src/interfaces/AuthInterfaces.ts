import { Dispatch } from 'react';

export interface UserData {
   name: string;
   email: string;
   role: 'Admin' | 'User';
   password: string;
   birthday: string;
   availablePoints: number;
   createdAt: string;
   nationality: string;
   referralCode: number;
   level: number;
   children_level_1: string[];
   children_level_2: string[];
   children_level_3: string[];
   active: boolean;
   notifications: string[];
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
      data: UserData;
      token: string;
   };
}

export interface SignoutAction {
   type: 'signout';
}

export type AuthAction = SigninAction | SignoutAction;

export interface AuthContextValue {
   user: UserData | undefined;
   isAuthenticated: boolean;
   token: string | undefined;
   dispatch: Dispatch<AuthAction>;
   signin: (data: { data: UserData; token: string }) => void;
   signout: () => void;
}
