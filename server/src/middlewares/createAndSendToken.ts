import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import env from '../utils/validateEnv';
import User from '../models/UserModel';
import IUser from '../interfaces/IUser';

export const signToken = (id: string): string => {
   return jwt.sign({ id }, env.JWT_SECRET, { expiresIn: '30m' });
};

export const createAndSendToken = async (user: IUser, statusCode: number, req: Request, res: Response) => {
   const token = signToken(user._id);

   if (!req.user) req.user = user;

   res.clearCookie('jwt');

   res.cookie('jwt', token, {
      httpOnly: false,
      secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
   });

   user.password = '';

   const updatedUser = await User.findByIdAndUpdate(user.id, { refreshToken: token });

   res.status(statusCode).json({
      status: 'success',
      token,
      data: updatedUser,
   });
};
