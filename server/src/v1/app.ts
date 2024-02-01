import express, { Application, NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import env from './utils/validateEnv';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import path from 'path';

import UserRouter from './routes/UserRoute';
import LinkRouter from './routes/LinkRoute';
import NotificationRouter from './routes/NotificationRoute';
import AppError from './utils/appError';
import { globalErrorHandler } from './controllers/ErrorController';

const app: Application = express();

app.enable('trust proxy');

app.use(cookieParser());
app.use(helmet());

app.use(cors({ origin: '*', credentials: true, methods: ['GET', 'POST', 'PATCH', 'DELETE'] }));
app.options('*', cors());

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

if (env.NODE_ENV === 'development') app.use(morgan('dev'));

app.use(`/api/${env.VERSION}/user`, UserRouter);
app.use(`/api/${env.VERSION}/link`, LinkRouter);
app.use(`/api/${env.VERSION}/notification`, NotificationRouter);

app.all('*', (req: Request, _res: Response, next: NextFunction) => {
   next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

export default app;
