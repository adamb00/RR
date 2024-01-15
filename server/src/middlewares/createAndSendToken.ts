import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import env from '../utils/validateEnv';
import { UserType } from '../models/UserModel';

const signToken = (id: string): string => {
   return jwt.sign({ id }, env.JWT_SECRET, { expiresIn: env.JWT_COOKIE_EXPIRES_IN * 5 * 60 * 1000 });
};

export const createAndSendToken = async (user: UserType, statusCode: number, req: Request, res: Response) => {
   const token = signToken(user._id);
   const expires = new Date(Date.now() + env.JWT_COOKIE_EXPIRES_IN * 5 * 60 * 1000);

   if (!req.user) req.user = user;

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
