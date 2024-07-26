import { NextFunction, Request, Response } from 'express';
import Link from '../models/LinkModel';
import catchAsync from '../utils/catchAsync';
import * as handler from './../utils/handleControllers';
import AppError from '../utils/appError';
import User from '../models/UserModel';
import { upload as multerUpload } from '../middlewares/uploadImage';
import { upload as multerUploadMultiple } from '../middlewares/uploadMultipleImages';
import fs from 'fs';
import util from 'util';
import env from '../utils/validateEnv';
import { upload as s3Upload, remove as s3Delete, uploadMultiple as s3UploadMultiple } from '../s3';

const unlinkFile = util.promisify(fs.unlink);

export default class LinkController {
   public uploadVideo = multerUpload.single('video');
   public uploadImages = multerUploadMultiple.array('image', 2);
   public uploadImage = multerUpload.single('image');
   public getAllLinks = handler.getAll(Link);
   public getOneLink = handler.getOne(Link);
   public createLink = handler.createOne(Link);

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

export const updateLinkVideo = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
   const link = await Link.findById(req.params.id);

   if (!link) {
      res.status(404).json({
         status: 'error',
         message: 'No link found with this id.',
      });
      return next(new AppError('No link found with this id.', 404));
   }

   if (link.video) {
      await s3Delete(link.video);
   }

   try {
      const uploadVideo = await s3Upload(req.file as Express.Multer.File);

      if (uploadVideo && req.file) fs.unlinkSync(req.file?.path);

      const updatedLink = await Link.findByIdAndUpdate(
         req.params.id,
         { video: uploadVideo.Location },
         { new: true, runValidators: false }
      );

      await User.updateMany(
         { 'availableLinks._id': updatedLink!._id },
         { $set: { 'availableLinks.$.video': uploadVideo.Location } }
      );
      res.status(200).json({
         status: 'success',
      });
   } catch (err) {
      res.status(400).json({
         status: 'error',
      });
   }
});

export const updateLink = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
   if (!req.files || !Array.isArray(req.files)) {
      res.status(404).json({
         status: 'error',
         message: 'No file provided',
      });
      return next(new AppError('No file provided', 400));
   }

   const files = req.files;

   const link = await Link.findById(req.params.id);

   const logoLink = `https://${env.AWS_BUCKET_NAME}.s3.amazonaws.com/r2fittshop-logo.png`;

   if (!link) {
      res.status(404).json({
         status: 'error',
         message: 'No link found with this id.',
      });
      return next(new AppError('No link found with this id.', 404));
   }

   if (link.images.length === 1 && files.length === 1) {
      for (const image of link.images) {
         if (image !== logoLink) await s3Delete(image);
      }
   }

   if (link.images.length === 2 && files.length === 2) {
      for (const image of link.images) {
         try {
            if (image !== logoLink) await s3Delete(image);
         } catch (err) {
            console.error('Error removing image:', err);
            return next(new AppError('Error removing existing images', 500));
         }
      }
   }

   try {
      const uploadImage = await s3UploadMultiple(files);

      req.files.forEach(async file => {
         await unlinkFile(file.path);
      });

      const updatedLink = await Link.findByIdAndUpdate(
         req.params.id,
         { images: [...uploadImage, logoLink] },
         { new: true, runValidators: false }
      );

      if (!updatedLink) {
         res.status(404).json({
            status: 'error',
            message: 'Failed to update the link with new images',
         });
         return next(new AppError('Failed to update the link with new images', 404));
      }

      await User.updateMany(
         { 'availableLinks._id': updatedLink._id },
         { $set: { 'availableLinks.$.images': updatedLink.images } }
      );
   } catch (err) {
      console.error(err);
   }

   res.status(200).json({
      status: 'success',
   });
});

// export const updateLink = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
//    if (!req.file) {
//       res.status(404).json({
//          status: 'error',
//          message: 'No file provided',
//       });
//       return next(new AppError('No file provided', 400));
//    }

//    const link = await Link.findById(req.params.id);

//    if (!link) {
//       res.status(404).json({
//          status: 'error',
//          message: 'No link found with this id.',
//       });
//    }

//    if (link && link.image && typeof link.image === 'string') {
//       await s3Delete(link.image);
//    }

//    const uploadImage = await s3Upload(req.file as Express.Multer.File);

//    if (req.file) {
//       await unlinkFile(req.file.path);
//    }

//    const updatedLink = await Link.findByIdAndUpdate(
//       req.params.id,
//       { image: uploadImage.Key },
//       { new: true, runValidators: false }
//    );

//    await User.updateMany(
//       { 'availableLinks._id': updatedLink!._id },
//       { $set: { 'availableLinks.$.image': uploadImage.Key } }
//    );

//    res.status(200).json({
//       status: 'success',
//       data: updatedLink,
//    });
// });
