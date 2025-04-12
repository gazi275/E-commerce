import { Router } from "express";
import { ProductController } from "./product.controller";
import { auth } from "../../middleware/auth";
const router = Router();
router.post("/product",auth(["seller"]), ProductController.creatproductController);
router.get("/products", ProductController.getAllProductsController);
router.get("/product/:id", ProductController.getSingleProductController);
router.patch("/product/:id",auth(["seller"]), ProductController.updateProductController);
router.delete("/product/:id",auth(["seller","admin"]), ProductController.deleteProductController);
router.post("/bulk", auth(["seller","admin"]), ProductController.createManyProductsController);


export const ProductRoute = router;
