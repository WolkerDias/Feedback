import nodemailer from 'nodemailer';
import { MailAdapter, sendMailData } from "../mail-adapter";

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "73c1b0ed26a54f",
      pass: "09c2a9a1a576c9"
    }
  });

export class NodemaillerMailAdapter implements MailAdapter {
    async sendMail({ subject, body }: sendMailData) {

        await transport.sendMail({
            from: 'Equipe Feedget <oi@feedget.com>',
            to: 'Wolker Dias <wolkersanches@gmail.com>',
            subject,
            html: body,
        });

    }
}