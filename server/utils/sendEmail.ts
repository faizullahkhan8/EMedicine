// Load environment variables from the .env file
import dotenv from "dotenv";
dotenv.config();

import nodemailer, { Transporter } from "nodemailer";
import path from "path";
import ejs from "ejs";
import { MailOptions } from "nodemailer/lib/smtp-pool";

// Define the structure of the email options object
interface IEmailOptions {
    email: string; // Recipient's email address
    subject: string; // Subject of the email
    template: string; // Template file name (located in ../emails folder)
    data: { [key: string]: any }; // Data to be passed to the template
}

/**
 * Send an email using Nodemailer and EJS for templating.
 *
 * @description Sends an email using SMTP configuration, with the ability to render dynamic content using EJS templates.
 *
 * @param {IEmailOptions} options - Object containing email details (recipient, subject, template, and data for rendering).
 *
 * @example
 * const options = {
 *   email: 'user@example.com',
 *   subject: 'Welcome to our service',
 *   template: 'welcome.ejs',
 *   data: { name: 'John Doe' }
 * };
 * await sendEmail(options);
 *
 * @returns {Promise<void>} Promise that resolves when the email is sent.
 *
 * @throws Error if there is an issue sending the email.
 */
const sendEmail = async (options: IEmailOptions): Promise<void> => {
    // Create a transporter object using the SMTP settings from environment variables
    const transporter: Transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || "456"), // Default to port 456 if not specified
        service: process.env.SMTP_SERVICE, // Optional if using a known service like Gmail
        auth: {
            user: process.env.SMTP_MAIL, // SMTP account email
            pass: process.env.SMTP_PASSWORD, // SMTP account password
        },
    });

    const { email, subject, template, data } = options;

    // Path to the EJS email template file
    const templatePath = path.join(__dirname, "../emails", `${template}`);

    // Render the EJS template with the provided data
    const html = await ejs.renderFile(templatePath, data);

    // Define the email options, including the rendered HTML content
    const mailOptions: MailOptions = {
        from: process.env.SMTP_MAIL, // Sender email address
        to: email, // Recipient email address
        subject, // Email subject
        html, // Rendered HTML content
    };

    // Send the email using the transporter
    await transporter.sendMail(mailOptions);
};

export default sendEmail;
