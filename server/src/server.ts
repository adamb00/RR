import mongoose from 'mongoose';
import env from './utils/validateEnv';

import { server as Server } from './app';

process.on('uncaughtException', err => {
   console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
   console.log(err.name, err.message);
   process.exit(1);
});
const DB = env.MONGO_DB.replace('<PASSWORD>', env.MONGO_PWD);

mongoose.connect(DB).then(() => console.log('DB connection successful!'));

const port = env.PORT || 3000;

const server = Server.listen(port, () => {
   console.log(`App running on port ${port}...`);
});

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
