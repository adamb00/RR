import { Document } from 'mongoose';
import INotification from './INotification';
import ILink from './ILink';
import ISocialLinks from './ISocialLinks';
import ISystemNotifications from './ISystemNotifications';

export default interface IUser extends Document {
   name: string;
   email: string;
   password: string;
   passwordConfirm: string | undefined;
   passwordChangedAt?: Date;
   passwordResetToken?: string;
   passwordResetExpires?: number;
   createdAt: Date;
   nationality: string;
   birthday: Date;
   referralCode: number;
   level: number;
   parent: string;
   children_level_1: string[];
   children_level_2: string[];
   children_level_3: string[];
   photo: string;
   role: string;
   active: boolean;
   activationToken?: string;
   activationTokenExpires?: Date;
   notifications: INotification[];
   systemNotifications: ISystemNotifications[];
   availablePoints: number;
   accumulatedPoints: number;
   availableLinks: ILink[];
   refreshToken: string;
   phone: string;
   username: string;
   socialLinks: ISocialLinks[];

   createPasswordResetToken: () => string;
   createActivationToken: () => string;
}
