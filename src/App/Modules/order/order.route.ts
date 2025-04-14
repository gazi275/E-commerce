// src/App/Modules/order/order.route.ts
import express from "express";
import { OrderController } from "./orderr.controller";
import { auth } from "../../middleware/auth";



const router = express.Router();

router.get("/my-orders", auth(["admin","seller","user"]) ,OrderController.getMyOrdersController);
router.post("/create-order",auth(["admin","seller","user"]) , OrderController.createOrderController);

export const OrderRoutes = router;
