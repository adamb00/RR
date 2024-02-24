import 'dotenv/config';
import { cleanEnv, str, port, num } from 'envalid';

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

   FACEBOOK_ID: str(),
   FACEBOOK_SECRET: str(),
   FACEBOOK_CALLBACK_URL: str(),

   AWS_BUCKET_NAME: str(),
   AWS_BUCKET_REGION: str(),
   AWS_ACCESS_KEY: str(),
   AWS_SECRET_KEY: str(),
});
