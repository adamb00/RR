import catchAsync from '../utils/catchAsync';
import { NextFunction, Request, Response } from 'express';
import User, { UserType } from '../models/UserModel';
import mongoose from 'mongoose';
import Email from '../utils/email';
import AppError from '../utils/appError';
import { correctPassword } from '../middlewares/correctPassword';
import { createAndSendToken } from '../middlewares/createAndSendToken';
import { MongoError } from 'mongodb';
import IUser from '../interfaces/IUser';
import { JwtPayload } from 'jsonwebtoken';
import env from '../utils/validateEnv';
import crypto from 'crypto';
import Link from '../models/LinkModel';
import { jwtVerifyPromisified } from '../middlewares/verifyJwt';

declare global {
   namespace Express {
      interface Request {
         user: UserType | IUser;
      }
   }
}

export default class AuthController {
   public activateUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
      const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
      const activeLinks = await Link.find({ active: true });

      const user = await User.findOne({
         activationToken: hashedToken,
         activationTokenExpires: { $gt: Date.now() },
      });

      if (!user) {
         return next(new AppError('Token is invalid or has expired', 400));
      }
      user.activationToken = undefined;
      user.activationTokenExpires = undefined;
      user.availableLinks = activeLinks || [];
      user.active = true;
      await user.save();

      createAndSendToken(user, 200, req, res);
   });

   public signup = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
      try {
         const highestReferralCode = await User.findOne({}, 'referralCode', { sort: { referralCode: -1 } }).lean();
         const parentUser = await User.findOne({ _id: req.body.parent });
         const grandparentUser = await User.findOne({ _id: parentUser?.parent });
         const granderparentUser = await User.findOne({ _id: grandparentUser?.parent });

         const newUser = await User.create({
            ...req.body,
            referralCode: highestReferralCode!.referralCode + 1,
            level: parentUser ? parentUser.level + 1 : 1,
            availableLinks: [],
         });

         if (parentUser) await User.updateOne({ _id: parentUser._id }, { $push: { children_level_1: newUser._id } });

         if (grandparentUser)
            await User.updateOne({ _id: grandparentUser._id }, { $push: { children_level_2: newUser._id } });

         if (granderparentUser)
            await User.updateOne({ _id: granderparentUser._id }, { $push: { children_level_3: newUser._id } });

         const resetToken = newUser.createActivationToken();
         const existingLinks = await Link.find({ active: true });

         newUser.availableLinks = existingLinks.map(link => link);

         await newUser.save({ validateBeforeSave: false });

         const url = `${env.BASE_URL}/activate-account/${resetToken}`;

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
            res.status(400).json({
               status: 'error',
               errors: errorMessages,
            });
            return next(new AppError('Something went wrong.', 404));
         } else if ((err as MongoError).code === 11000) {
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
      const { referralCode } = req.params;
      const user = await User.findOne({ referralCode });

      if (!user) {
         res.status(404).json({
            status: 'error',
            message: 'Could not find user with this referral code.',
            item: 'referralCode',
         });
         return next(new AppError('Could not find user with this referral code. Please provid a valid one.', 404));
      } else {
         res.status(201).json({
            status: 'success',
            user: user?.id,
         });
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
            item: 'email',
         });
         return next(new AppError('No user found with this email.', 404));
      }

      if (!user.active) {
         const resetToken = user.createPasswordResetToken();
         await user.save({ validateBeforeSave: false });

         const url = `${env.BASE_URL}/activate-account/${resetToken}}`;

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
   });

   public handleRefreshToken = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
      const refreshToken = req.cookies.jwt || req.headers.authorization?.split(' ')[1];

      if (!refreshToken) {
         res.status(401).json({ message: 'No token found', status: 'error' });
         return next(new AppError('No token found', 404));
      }

      res.clearCookie('jwt');

      const user = (await User.findOne({ refreshToken }).exec()) as IUser;

      if (!user) {
         const decoded: JwtPayload = (await jwtVerifyPromisified(refreshToken, env.JWT_SECRET, res)) as JwtPayload;
         const currentUser = await User.findById(decoded.id);

         if (currentUser) {
            currentUser.refreshToken = '';
            await currentUser.save();
         }

         res.sendStatus(403);
      }

      await createAndSendToken(user, 200, req, res);
      req.user = user;
   });

   public signout = (_req: Request, res: Response) => {
      res.cookie('jwt', 'loggedout', {
         expires: new Date(Date.now() + 10 * 1000),
      });
      res.status(200).json({ status: 'success' });
   };

   public forgotPassword = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
      const { email } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
         res.status(404).json({
            status: 'error',
            message: 'No user found with this email.',
            item: 'email',
         });
         return next(new AppError('No user found with this email.', 404));
      }

      const resetToken = user.createPasswordResetToken();
      await user.save({ validateBeforeSave: false });

      try {
         const url = `${env.BASE_URL}/reset-password/${resetToken}`;

         await new Email(user, url).sendPasswordReset();

         res.status(200).json({
            status: 'success',
            message: 'Token sent to email!',
         });
      } catch (err) {
         user.passwordResetToken = undefined;
         user.passwordResetExpires = undefined;
         await user.save({ validateBeforeSave: false });

         return next(new AppError('There was an error sending the email. Try again later!', 500));
      }
   });

   public resetPassword = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
      const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

      const user = await User.findOne({
         passwordResetToken: hashedToken,
         passwordResetExpires: { $gt: Date.now() },
      });

      if (!user) {
         return next(new AppError('Token is invalid or has expired', 400));
      }
      user.password = req.body.password;
      user.passwordConfirm = req.body.passwordConfirm;
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      await user.save();

      createAndSendToken(user, 200, req, res);
   });
}
