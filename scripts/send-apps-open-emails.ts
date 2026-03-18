import { render } from '@react-email/render';
import ApplicationsOpenTemplate from '@/emails/apps-open';
import NodeMailer from 'nodemailer';
import { readFile } from 'fs/promises';

if (!process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
  console.error('SMTP_USER or SMTP_PASSWORD not set');
  process.exit(1);
}

const transporter = NodeMailer.createTransport({
  host: 'smtp.privateemail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

async function loadEmails(filePath: string): Promise<string[]> {
  const file = await readFile(filePath, 'utf8');

  return file
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0 && !line.startsWith('#'));
}

(async () => {
  try {
    console.log('Loading email list...');
    const emails = await loadEmails('./waitlist.txt');

    if (emails.length === 0) {
      console.log('No emails found in waitlist.txt');
      return;
    }

    console.log(`Found ${emails.length} email(s)`);

    console.log('Rendering template...');
    const content = ApplicationsOpenTemplate({
      applicationLink: 'https://eurekahacks.ca/dashboard',
    });
    const rawHtml = await render(content);

    console.log('Sending emails...');
    for (const email of emails) {
      try {
        const info = await transporter.sendMail({
          from: '"EurekaHACKS" <hello@eurekahacks.ca>',
          to: email,
          subject: 'EurekaHACKS applications are open!',
          html: rawHtml,
        });

        console.log(`Sent to ${email}: ${info.messageId}`);
      } catch (err) {
        console.error(`Failed to send to ${email}:`, err);
      }
    }

    console.log('Done.');
  } catch (err) {
    console.error('Fatal error:', err);
    process.exit(1);
  }
})();