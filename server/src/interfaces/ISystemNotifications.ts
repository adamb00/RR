import { Document } from 'mongoose';

export default interface ISystemNotifications extends Document {
   name: string;
   points: number;
   created_at: Date;
}
