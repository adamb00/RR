import 'dotenv/config';

import { Application } from 'express';
import mongoose from 'mongoose';

import env from './utils/validateEnv';
import App from './app';

class Server {
   public app: Application = new App().app;
   constructor() {
      this.connectToServer();
   }

   private connectToServer(): void {
      process.on('uncaughtException', (err: Error) => {
         console.log('UNCAUGHT EXCEPTION! 💥 Shutting down..');
         console.log(err.name, err.message);
         process.exit(1);
      });

      const DB = env.MONGO_DB.replace('<PASSWORD>', env.MONGO_PWD);

      mongoose.connect(DB).then(() => console.log('DB connection successful!'));

      const port = process.env.PORT || 3001;

      const server = this.app.listen(port, () => {
         console.log(`App running on port ${port}...`);
      });

      process.on('unhandledRejection', (err: Error) => {
         console.log('UNHANDLED REJECTION! 💥 Shutting down..');
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
   }
}

new Server();
