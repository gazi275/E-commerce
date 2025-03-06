import { Router } from "express";
import { UserController } from "./User.controller";

const router = Router();
router.post("/signup", UserController.createUSer);
router.get('/user', UserController.getAllUserController);
router.get('/user/:id', UserController.getUSerController);

export const UserRoute = router;
