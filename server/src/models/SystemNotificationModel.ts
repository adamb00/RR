import { InferSchemaType, Schema, model } from 'mongoose';
import ISystemNotifications from '../interfaces/ISystemNotifications';

export const systemNotificationSchema: Schema = new Schema<ISystemNotifications>({
   name: String,
   points: Number,
   created_at: Date,
});

const SystemNotification = model<ISystemNotifications>('SystemNotification', systemNotificationSchema);
export type SystemNotificationType = InferSchemaType<typeof systemNotificationSchema>;
export default SystemNotification;
