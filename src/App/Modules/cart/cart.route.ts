import express from "express";
import { CartController } from "./cart.controller";

import { auth } from "../../middleware/auth";

const router = express.Router();

router.post(
  "/cart",
  auth(["user", "admin", "seller"]),
  CartController.addToCart
);
router.get("/cart", auth(["user", "admin", "seller"]), CartController.getCart);
router.patch(
  "/cart",
  auth(["user", "admin", "seller"]),
  CartController.updateCart
);
router.delete(
  "/cart/:product",
  auth(["user", "admin", "seller"]),
  CartController.removeCart
);
router.delete(
  "/cart",
  auth(["user", "admin", "seller"]),
  CartController.clearCart
);

export const CartRoutes = router;
