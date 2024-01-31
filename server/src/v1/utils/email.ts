import nodemailer from 'nodemailer';
import { htmlToText } from 'html-to-text';
import env from './validateEnv';
import { UserType } from '../models/UserModel';
import pug from 'pug';

export default class Email {
   private to: string;
   private from: string;
   private fullName: string;
   private url: string;
   private user: UserType;

   constructor(user: UserType, url: string) {
      this.to = env.EMAIL_FROM;
      this.fullName = user.name;
      this.url = url;
      this.user = user;
      this.from = `Adam Borsodi <${env.EMAIL_FROM}`;
   }

   private newTransport() {
      return nodemailer.createTransport({
         host: env.EMAIL_HOST,
         port: env.EMAIL_PORT,
         auth: {
            user: env.EMAIL_USERNAME,
            pass: env.EMAIL_PASSWORD,
         },
      });
   }

   public async send(subject: string, template: string) {
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

      await this.newTransport().sendMail(mailOptions);
   }

   public async sendWelcome() {
      await this.send('Welcome', 'welcome');
   }
}
