import nodemailer, { Transporter } from 'nodemailer';
import { htmlToText } from 'html-to-text';
import env from './validateEnv';
import pug from 'pug';
import IUser from '../interfaces/IUser';
import { google } from 'googleapis';

export default class Email {
   private to: string;
   private from: string;
   private fullName: string;
   private url: string;
   private user: IUser;

   constructor(user: IUser, url: string) {
      this.to = user.email;
      this.fullName = user.name;
      this.url = url;
      this.user = user;
      this.from = `Adam Borsodi <${env.EMAIL_FROM}`;
   }

   private newTransportDev() {
      return nodemailer.createTransport({
         host: env.EMAIL_HOST,
         port: env.EMAIL_PORT,
         auth: {
            user: env.EMAIL_USERNAME,
            pass: env.EMAIL_PASSWORD,
         },
      });
   }

   private async newTransport(): Promise<Transporter> {
      const OAuth2 = google.auth.OAuth2;

      const oauth2Client = new OAuth2(
         env.EMAIL_CLIENT_ID,
         env.EMAIL_CLIENT_SECRET,
         'https://developers.google.com/oauthplayground'
      );

      oauth2Client.setCredentials({
         refresh_token: env.EMAIL_REFRESH_TOKEN,
      });

      const accessToken = await new Promise((resolve, reject) => {
         oauth2Client.getAccessToken((err, token) => {
            if (err) {
               console.log('*ERR: ', err);
               reject(err);
            }
            resolve(token);
         });
      });

      const transporter = nodemailer.createTransport({
         pool: true,
         host: 'smtp.gmail.com',
         port: 465,
         secure: true,
         auth: {
            type: 'OAuth2',
            user: env.EMAIL_FROM,
            accessToken: accessToken as string,
            clientId: env.EMAIL_CLIENT_ID,
            clientSecret: env.EMAIL_CLIENT_SECRET,
            refreshToken: env.EMAIL_REFRESH_TOKEN,
         },
      });

      return transporter;
   }

   public async send(subject: string, template: string) {
      try {
         const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`, {
            fullName: this.fullName,
            user: this.user,
            url: this.url,
            subject,
         });

         console.log(this.url);

         const mailOptions = {
            from: this.from,
            to: this.to,
            subject,
            html,
            text: htmlToText(html),
         };

         if (env.NODE_ENV === 'dev') await this.newTransportDev().sendMail(mailOptions);
         else await (await this.newTransport()).sendMail(mailOptions);
      } catch (err) {
         console.log(err);
      }
   }

   public async sendWelcome() {
      await this.send('Welcome', 'welcome');
   }

   public async sendPasswordReset() {
      await this.send('Your password reset token (valid for only 10 minutes)', 'passwordReset');
   }
}
