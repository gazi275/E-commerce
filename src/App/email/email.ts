import nodemailer from "nodemailer";
import config from "../config";

export const sendEmail = async ({
  to,
  subject,
  text,
}: {
  to: string;
  subject: string;
  text: string;
}) => {
  console.log(config.MAIL_USER, config.MAIL_PASS);
  try {
  


    const transporter = nodemailer.createTransport({
        
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: config.MAIL_USER,
        pass: config.MAIL_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: `"E-Shop" <${config.MAIL_USER}>`,
      to,
      subject,
      text,
    });

    console.log("✅ Email sent:", info.messageId);
  } catch (error) {
    console.error("❌ Failed to send email:", error);
    throw error;
  }
};
