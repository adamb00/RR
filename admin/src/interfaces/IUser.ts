import { ILink } from './ILink';
import INotification from './INotification';
import { ISocialLinks } from './ISocialLinks';

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
   availableLinks: ILink[];
   refreshToken: string;
   phone: string;
   username: string;
   socialLinks: ISocialLinks[];
   trc: string;
   lastAsk: Date;
   hasActiveAsk: boolean;
   adamPoints: number;
}
