import { NextFunction, Request, Response } from 'express';
import Notification from '../models/NotificationModel';
import * as handler from './../utils/handleControllers';
import User from '../models/UserModel';

export default class NotificationController {
   public getAllNotifications = handler.getAll(Notification);
   public getOneNotification = handler.getOne(Notification);
   public createNotification = handler.createOne(Notification);
   public updateOneNotification = handler.updateOne(Notification);
   public deleteOneNotification = handler.deleteOne(Notification);
}

// export const handleSocketNotification = async (data: object) => {
//    const doc = await Notification.create({ ...data });

//    const totalNotifications = await Notification.countDocuments();

//    if (totalNotifications > 35) {
//       const oldestNotification = await Notification.findOneAndDelete({}, { sort: { created_at: 1 } });
//       if (oldestNotification) {
//          await User.updateMany(
//             { role: { $ne: 'Admin' }, active: true },
//             { $pull: { notifications: { _id: oldestNotification._id } } }
//          );
//       }
//    }

//    await User.updateMany(
//       { role: { $ne: 'Admin' }, active: true },
//       { $push: { notifications: { $each: [doc], $position: 0 } } }
//    );

//    return doc;
// };
