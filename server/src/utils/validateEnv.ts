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

   JWT_SECRET: str(),
   JWT_EXPIRES_IN: str(),

   FACEBOOK_ID: str(),
   FACEBOOK_SECRET: str(),
   FACEBOOK_CALLBACK_URL: str(),
});
