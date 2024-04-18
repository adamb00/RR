import mongoose from 'mongoose';
import env from './utils/validateEnv';
import app from './app';
// import { Server, Socket } from 'socket.io';

const DB = env.MONGO_DB.replace('<PASSWORD>', env.MONGO_PWD);
const port = env.PORT || 3000;

const server = app.listen(port, () => {
   console.log(`App running on port ${port}...`);
});

process.on('uncaughtException', err => {
   console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
   console.log(err.name, err.message);
   process.exit(1);
});

mongoose.connect(DB).then(() => console.log('DB connection successful!'));

process.on('unhandledRejection', (err: Error) => {
   console.log('UNHANDLED REJECTION! 💥 Shutting down...');
   console.log(err.name, err.message);
   server.close(() => {
      process.exit(1);
   });
});

process.on('SIGTERM', () => {
   console.log('👋 SIGTERM RECEIVED. Shutting down gracefully');
   server.close(() => {
      console.log('💥 Process terminated!');
   });
});

// const io = new Server(server, {
//    cors: { origin: env.NODE_ENV === 'prod' ? ['https://admin.r2byou.com', 'https://r2byou.com'] : '*' },
// });

// io.on('connection', (socket: Socket) => {
//    socket.on('notification', data => {
//       socket.broadcast.emit('notification_created', data);
//    });
//    socket.on('disconnect', () => {
//       console.log(`Socket disconnected: ${socket.id}`);
//    });

//    socket.on('error', (err: Error) => {
//       console.error(`Socket error: ${err.message}`);
//    });
// });
