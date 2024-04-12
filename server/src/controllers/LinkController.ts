import { NextFunction, Request, Response } from 'express';
import Link from '../models/LinkModel';
import catchAsync from '../utils/catchAsync';
import * as handler from './../utils/handleControllers';
import AppError from '../utils/appError';
import User from '../models/UserModel';
import { upload as multerUpload } from '../middlewares/uploadImage';
import fs from 'fs';
import util from 'util';
import { upload as s3Upload, download as s3Download, remove as s3Delete } from '../s3';

const unlinkFile = util.promisify(fs.unlink);

export default class LinkController {
   public uploadImage = multerUpload.single('image');
   public getAllLinks = handler.getAll(Link);
   public getOneLink = handler.getOne(Link);
   public createLink = handler.createOne(Link);

   // public createLink = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
   //    try {
   //       const doc = await Link.create(req.body);

   //       res.status(201).json({
   //          status: 'success',
   //          doc,
   //       });
   //    } catch (err) {
   //       console.log(err);
   //    }
   // });

   public deleteOneLink = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
      const linkToDelete = await Link.findById(req.params.id);

      if (!linkToDelete) {
         return next(new AppError('No document found with that ID', 404));
      }

      const orderToDelete = linkToDelete.order;

      await Link.findByIdAndDelete(req.params.id);

      try {
         await User.updateMany({ $pull: { availableLinks: { _id: linkToDelete._id } } });
      } catch (error) {
         console.error('Error removing link from users:', error);
         return next(new AppError('Failed to remove link from users', 500));
      }

      await Link.updateMany({ order: { $gt: orderToDelete } }, { $inc: { order: -1 } });

      res.status(204).json({
         status: 'success',
         message: 'Link deleted successfully',
      });
   });

   public updateOneLink = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
      const doc = await Link.findByIdAndUpdate(req.params.id, req.body, {
         new: true,
         runValidators: true,
      });
      console.log(req.body);

      if (!doc) {
         return next(new AppError('No document found with that ID', 404));
      }

      const updatedLink = await Link.findById(req.params.id);

      if (!updatedLink) {
         return next(new AppError('No document found with that ID', 404));
      }
      await User.updateMany({ 'availableLinks._id': doc._id }, { $set: { 'availableLinks.$': updatedLink } });

      res.status(200).json({
         status: 'success',
         doc,
      });
   });

   public activateLink = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
      const isActive = req.body.active;
      const link = req.params.id;

      const doc = await Link.findByIdAndUpdate(link, req.body, {
         new: true,
         runValidators: true,
      });

      if (!doc) {
         return next(new AppError('No document found with that ID', 404));
      }
      const users = await User.find();

      if (isActive) {
         for (const user of users) {
            for (const availableLink of user.availableLinks) {
               if (availableLink.order > 0) availableLink.order += 1;
            }
            await user.save();
         }

         await User.updateMany({}, { $push: { availableLinks: { $each: [doc.toObject()], $position: 0 } } });
      } else {
         await User.updateMany({ $pull: { availableLinks: { _id: link } } });
      }

      res.status(200).json({ status: 'success', doc });
   });
}

export const updateLink = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
   if (!req.file) {
      res.status(404).json({
         status: 'error',
         message: 'No file provided',
      });
      return next(new AppError('No file provided', 400));
   }

   const link = await Link.findById(req.params.id);

   if (!link) {
      res.status(404).json({
         status: 'error',
         message: 'No link found with this id.',
      });
   }

   if (link && link.image && typeof link.image === 'string') {
      await s3Delete(link.image);
   }

   const uploadImage = await s3Upload(req.file as Express.Multer.File);

   if (req.file) {
      await unlinkFile(req.file.path);
   }

   const updatedLink = await Link.findByIdAndUpdate(
      req.params.id,
      { image: uploadImage.Key },
      { new: true, runValidators: false }
   );

   await User.updateMany(
      { 'availableLinks._id': updatedLink!._id },
      { $set: { 'availableLinks.$.image': uploadImage.Key } }
   );

   res.status(200).json({
      status: 'success',
      data: updatedLink,
   });
});
