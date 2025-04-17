import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  Port: process.env.PORT || 3000,
  MongoURI: process.env.MONGO_URI || "mongodb://localhost:27017",
  bcryptSalt: process.env.BCRYPT_SALT || 10,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRY: process.env.JWT_EXPIRY || 1,
  Stripe_Publishiable_Key: process.env.STRIPE_PUBLISHABLE_KEY,
  Stripe_Secret_Key: process.env.STRIPE_SECRET_KEY,
  CLIENT_URL: process.env.CLIENT_URL,
  WEBHOOK_SECRET: process.env.WEBHOOK_SECRET,
  MAIL_USER: process.env.MAIL_USER,
  MAIL_PASS: process.env.EMAIL_PASS,
  NODE_ENV: process.env.NODE_ENV,
};
