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

import AppError from './utils/appError';
import { globalErrorHandler } from './controllers/ErrorController';

import { createServer } from 'http';
import { Server } from 'socket.io';
// import { handleSocketNotification } from './controllers/NotificationController';
import { getImage } from './middlewares/getImage';

const app: Application = express();
// export const server = createServer(app);

app.enable('trust proxy');

app.use(cookieParser());
app.use(compression());

app.use(helmet());

// app.use(cors({ origin: '*', credentials: true, methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'] }));
app.use(cors());
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

app.all('*', (req: Request, _res: Response, next: NextFunction) => {
   next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

// const io = new Server(server, { cors: { origin: '*' }, path: '/socket.io' });

// io.sockets.setMaxListeners(0);

// io.once('connect_error', err => {
//    console.log(`connect_error due to ${err.message}`);
// });
// io.once('connection', socket => {
//    socket.on('link', async data => {
//       socket.broadcast.emit('link', data);
//    });

//    socket.once('send_message', async data => {
//       const res = await handleSocketNotification(data);
//       socket.broadcast.emit('notification_created', res);
//    });
// });

export default app;
