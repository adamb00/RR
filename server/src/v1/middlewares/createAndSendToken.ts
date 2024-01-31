import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import env from '../utils/validateEnv';
import { UserType } from '../models/UserModel';

export const signToken = (id: string): string => {
   return jwt.sign({ id }, env.JWT_SECRET, { expiresIn: 7 * 60 * 60 * 1000 });
};

export const createAndSendToken = async (user: UserType, statusCode: number, req: Request, res: Response) => {
   const token = signToken(user._id);
   const expires = new Date(Date.now() + 7 * 60 * 60 * 1000);

   if (!req.user) req.user = user;

   res.clearCookie('jwt');

   res.cookie('jwt', token, {
      expires,
      httpOnly: false,
      secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
   });

   user.password = undefined;

   res.status(statusCode).json({
      status: 'success',
      token,
      data: user,
      expires,
   });
};
