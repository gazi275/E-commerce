import  Express  from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { UserRoute } from "./App/Modules/user/User.route";
import { AuthRoute } from "./App/Modules/auth/auth.route";
import { ProductRoute } from "./App/Modules/product/product.route";
import { WishlistRoute } from "./App/Modules/wishList/wishList.route";


const app = Express();
app.use(cors());
app.use(cookieParser());
app.use(Express.json());

app.use('/api/v1', UserRoute);
app.use('/api/v1', AuthRoute);
app.use('/api/v1', ProductRoute);
app.use('/api/v1', WishlistRoute);

app.get("/", (req, res) => {
  res.send("Hello World");
});

export default app;