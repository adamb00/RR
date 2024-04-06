import catchAsync from './catchAsync';
import { NextFunction, Request, Response } from 'express';

import APIFeatures from './apiFeatures';
import AppError from './appError';
import { Model, Document } from 'mongoose';

export const getAll = <T extends Document>(Model: Model<T>, filterFn?: (req: Request) => object) => {
   return catchAsync(async (req: Request, res: Response, _next: NextFunction): Promise<void> => {
      let filter: object = {};

      if (filterFn) {
         filter = filterFn(req);
      }

      const totalItems = await Model.countDocuments();
      let query = Model.find(filter);

      if (Model.schema.obj.hasOwnProperty('order')) {
         query = query.sort('order');
      }

      const features = new APIFeatures(query, req.query).filter().sort().limitFields().paginate();

      const doc = await features.query;

      res.status(200).json({
         status: 'success',
         totalItems,
         doc,
      });
   });
};

export const createOne = <T extends Document>(Model: Model<T>, customizeRequestBody?: (req: Request) => void) => {
   return catchAsync(async (req: Request, res: Response, _next: NextFunction): Promise<void> => {
      try {
         // if (customizeRequestBody) {
         //    customizeRequestBody(req);
         // }

         console.log(req.body);

         const doc = await Model.create(req.body);

         console.log(doc);

         res.status(201).json({
            status: 'success',
            doc,
         });
      } catch (error) {
         console.log(error);
         res.send(500).json({ status: 'error', message: error });
      }
   });
};

export const updateOne = <T extends Document>(Model: Model<T>) => {
   return catchAsync(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
         console.log(req.body);
         const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
         });

         console.log(doc);

         if (!doc) {
            return next(new AppError('No document found with that ID', 404));
         }

         res.status(200).json({
            status: 'success',
            data: {
               data: doc,
            },
         });
      } catch (err) {
         console.log(err);
      }
   });
};

export const getOne = <T extends Document>(Model: Model<T>) => {
   return catchAsync(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
         let query = Model.findById(req.params.id);

         const doc = (await query.exec()) as T | null;

         if (!doc) {
            return next(new AppError('No document found with that ID', 404));
         }

         res.status(200).json({
            status: 'success',
            doc,
         });
      } catch (err) {
         res.sendStatus(404);
      }
   });
};

export const deleteOne = <T extends Document>(Model: Model<T>) => {
   return catchAsync(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
         const doc = await Model.findByIdAndDelete(req.params.id);
         if (!doc) {
            return next(new AppError('No document found with that ID', 404));
         }

         res.status(204).json({
            status: 'success',
            data: null,
         });
      } catch (err) {
         console.log(err);
      }
   });
};
