import dotenv from "dotenv";
import path from "path";


dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
    Port: process.env.PORT || 3000,
    MongoURI: process.env.MONGO_URI || "mongodb://localhost:27017",
    bcryptSalt: process.env.BCRYPT_SALT || 10,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRY: process.env.JWT_EXPIRY || 1,
}
