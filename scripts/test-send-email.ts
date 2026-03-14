import { render } from '@react-email/render';
import ApplicationsOpenTemplate from '@/emails/apps-open';
import NodeMailer from "nodemailer";

const transporter = NodeMailer.createTransport({
  host: "smtp.privateemail.com", // Privatemail SMTP server
  port: 587, // Port for TLS, use 465 for SSL
  secure: false, // Use TLS (false for port 587)
  auth: {
    user: process.env.SMTP_USER, // Your Privatemail address
    pass: process.env.SMTP_PASSWORD, // Your Privatemail password
  },
  tls: {
    rejectUnauthorized: false, // Ignore self-signed certificate issues (if any)
  },
});

const content = ApplicationsOpenTemplate({
  applicationLink: "https://eurekahacks.ca/apply", // TODO: make it correct
  unsubscribeLink: "https://eurekahacks.ca/unsubscribe",
});

// Send an email using async/await
(async () => {
  console.log("Rendering template...")
  const rawHtml = await render(content);

  console.log("Sending test email...")
  const info = await transporter.sendMail({
    from: '"EurekaHACKS" <hello@eurekahacks.ca>',
    to: "test@ultrablob.me", //! my personal email :skull: don't use for production
    subject: "Test Message",
    html: rawHtml
  });

  console.log("Message sent:", info.messageId);
})();