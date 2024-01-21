import { NextFunction, Request, Response } from 'express';
import AppError from '../utils/appError';
import IUser from '../interfaces/IUser';

export default (...roles: string[]) => {
   return async (req: Request, res: Response, next: NextFunction) => {
      const { role } = req.user as IUser;

      if (!roles.includes(role)) {
         res.status(403).json({
            status: 'error',
            message: 'You do not have permission to perform this action',
         });

         return next(new AppError('You do not have permission to perform this action', 403));
      }

      next();
   };
};
