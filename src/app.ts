import  Express  from "express";
import cors from "cors";
import cookieParser from "cookie-parser";


const app = Express();
app.use(cors());
app.use(cookieParser());
app.use(Express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});