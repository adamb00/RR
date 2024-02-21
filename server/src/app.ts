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
import AuthRouter from './routes/AuthRoute';
import AppError from './utils/appError';
import { globalErrorHandler } from './controllers/ErrorController';
import crypto from 'crypto';

import { createServer } from 'http';
import { Server } from 'socket.io';
import { handleSocketNotification } from './controllers/NotificationController';

const nonce = crypto.randomBytes(16).toString('hex');
const app: Application = express();
export const server = createServer(app);

app.enable('trust proxy');

app.use(cookieParser());

app.use(cors({ origin: '*', credentials: true, methods: ['GET', 'POST', 'PATCH', 'DELETE'] }));
app.options('*', cors());

// const io = new Server(server, { cors: { origin: 'http://192.168.20.189:5173' } }); // BANDULA
const io = new Server(server, { cors: { origin: 'http://192.168.0.33:5173' } });

io.on('connection', socket => {
   socket.on('send_message', async data => {
      const res = await handleSocketNotification(data);
      socket.broadcast.emit('notification_created', res);
   });

   io.on('connect_error', err => {
      console.log(`connect_error due to ${err.message}`);
   });
});

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
// app.use(express.static(path.join(__dirname, 'public')));

app.use(
   helmet({
      contentSecurityPolicy: {
         directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'", "'strict-dynamic'", `'nonce-${nonce}'`, 'http:', 'https:'],
            objectSrc: ["'none'"],
            baseUri: ["'none'"],
            requireTrustedTypesFor: ["'script'"],
         },
      },
   })
);

if (env.NODE_ENV === 'development') app.use(morgan('dev'));

app.use(`/api/${env.VERSION}/auth`, AuthRouter);
app.use(`/api/${env.VERSION}/user`, UserRouter);
app.use(`/api/${env.VERSION}/link`, LinkRouter);
app.use(`/api/${env.VERSION}/notification`, NotificationRouter);

app.all('*', (req: Request, _res: Response, next: NextFunction) => {
   next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

export default app;