import { NextFunction, Request, Response } from 'express';
import Notification from '../models/NotificationModel';
import * as handler from './../utils/handleControllers';
import User from '../models/UserModel';
import catchAsync from '../utils/catchAsync';
import AppError from '../utils/appError';
import ISystemNotifications from '../interfaces/ISystemNotifications';

export default class NotificationController {
   public getAllNotifications = handler.getAll(Notification);
   public getOneNotification = handler.getOne(Notification);
   public createNotification = handler.createOne(Notification);
   public updateOneNotification = handler.updateOne(Notification);
   public deleteOneNotification = handler.deleteOne(Notification);
}

export const createNotification = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
   const query = { ...req.body, created_by: req.user.name };
   const doc = await Notification.create(query);

   const totalNotifications = await Notification.countDocuments();

   if (totalNotifications > 35) {
      const oldestNotification = await Notification.findOneAndDelete({}, { sort: { created_at: 1 } });
      if (oldestNotification) {
         await User.updateMany({ active: true }, { $pull: { notifications: { _id: oldestNotification._id } } });
      }
   }

   await User.updateMany({ active: true }, { $push: { notifications: { $each: [doc], $position: 0 } } });

   res.status(201).json({
      status: 'success',
      doc,
   });
});

export const createSystemNotification = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
   const { id } = req.params;
   const { notification } = req.body;

   const user = await User.findById(id);

   if (!user) {
      res.status(404).json({
         status: 'error',
         message: 'No user found...',
      });
      return next(new AppError('No user found...', 404));
   }

   const updatedNotification = {
      message: notification,
      created_at: new Date(Date.now()),
      type: 'Cashout',
   } as ISystemNotifications;

   user.systemNotifications.push(updatedNotification);

   user.save();

   res.status(201).json({
      status: 'success',
   });
});
