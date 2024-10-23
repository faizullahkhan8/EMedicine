require("dotenv").config();
import nodeMailer, { Transporter } from "nodemailer";
import path from "path";
import ejs from "ejs";
import { MailOptions } from "nodemailer/lib/smtp-pool";

interface IEmailOptions {
    email: string;
    subject: string;
    template: string;
    data: { [key: string]: any };
}

const sendEmail = async function (options: IEmailOptions): Promise<void> {
    const transporter: Transporter = nodeMailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || "456"),
        service: process.env.SMTP_SERVICE,
        auth: {
            user: process.env.SMTP_MAIL,
            pass: process.env.SMTP_PASSWORD,
        },
    });

    const { data, email, subject, template } = options as IEmailOptions;

    const templatePath = path.join(__dirname, "../emails", template);

    const html = await ejs.renderFile(templatePath, data);

    const mailOptions: MailOptions = {
        from: process.env.SMTP_MAIL,
        to: email,
        subject,
        html,
    };

    await transporter.sendMail(mailOptions);
};

export default sendEmail;
