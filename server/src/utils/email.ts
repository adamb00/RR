import nodemailer from 'nodemailer';
import { htmlToText } from 'html-to-text';
import env from './validateEnv';
import pug from 'pug';
import IUser from '../interfaces/IUser';

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
      this.from = env.EMAIL_FROM;
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
   private newTransportProd() {
      const transport = nodemailer.createTransport({
         host: env.EMAIL_HOST,
         port: env.EMAIL_PORT,
         secure: true,
         auth: {
            user: env.EMAIL_USERNAME,
            pass: env.EMAIL_PASSWORD,
         },
      });

      console.log(transport);

      return transport;
   }

   public async send(subject: string, template: string) {
      try {
         const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`, {
            fullName: this.fullName,
            user: this.user,
            url: this.url,
            subject,
         });

         const mailOptions = {
            from: this.from,
            to: this.to,
            subject,
            html,
            text: htmlToText(html),
         };

         console.log(env.NODE_ENV);

         if (env.NODE_ENV === 'dev') await this.newTransportDev().sendMail(mailOptions);
         else await this.newTransportProd().sendMail(mailOptions);
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
