import { Request, Response, NextFunction } from 'express';

export default (fn: (req: Request, res: Response, next: NextFunction) => Promise<void>) => {
   return async (req: Request, res: Response, next: NextFunction) => {
      fn(req, res, next).catch(err => {
         next(err);
      });
   };
};
