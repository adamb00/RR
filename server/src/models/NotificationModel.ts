import { InferSchemaType, Schema, model } from 'mongoose';
import INotification from '../interfaces/INotification';
import { AsyncLocalStorage } from 'async_hooks';

const notificationSchema: Schema = new Schema<INotification>({
   title: {
      type: String,
   },
   message: {
      type: String,
   },

   created_at: {
      type: Date,
   },
   created_by: {
      type: String,
   },
});

const Notification = model<INotification>('Notification', notificationSchema);

export type NotificationType = InferSchemaType<typeof notificationSchema>;
export default Notification;
