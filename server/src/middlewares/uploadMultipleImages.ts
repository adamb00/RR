import { NextFunction, Request, Response } from 'express';
import multer, { FileFilterCallback } from 'multer';
import catchAsync from '../utils/catchAsync';
import sharp from 'sharp';
import path from 'path';
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

export const resizeMultipleImage = (resize: number) =>
   catchAsync(async (req: Request, res: Response, next: NextFunction) => {
      if (!req.files || !Array.isArray(req.files)) return next();

      const uploadDir = path.join(__dirname, '../uploads');
      if (!fs.existsSync(uploadDir)) {
         fs.mkdirSync(uploadDir);
      }

      const resizedFiles = await Promise.all(
         req.files.map(async file => {
            try {
               const filename = `image_${Date.now()}.png`;
               const outputPath = path.join(uploadDir, filename);

               await sharp(file.buffer)
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

               return {
                  ...file,
                  filename,
                  path: outputPath,
               };
            } catch (error) {
               console.error('Error processing file:', file.originalname, error);
               throw error;
            }
         })
      );

      req.files = resizedFiles;
      next();
   });

export const upload = multer({
   fileFilter: filter,
   storage: multerStore,
});
