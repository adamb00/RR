import { NextFunction, Request, Response } from 'express';
import AppError from '../utils/appError';
import env from '../utils/validateEnv';
import ICustomError from '../interfaces/ICustomError';

const handleCastErrorDB = (err: ICustomError) => {
   const message = `Invalid ${err.path}: ${err.value}.`;
   return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err: ICustomError) => {
   const message = `Duplicate field value: ${err.keyValue.name}. Please use another value!`;
   return new AppError(message, 400);
};

const handleValidationErrorDB = (err: ICustomError) => {
   const errors = Object.values(err.message).map((el: any) => el.message);
   const message = `Invalid input data. ${errors.join('. ')}`;
   return new AppError(message, 400);
};

const handleJWTError = () => new AppError('Invalid token. Please log in again!', 401);

const handleJWTExpiredError = () => new AppError('Your token has expired! Please log in again.', 401);

const sendErrorDev = (err: AppError, req: Request, res: Response) => {
   console.log('err', err);
   if (req.originalUrl.startsWith('/api')) {
      res.status(err.statusCode).json({
         status: err.status,
         error: err,
         message: err.message,
         stack: err.stack,
      });
   } else {
      console.error('ERROR 💥', err);
      res.status(err.statusCode).render('error', {
         title: 'Something went wrong!',
         msg: err.message,
      });
   }
};

const sendErrorProd = (err: AppError, req: Request, res: Response) => {
   if (req.originalUrl.startsWith('/api')) {
      if (err.isOperational) {
         return res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
         });
      }

      return res.status(500).json({
         status: err.status,
         message: err.message,
      });
   }

   if (err.isOperational) {
      return res.status(err.statusCode).render('error', {
         title: 'Something went very wrong!',
         msg: err.message,
      });
   }

   return res.status(err.statusCode).render('error', {
      title: 'Something went very wrong!',
      msg: 'Please try again later.',
   });
};

export const globalErrorHandler = (err: AppError, req: Request, res: Response, _next: NextFunction) => {
   err.statusCode = err.statusCode || 500;
   err.status = err.status || 'error';

   if (env.NODE_ENV === ' development') {
      sendErrorDev(err, req, res);
   } else if (env.NODE_ENV === 'production') {
      let error = { ...err };
      error.message = err.message;

      if (error.name === 'CastError') error = handleCastErrorDB(error);
      if (error.code === 11000) error = handleDuplicateFieldsDB(error);
      if (error.name === 'ValidationError') error = handleValidationErrorDB(error);
      if (error.name === 'JsonWebTokenError') error = handleJWTError();
      if (error.name === 'TokenExpiredError') error = handleJWTExpiredError();

      sendErrorProd(error, req, res);
   }
};
