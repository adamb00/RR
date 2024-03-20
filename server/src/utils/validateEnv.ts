import dotenv from 'dotenv';
import { cleanEnv, str, port, num } from 'envalid';

const envFile = process.env.NODE_ENV === 'prod' ? '.env.prod' : '.env.dev';
dotenv.config({ path: envFile });

export default cleanEnv(process.env, {
   PORT: port(),
   NODE_ENV: str(),
   MONGO_PWD: str(),
   MONGO_DB: str(),
   VERSION: str(),

   EMAIL_FROM: str(),
   EMAIL_USERNAME: str(),
   EMAIL_PASSWORD: str(),
   EMAIL_HOST: str(),
   EMAIL_PORT: num(),

   EMAIL_CLIENT_ID: str(),
   EMAIL_CLIENT_SECRET: str(),
   EMAIL_REFRESH_TOKEN: str(),
   EMAIL_ACCESS_TOKEN: str(),

   JWT_SECRET: str(),
   JWT_EXPIRES_IN: str(),

   AWS_BUCKET_NAME: str(),
   AWS_BUCKET_REGION: str(),
   AWS_ACCESS_KEY: str(),
   AWS_SECRET_KEY: str(),

   BASE_URL: str(),
});
