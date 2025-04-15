// src/App/Modules/order/order.route.ts
import express from "express";
import { OrderController } from "./orderr.controller";
import { auth } from "../../middleware/auth";



const router = express.Router();

router.get("/my-orders", auth(["admin","seller","user"]) ,OrderController.getMyOrdersController);
router.post("/create-order",auth(["admin","seller","user"]) , OrderController.createOrderController);
router.delete("/cancel-order/:id",auth(["admin","seller","user"]) , OrderController.cancelOrderController);
router.patch("/payment-with-cod/:id",auth(["admin","seller"]) , OrderController.paymentWithCodController);
export const OrderRoutes = router;
