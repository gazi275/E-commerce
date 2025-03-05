import { Router } from "express";
import { UserController } from "./User.controller";

const router = Router();
router.post("/signup", UserController.createUSer);

export const UserRoute = router;
