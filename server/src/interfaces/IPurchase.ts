import { Document } from 'mongoose';

export default interface IPurchase extends Document {
   id: string;
   value: string;
   name: string;
   affid: string;
   pontok: string;
   created_at: Date;
}
