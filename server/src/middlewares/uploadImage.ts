import { NextFunction, Request, Response } from 'express';
import multer, { FileFilterCallback } from 'multer';
import catchAsync from '../utils/catchAsync';
import path from 'path';
import sharp from 'sharp';
import AppError from '../utils/appError';
import { Model } from 'mongoose';

const multerStore = multer.memoryStorage();

const filter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
   req.file = file;

   if (file.mimetype.startsWith('image')) {
      cb(null, true);
   } else {
      cb(null, false);
   }
};

export const resizeImage = (resize: number) =>
   catchAsync(async (req: Request, res: Response, next: NextFunction) => {
      if (!req.file) return next();

      req.file.filename = `image_${Date.now()}.png`;

      const outputPath = path.join(__dirname, '../uploads', req.file.filename);

      req.file.path = outputPath;

      await sharp(req.file.buffer)
         .rotate()
         .resize({
            width: resize,
            height: resize,
            fit: 'inside',
         })
         .withMetadata()
         .toFormat('png')
         .jpeg({ quality: 90 })
         .toFile(outputPath);

      req.body.image = req.file.filename;

      next();
   });

export const upload = multer({
   fileFilter: filter,
   storage: multerStore,
});

// export const uploadImage = async <T extends Document>(
//    Model: Model<T>,
//    req: Request,
//    res: Response,
//    next: NextFunction
// ) => {
//    console.log(Model);
//    const doc = await Model?.findById(req.params.id);

//    if (!req.file) {
//       res.status(404).json({
//          status: 'error',
//          message: 'No file provided',
//       });
//       return next(new AppError('No file provided', 400));
//    }

//    console.log(doc);

//    if (!doc) {
//       res.status(404).json({
//          status: 'error',
//          message: 'No document found with that ID',
//       });
//    }

//    res.status(200).json({
//       status: 'error',
//       message: 'Connection success',
//       doc,
//    });
// };
