import  Express  from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { UserRoute } from "./App/Modules/user/User.route";


const app = Express();
app.use(cors());
app.use(cookieParser());
app.use(Express.json());

app.use('/api/v1', UserRoute);

app.get("/", (req, res) => {
  res.send("Hello World");
});

export default app;