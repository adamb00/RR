import { Document, Schema } from 'mongoose';

export default interface INotification extends Document {
   title: string;
   message: string;
   read?: boolean;
   created_at: Date;
   created_by: string;
   _id: string;
}
