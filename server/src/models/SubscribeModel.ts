import { InferSchemaType, Schema, model } from 'mongoose';
import ISubscription from '../interfaces/ISubscription';
import validator from 'validator';

export const subscribeSchema: Schema = new Schema<ISubscription>(
   {
      email: {
         unique: true,
         lowercase: true,
         type: String,
         required: [true, 'Please, provide us, your email address.'],
         validate: [validator.isEmail, 'Please, provide a valid email address.'],
      },
      accept: { type: Boolean, default: true },
   },
   {
      versionKey: false,
   }
);

const Subscription = model<ISubscription>('Subscription', subscribeSchema);
export type SubscriptionType = InferSchemaType<typeof subscribeSchema>;
export default Subscription;
