import { NextFunction, Request, Response, Router } from 'express';
import catchAsync from '../utils/catchAsync';
import User, { UserType } from '../models/UserModel';
import * as handler from './../utils/handleControllers';
import { upload as multerUpload } from '../middlewares/uploadImage';
import { upload as s3Upload, download as s3Download } from '../s3';
import AppError from '../utils/appError';
import fs from 'fs';
import util from 'util';

const unlinkFile = util.promisify(fs.unlink);

export default class UserController {
   public uploadImage = multerUpload.single('image');
   public getAllUsers = handler.getAll(User);
   public getOneUser = handler.getOne(User);
   public createUser = handler.createOne(User);
   public updateOneUser = handler.updateOne(User);
   public deleteOneUser = handler.deleteOne(User);
}

export const activateUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
   const { token } = req.params;

   if (!token) {
      return next(new AppError('Invalid token.', 401));
   }

   const user = await User.findOneAndUpdate({ _id: token }, { active: true });

   res.status(201).json({
      status: 'success',
      doc: user,
   });
});

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
   const notificationIdToUpdate = req.body.id;

   const updatedUser = await User.findOneAndUpdate(
      { _id: userId, 'notifications._id': notificationIdToUpdate },
      { $set: { 'notifications.$.read': true } },
      { new: true }
   );

   if (updatedUser) {
      res.status(200).json({
         status: 'success',
         notificationIdToUpdate,
      });
   }
});

const filterObj = (obj: Record<string, any>, ...allowedFields: string[]): Record<string, any> => {
   const newObj: Record<string, any> = {};
   Object.keys(obj).forEach(el => {
      if (allowedFields.includes(el)) newObj[el] = obj[el];
   });
   return newObj;
};

export const updateMe = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
   if (!req.file) {
      res.status(404).json({
         status: 'error',
         message: 'No file provided',
      });
      return next(new AppError('No file provided', 400));
   }
   if (req.body.password || req.body.passwordConfirm) {
      return next(new AppError('This route is not for password updates. Please use /updateMyPassword.', 400));
   }

   const uploadImage = await s3Upload(req.file as Express.Multer.File);

   const filteredBody = filterObj(req.body, 'name', 'email');
   if (req.file) {
      filteredBody.photo = uploadImage.Key;
      await unlinkFile(req.file.path);

      console.log(uploadImage.Key);
   }
   const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
      new: true,
      runValidators: true,
   });

   res.status(200).json({
      status: 'success',
      data: {
         user: updatedUser,
      },
   });
});

export const getUserImage = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
   const key = req.params.key;

   try {
      const readStream = s3Download(key);

      readStream.pipe(res);

      readStream.on('error', error => {
         console.error(error);
         res.status(404).send('Image not found');
      });
   } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
   }
});
