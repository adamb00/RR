import { Document } from 'mongoose';

export default interface IUser extends Document {
   name: string;
   email: string;
   password: string;
   passwordConfirm: string;
   passwordChangedAt?: Date;
   passwordResetToken?: string;
   passwordResetExpires?: number;
   createdAt: Date;
   nationality: string;
   birthday: Date;
   referralCode: number;
   level: number;
   parent: string;
   children: string[];
   grandChildren: string[];
   photo: string;
   role: string;
   availableLinks: string[];
   active: boolean;
   notifications: string[];
   availablePoints: number;
}
