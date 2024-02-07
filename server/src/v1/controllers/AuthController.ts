import catchAsync from '../utils/catchAsync';
import { NextFunction, Request, Response } from 'express';
import User, { UserType } from '../models/UserModel';
import mongoose from 'mongoose';
import Email from '../utils/email';
import AppError from '../utils/appError';
import { correctPassword } from '../middlewares/correctPassword';
import { createAndSendToken, signToken } from '../middlewares/createAndSendToken';
import { MongoError } from 'mongodb';

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
         const granderparentUser = await User.findOne({ _id: grandparentUser?.parent });

         const newUser: UserType = await User.create({
            ...req.body,
            referralCode: highestReferralCode!.referralCode + 1,
            level: parentUser ? parentUser.level + 1 : 1,
         });

         if (parentUser) await User.updateOne({ _id: parentUser._id }, { $push: { children_level_1: newUser._id } });

         if (grandparentUser)
            await User.updateOne({ _id: grandparentUser._id }, { $push: { children_level_2: newUser._id } });

         if (granderparentUser)
            await User.updateOne({ _id: granderparentUser._id }, { $push: { children_level_3: newUser._id } });

         // const url = `${req.protocol}://${req.get('host')}/signup?referralCode=${parentUser?.referralCode}`;
         const url = `http://192.168.0.33:5173/activate-account/${newUser._id}`;

         await new Email(newUser, url).sendWelcome();

         res.status(201).json({
            status: 'success',
         });
      } catch (err) {
         if (err instanceof mongoose.Error.ValidationError) {
            const errorMessages: string[] = [];
            for (const field in err.errors) {
               if (err.errors[field].kind === 'required') {
                  errorMessages.push(`${field}: ${err.errors[field].message}`);
               }
            }
            console.log('error');
            res.status(400).json({
               status: 'error',
               errors: errorMessages,
            });
            return next(new AppError('Something went wrong.', 404));
         } else if ((err as MongoError).code === 11000) {
            console.log('error');
            res.status(400).json({
               status: 'error',
               message: 'Email address is already in use.',
               item: 'email',
            });
            return next(new AppError('Email address is already in use.', 400));
         } else {
            res.status(500).json({
               status: 'error',
               message: 'An error occurred',
            });
            return next(new AppError('Something went wrong.', 500));
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
               item: 'referralCode',
            });
            return next(new AppError('Could not find user with this referral code.', 404));
         } else {
            res.status(201).json({
               status: 'success',
               user: user?.id,
            });
         }
      } catch (err) {
         console.error(err);
      }
   });

   public signin = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
      try {
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
               item: 'email',
            });
            return next(new AppError('No user found with this email.', 404));
         }

         if (!user.active) {
            const url = `http://192.168.0.33:5173/activate-account/${user._id}`;
            await new Email(user, url).sendWelcome();
            res.status(401).json({
               status: 'error',
               message: 'Please activate your account first. We just sent an activation email.',
            });
            return next(new AppError('Please activate your account first. We just sent an activation email.', 401));
         }

         if (!(await correctPassword(password, user.password))) {
            res.status(401).json({
               status: 'error',
               message: 'Incorrect password',
               item: 'password',
            });
            return next(new AppError('Incorrect password.', 401));
         }

         await createAndSendToken(user, 200, req, res);
         req.user = user;
      } catch (err) {
         console.log(err);
      }
   });

   public signout = (_req: Request, res: Response) => {
      try {
         res.cookie('jwt', 'loggedout', {
            expires: new Date(Date.now() + 10 * 1000),
         });
         res.status(200).json({ status: 'success' });
      } catch (err) {
         console.log(err);
      }
   };
}
