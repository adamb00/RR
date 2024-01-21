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
   children_level_1: string[];
   children_level_2: string[];
   children_level_3: string[];
   photo: string;
   role: string;
   active: boolean;
   notifications: string[];
   availablePoints: number;
}
