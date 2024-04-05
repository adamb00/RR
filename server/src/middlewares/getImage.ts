import { NextFunction, Request, Response } from 'express';
import { download as s3Download } from '../s3';

import catchAsync from '../utils/catchAsync';

export const getImage = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
   const key = req.params.key;

   if (!key) {
      res.status(404).send('Image key not provided');
      return;
   }

   const readStream = s3Download(key);

   readStream.on('error', err => {
      console.error('Error downloading image:', err);
      res.status(404).send('Image not found');
      return;
   });

   readStream.pipe(res);
});
