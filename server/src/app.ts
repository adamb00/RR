import express, { Application, NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import env from './utils/validateEnv';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import path from 'path';
import compression from 'compression';

import UserRouter from './routes/UserRoute';
import LinkRouter from './routes/LinkRoute';
import NotificationRouter from './routes/NotificationRoute';
import AuthRouter from './routes/AuthRoute';
import PurchaseRouter from './routes/PurchaseRoute';
import SubscriptionRouter from './routes/SubscribeRoute';
import EmailRouter from './routes/EmailRoute';

import AppError from './utils/appError';
import { globalErrorHandler } from './controllers/ErrorController';

import { createServer } from 'http';
import { Server } from 'socket.io';
import { getImage } from './middlewares/getImage';

const app: Application = express();

app.enable('trust proxy');

app.use(cookieParser());
app.use(compression());

app.use(helmet());

app.use(cors({ origin: '*', credentials: true, methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'] }));

app.options('*', cors());

app.use(express.json({ limit: '100kb' }));
app.use(express.urlencoded({ extended: true, limit: '100kb' }));

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

if (env.NODE_ENV === 'dev') app.use(morgan('dev'));

app.use(`/api/${env.VERSION}/auth`, AuthRouter);
app.use(`/api/${env.VERSION}/user`, UserRouter);
app.use(`/api/${env.VERSION}/link`, LinkRouter);
app.use(`/api/${env.VERSION}/notification`, NotificationRouter);
app.use(`/api/${env.VERSION}/purchase`, PurchaseRouter);
app.use(`/api/${env.VERSION}/subscribe`, SubscriptionRouter);
app.use(`/api/${env.VERSION}/get-image/:key`, getImage);
app.use(`/api/${env.VERSION}/send-mail`, EmailRouter);

app.all('*', (req: Request, _res: Response, next: NextFunction) => {
   next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

export default app;
