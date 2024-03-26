import { NextFunction, Request, Response } from 'express';
import multer, { FileFilterCallback } from 'multer';
import catchAsync from '../utils/catchAsync';
import path from 'path';
import env from '../utils/validateEnv';
import sharp from 'sharp';
import fs from 'fs';

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

      let outputPath;

      if (env.NODE_ENV === 'prod') {
         outputPath = path.join(__dirname, '../dist', req.file.filename);
      } else {
         outputPath = path.join(__dirname, '../uploads', req.file.filename);
      }

      console.log(outputPath);
      console.log(env.NODE_ENV);

      await fs.promises.mkdir(path.dirname(outputPath), { recursive: true });

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
