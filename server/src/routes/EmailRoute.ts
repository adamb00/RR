import { Router } from 'express';
import nodemailer from 'nodemailer';
import env from '../utils/validateEnv';

const router: Router = Router();
class Email {
   private to: string;
   private from: string;
   private fullName: string;

   constructor(email: string, fullName: string) {
      this.to = email;
      this.fullName = fullName;
      this.from = env.EMAIL_FROM;
   }

   private newTransportDev() {
      return nodemailer.createTransport({
         host: 'mail.r2byou.com',
         port: 465,
         secure: true,
         auth: {
            user: env.EMAIL_USERNAME,
            pass: env.EMAIL_PASSWORD,
         },
      });
   }

   public async send(subject: string, template: string) {
      try {
         const mailOptions = {
            from: this.from,
            to: this.to,
            subject,
            text: 'Hello world',
         };
         await this.newTransportDev().sendMail(mailOptions);
      } catch (err) {
         console.log(err);
      }
   }

   public async sendWelcome() {
      await this.send('Welcome', 'welcome');
   }
}

router.route('/').post(async () => {
   await new Email('borsodi.dm@gmail.com', 'Borsodi Adam').sendWelcome();
});

export default router;

// mail {
//    server_name mail.r2byou.com;
//    auth_http   http://localhost:8000;
//    # disabling xclient command
//    xclient off;
//    server {
//        listen     476;
//        protocol   smtp;
//        smtp_auth  none;
//    }
// }
