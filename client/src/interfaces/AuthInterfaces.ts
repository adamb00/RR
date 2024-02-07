import INotification from './INotification';

export interface UserProfileData {
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
   photo: string;
   children_level_1: string[];
   children_level_2: string[];
   children_level_3: string[];
   active: boolean;
   notifications: INotification[];
   passwordChangedAt: string;
   _id: string;
}
