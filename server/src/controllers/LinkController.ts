import { NextFunction, Request, Response } from 'express';
import Link from '../models/LinkModel';
import catchAsync from '../utils/catchAsync';
import * as handler from './../utils/handleControllers';
import AppError from '../utils/appError';
import User from '../models/UserModel';

export default class UserController {
   public getAllLinks = handler.getAll(Link);
   public getOneLink = handler.getOne(Link);

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

   public createLink = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
      // let highestOrder = await Link.findOne({}, 'order', { sort: { order: -1 } }).lean();

      // const link = await Link.create({ ...req.body, order: highestOrder ? highestOrder.order + 1 : 0 });

      await Link.updateMany({}, { $inc: { order: 1 } });
      // Create the new link with order 0
      const link = await Link.create({ ...req.body, order: 0 });

      console.log(link);

      res.status(201).json({
         status: 'success',
         link,
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

      if ('active' in req.body) {
         if (req.body.active) {
            // await User.updateMany({ $addToSet: { availableLinks: doc } });
            await User.updateMany({ $addToSet: { availableLinks: { ...doc, order: 0 } } });
            // Increment the order of other active links
            await User.updateMany(
               { 'availableLinks.active': true, 'availableLinks._id': { $ne: doc._id } },
               { $inc: { 'availableLinks.$.order': 1 } }
            );
         } else {
            await User.updateMany({ $pull: { availableLinks: { _id: doc._id } } });
         }
      } else {
         const updatedLink = await Link.findById(req.params.id);

         if (!updatedLink) {
            return next(new AppError('No document found with that ID', 404));
         }
         await User.updateMany({ 'availableLinks._id': doc._id }, { $set: { 'availableLinks.$': updatedLink } });
      }

      res.status(200).json({
         status: 'success',
         doc,
      });
   });
}
