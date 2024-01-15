import express, { Application, NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import env from './utils/validateEnv';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import cookieParser from 'cookie-parser';
import path from 'path';

import UserRouter from './routes/UserRoute';
import AppError from './utils/appError';
import { globalErrorHandler } from './controllers/ErrorController';

export default class App {
   public app: Application;

   constructor() {
      this.app = express();
      this.security();
      this.config();
      this.routes();
      this.errors();
   }

   private security(): void {
      this.app.enable('trust proxy');
      this.app.use(cors({ origin: '*', credentials: true }));
      this.app.options('*', cors());
      this.app.use((_req: Request, res: Response, next: NextFunction) => {
         res.setHeader('Access-Control-Allow-Origin', '*');
         res.setHeader('Access-Control-Allow-Credentials', 'true');
         res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
         next();
      });
      this.app.use(express.json({ limit: '10kb' }));
      this.app.use(express.urlencoded({ extended: true, limit: '10kb' }));
      this.app.use(helmet());
      this.app.use(cookieParser());

      this.app.use(
         rateLimit({
            max: 100,
            windowMs: 60 * 60 * 1000,
            message: 'Too many requests from this IP, please try again in an hour!',
         })
      );
   }

   private config(): void {
      this.app.set('view engine', 'pug');
      this.app.set('views', path.join(__dirname, 'views'));
      this.app.use(express.static(path.join(__dirname, 'public')));

      if (env.NODE_ENV === 'development') this.app.use(morgan('dev'));
   }

   private routes(): void {
      this.app.use(`/api/${env.VERSION}/user`, UserRouter);
   }

   private errors(): void {
      this.app.all('*', (req: Request, _res: Response, next: NextFunction) => {
         next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
      });

      this.app.use(globalErrorHandler);
   }
}
