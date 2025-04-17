import { Router } from "express";
import { WishlistController } from "./wishList.controller";
import { auth } from "../../middleware/auth";
const router = Router();

router.post(
  "/wishlist",
  auth(["seller", "admin", "user"]),
  WishlistController.addToWishlistController
);
router.delete(
  "/wishlist/:productId",
  auth(["seller", "admin", "user"]),
  WishlistController.removeFromWishlistController
);
router.get(
  "/wishlist",
  auth(["seller", "admin", "user"]),
  WishlistController.getUserWishlistController
);

export const WishlistRoute = router;
