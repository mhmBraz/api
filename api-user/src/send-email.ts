import * as nodemailer from 'nodemailer';
import * as ejs from 'ejs';
import * as path from 'path';

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: true,
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
  },
});

export async function sendEmail(to: string, subject: string, html: string) {
  return transporter.sendMail({
    from: `"Lavame" <${process.env.GMAIL_APPLICATION_ACCOUNT}>`,
    to,
    subject,
    html,
  });
}

export async function mountHTML(
  params: {
    title: string;
    description: string;
  },
  template: string,
): Promise<string> {
  const templates_dir = path.join(path.resolve(), 'src', 'templates');
  const template_file = path.join(templates_dir, template);
  return ejs.renderFile(template_file, params, {});
}
