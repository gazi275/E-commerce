import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
    Port: process.env.PORT || 3000,
    MongoURI: process.env.MONGO_URI || "mongodb://localhost:27017",
}
