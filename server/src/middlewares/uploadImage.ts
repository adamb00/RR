import { NextFunction, Request, Response } from 'express';
import multer, { FileFilterCallback } from 'multer';
import catchAsync from '../utils/catchAsync';
import path from 'path';
import sharp from 'sharp';
import fs from 'fs';

const multerStore = multer.memoryStorage();

const filter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
   req.file = file;

   if (file.mimetype.startsWith('image') || file.mimetype.startsWith('video')) {
      cb(null, true);
   } else {
      cb(null, false);
   }
};

export const uploadVideo = () =>
   catchAsync(async (req: Request, res: Response, next: NextFunction) => {
      if (!req.file || !req.file.mimetype.startsWith('video')) return next();

      const filename = `video_${Date.now()}.mp4`;

      const outputPath = path.join(__dirname, '../uploads', filename);

      fs.writeFileSync(outputPath, req.file.buffer);

      req.file.path = outputPath;
      req.file.filename = filename;
      req.body.video = req.file.filename;

      next();
   });

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
