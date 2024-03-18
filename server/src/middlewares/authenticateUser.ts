import { Request, Response, NextFunction } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import env from '../utils/validateEnv';
import AppError from '../utils/appError';
import User from '../models/UserModel';
import { jwtVerifyPromisified } from './verifyJwt';

export default async (req: Request, res: Response, next: NextFunction) => {
   try {
      const token = req.headers.cookie?.split('=')[1] || req.headers.authorization?.split(' ')[1] || req.cookies.jwt;

      if (!token) {
         return next(new AppError('You are not logged in! Please log in to get access.', 401));
      }

      const decoded = (await jwtVerifyPromisified(token, env.JWT_SECRET, res)) as JwtPayload;

      if (!decoded.id || !decoded) return next(new AppError('Something went wrong', 404));

      const currentUser = await User.findById(decoded.id);

      if (!currentUser) {
         return next(new AppError('The user belonging to this token does no longer exist.', 401));
      }

      req.user = currentUser;

      next();
   } catch (error: any) {
      if (error.name === 'TokenExpiredError') {
         return next(new AppError('Your token has expired! Please log in again.', 401));
      }

      return next(new AppError('Invalid token. Please log in again!', 401));
   }
};
