import { MailAdapter, SendMailData } from "../mail-adapter";
import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "88ea28520e8d7c",
        pass: "c318fb759322e0"
    }
});

export class NodemailerMailAdapter implements MailAdapter {
    async sendMail({ subject, body}: SendMailData){
        await transport.sendMail({
            from: "Equipe Feedget <hello@feedget.com>",
            to: "Matheus Mazzola <rzmatheus@live.com>",
            subject: subject,
            html: body,
        })
    }
}