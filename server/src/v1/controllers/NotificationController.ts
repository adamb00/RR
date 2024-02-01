import { NextFunction, Request, Response } from 'express';
import Notification from '../models/NotificationModel';
import catchAsync from '../utils/catchAsync';
import * as handler from './../utils/handleControllers';
import User from '../models/UserModel';

export default class NotificationController {
   public getAllNotifications = handler.getAll(Notification);
   public getOneNotification = handler.getOne(Notification);
   public createNotification = handler.createOne(Notification);
   public updateOneNotification = handler.updateOne(Notification);
   public deleteOneNotification = handler.deleteOne(Notification);
}

export const createNotification = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
   const doc = await Notification.create({ ...req.body, created_by: req.user.name });

   await User.updateMany(
      { role: { $ne: 'Admin' }, active: true },
      { $push: { notifications: { _id: doc.id, read: false } } }
   );

   res.status(201).json({
      status: 'success',
      doc,
   });
});
