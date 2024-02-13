import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import env from '../utils/validateEnv';
import AppError from '../utils/appError';
import User from '../models/UserModel';

export default async (req: Request, res: Response, next: NextFunction) => {
   const token = req.headers.cookie?.split('=')[1] || req.headers.authorization?.split(' ')[1] || req.cookies.jwt;

   if (!token) {
      return next(new AppError('You are not logged in! Please log in to get access.', 401));
   }

   const decoded: JwtPayload = jwt.verify(token, env.JWT_SECRET) as JwtPayload;

   const currentUser = await User.findById(decoded.id);

   if (!currentUser) {
      return next(new AppError('The user belonging to this token does no longer exist.', 401));
   }

   req.user = currentUser;

   next();
};
