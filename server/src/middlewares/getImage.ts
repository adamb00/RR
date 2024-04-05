// import { NextFunction, Request, Response } from 'express';
// import { download as s3Download } from '../s3';

// import catchAsync from '../utils/catchAsync';

// export const getImage = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
//    try {
//       const key = req.params.key;

//       if (!key) res.status(404).send('Image not found');

//       const readStream = s3Download(key);

//       readStream.pipe(res);

//       readStream.on('error', () => {
//          res.status(404).send('Image not found');
//       });
//    } catch (error) {
//       res.status(500).send('Internal Server Error');
//    }
// });

import { NextFunction, Request, Response } from 'express';
import { download as s3Download } from '../s3';

import catchAsync from '../utils/catchAsync';

export const getImage = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
   const key = req.params.key;

   if (!key) {
      res.status(404).send('Image key not provided');
      return; // Return early to avoid executing further code
   }

   const readStream = s3Download(key);

   readStream.on('error', err => {
      console.error('Error downloading image:', err);
      res.status(404).send('Image not found');
      return;
   });

   readStream.pipe(res);
});
