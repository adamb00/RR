import { InferSchemaType, Model, Schema, model } from 'mongoose';
import ITransaction from '../interfaces/ITransactions';

const transactionSchema: Schema = new Schema<ITransaction>({
   requestTime: Date,
   fulfillTime: Date,
   userEmail: String,
   userID: String,
   amount: Number,
   wallet: String,
   type: String,
});

const Transaction: Model<ITransaction> = model<ITransaction>('Transaction', transactionSchema);
export type TransactionType = InferSchemaType<typeof transactionSchema>;
export default Transaction;
