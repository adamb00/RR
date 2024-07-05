import { Document } from 'mongoose';

export default interface ITransaction extends Document {
   requestTime: Date;
   fulfillTime: Date;
   userID: string;
   userEmail: string;
   amount: number;
   wallet: string;
   type: string;
}
