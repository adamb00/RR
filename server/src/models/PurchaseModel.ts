import { InferSchemaType, Schema, model } from 'mongoose';
import IPurchase from '../interfaces/IPurchase';

const purchasSchema: Schema = new Schema<IPurchase>({
   id: String,
   value: String,
   name: String,
   affid: String,
   pontok: String,
   created_at: Date,
});

const Purchase = model<IPurchase>('Purchase', purchasSchema);

export type PurchaseType = InferSchemaType<typeof purchasSchema>;
export default Purchase;
