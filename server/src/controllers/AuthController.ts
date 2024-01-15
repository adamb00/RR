import catchAsync from '../utils/catchAsync';
import { NextFunction, Request, Response } from 'express';
import User, { UserType } from '../models/UserModel';
import mongoose, { MongooseError, mongo } from 'mongoose';
import Email from '../utils/email';
import AppError from '../utils/appError';
import { correctPassword } from '../middlewares/correctPassword';
import { createAndSendToken } from '../middlewares/createAndSendToken';
import ICustomError from '../interfaces/ICustomError';

declare global {
   namespace Express {
      interface Request {
         user: UserType;
      }
   }
}

export default class AuthController {
   public signup = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
      try {
         const highestReferralCode = await User.findOne({}, 'referralCode', { sort: { referralCode: -1 } }).lean();
         const parentUser = await User.findOne({ _id: req.body.parent });
         const grandparentUser = await User.findOne({ _id: parentUser?.parent });

         const newUser: UserType = await User.create({
            ...req.body,
            referralCode: highestReferralCode!.referralCode + 1,
            level: parentUser!.level + 1,
         });

         if (parentUser) await User.updateOne({ _id: parentUser._id }, { $push: { children: newUser._id } });

         if (grandparentUser)
            await User.updateOne({ _id: grandparentUser._id }, { $push: { grandChildren: newUser._id } });

         // const url = `${req.protocol}://${req.get('host')}/signup?referralCode=${parentUser?.referralCode}`;
         const url = `http://localhost:5173/signin`;

         await new Email(newUser, url).sendWelcome();

         res.status(201).json({
            status: 'success',
            data: newUser,
         });
      } catch (err) {
         if (err instanceof mongoose.Error.ValidationError) {
            const errorMessages: string[] = [];
            for (const field in err.errors) {
               if (err.errors[field].kind === 'required') {
                  errorMessages.push(`${field}: ${err.errors[field].message}`);
               }
            }
            res.status(400).json({
               status: 'error',
               errors: errorMessages,
            });
         } else {
            //TODO HANDLE DUPLICATE ERROR
            res.status(500).json({
               status: 'error',
               message: 'An error occurred',
            });
         }
      }
   });

   public getReferralCode = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
      try {
         const { referralCode } = req.params;
         const user = await User.findOne({ referralCode });

         if (!user) {
            res.status(404).json({
               status: 'error',
               message: 'Could not find user with this referral code.',
            });
         }

         res.status(201).json({
            status: 'success',
            user: user?.id,
         });
      } catch (err) {
         console.error(err);
      }
   });

   public signin = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
      const { email, password } = req.body;

      if (!email || !password) {
         res.status(400).json({
            status: 'error',
            message: 'Please provide us your email and password.',
         });
         return next(new AppError('Please provide us your email and password.', 400));
      }

      const user = await User.findOne({ email }).select('+password');
      if (!user) {
         res.status(404).json({
            status: 'error',
            message: 'No user found with this email.',
         });
         return next(new AppError('No user found with this email.', 404));
      }

      if (!(await correctPassword(password, user.password))) {
         res.status(401).json({
            status: 'error',
            message: 'Incorrect password',
         });
         return next(new AppError('Incorrect password.', 401));
      }

      await createAndSendToken(user, 200, req, res);
      req.user = user;
   });
}
