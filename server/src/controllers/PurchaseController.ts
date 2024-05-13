import { NextFunction, Request, Response } from 'express';

import catchAsync from '../utils/catchAsync';
import Purchase from '../models/PurchaseModel';
import User from '../models/UserModel';
import AppError from '../utils/appError';
import ISystemNotifications from '../interfaces/ISystemNotifications';

export const createPurchase = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
   const doc = await Purchase.create({ ...req.body, created_at: new Date(Date.now()) });

   const user = await User.findOne({ referralCode: doc.affid });

   if (!user) {
      res.status(404).json({ status: 'error', message: 'No user found with that referral code' });
      return next(new AppError('No user found with this referral code', 404));
   }

   const notification = {
      name: req.body.name,
      points: +req.body.pontok,
      created_at: new Date(Date.now()),
   } as ISystemNotifications;

   user.systemNotifications.push(notification);
   user.availablePoints += +doc.pontok;
   user.save();

   res.status(201).json({
      status: 'success',
      doc,
   });
});
