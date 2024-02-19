import { Response } from 'express';
import jwt from 'jsonwebtoken';

export const jwtVerifyPromisified = (token: string, secret: string, res: Response) => {
   return new Promise((resolve, reject) => {
      jwt.verify(token, secret, {}, (err, payload) => {
         if (err) {
            if (err.name === 'TokenExpiredError') {
               res.send(401).json({
                  status: 'error',
                  message: 'Your token has expired! Please log in again.',
               });
            }
            reject(err);
         } else {
            resolve(payload);
         }
      });
   });
};
