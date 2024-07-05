import { NextFunction, Request, Response } from 'express';

import catchAsync from '../utils/catchAsync';
import Purchase from '../models/PurchaseModel';
import User from '../models/UserModel';
import AppError from '../utils/appError';
import ISystemNotifications from '../interfaces/ISystemNotifications';

export const createPurchase = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
   if (!req.body.affid) {
      res.status(404).json({ status: 'error', message: 'Referral code needed' });
      return next(new AppError('Referral code needed', 404));
   }

   const doc = await Purchase.create({ ...req.body, created_at: new Date(Date.now()) });

   const user = await User.findOne({ referralCode: +doc.affid });

   if (!user) {
      res.status(404).json({ status: 'error', message: 'No user found with that referral code' });
      return next(new AppError('No user found with this referral code', 404));
   }

   const notification = {
      name: req.body.name,
      points: +req.body.pontok,
      created_at: new Date(Date.now()),
      type: 'Purchase',
   } as ISystemNotifications;

   user.systemNotifications.push(notification);
   user.availablePoints += +doc.pontok;
   user.accumulatedPoints += +doc.pontok;
   user.save();

   res.status(201).json({
      status: 'success',
      doc,
   });
});

export const adamPoints = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
   const adam = await User.findOne({ email: 'borsodi.dm@gmail.com' });

   if (!adam) {
      res.status(404).json({
         status: 'error',
         message: 'No Adam found',
      });

      return next(new AppError('No Adam found', 404));
   }

   if (adam.adamPoints < 100000) {
      adam.adamPoints += +req.body.value * 0.1;
      adam.save();
      console.log(adam.adamPoints);
   } else {
      adam.adamPoints += +req.body.value * 0.05;
      adam.save();
   }

   next();
});
