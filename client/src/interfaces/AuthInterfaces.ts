import { ILink } from './ILink';
import INotification from './INotification';
import { ISocialLinks } from './ISocialLinks';
import ISystemNotifications from './ISystemNotifications';

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
   trc: string;
   socialLinks: ISocialLinks[];
   systemNotifications: ISystemNotifications[];
   lastAsk: Date;
   hasActiveAsk: boolean;
   description: string;
}
