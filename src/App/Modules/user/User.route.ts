import { Router } from "express";
import { UserController } from "./User.controller";
import { auth } from "../../middleware/auth";

const router = Router();
router.post("/signup", UserController.createUSer);
router.get("/user", auth(["admin"]), UserController.getAllUserController);
router.get(
  "/user/profile",
  auth(["user", "admin", "seller"]),
  UserController.getUSerController
);
router.patch(
  "/user/profile",
  auth(["user", "admin", "seller"]),
  UserController.updateUser
);

export const UserRoute = router;
