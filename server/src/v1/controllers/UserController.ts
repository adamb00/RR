import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import User, { UserType } from '../models/UserModel';
import * as handler from './../utils/handleControllers';

export default class UserController {
   public getAllUsers = handler.getAll(User);
   public getOneUser = handler.getOne(User);
   public createUser = handler.createOne(User);
   public updateOneUser = handler.updateOne(User);
   public deleteOneUser = handler.deleteOne(User);
}

export const getCurrentUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
   const currentUser = req.user;
   res.status(200).json({
      status: 'success',
      currentUser,
   });
});

export const deleteUsersLink = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
   const usersToUpdate = await User.find({ 'availableLinks.link': req.params.id });

   const updatePromises = usersToUpdate.map(async (user: UserType) => {
      await User.findOneAndUpdate(
         { _id: user._id },
         { $pull: { availableLinks: { link: req.params.id } } },
         { runValidators: false }
      );
   });

   await Promise.all(updatePromises);

   next();
});

export const markNotifications = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
   const userId = req.user._id;

   const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: { 'notifications.$[].read': true } },
      { new: true }
   );

   if (!updatedUser) {
      res.status(404).json({
         status: 'fail',
         message: 'User not found',
      });
   }

   res.status(200).json({
      status: 'success',
   });
});

export const markNotification = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
   const userId = req.user._id;
   const notificationIdToUpdate = req.body.data;

   console.log(notificationIdToUpdate);

   const updatedUser = await User.findOneAndUpdate(
      { _id: userId, 'notifications._id': notificationIdToUpdate },
      { $set: { 'notifications.$.read': true } },
      { new: true }
   );

   if (updatedUser) {
      res.status(200).json({
         status: 'success',
      });
   }
});
