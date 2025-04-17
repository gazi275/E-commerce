import express from "express";
import { PaymentController } from "./payment.controller";
import { handleStripeWebhook } from "./utilis";
import { auth } from "../../middleware/auth";

const router = express.Router();

router.post("/create-checkout-session",auth(["admin","seller","user"]), PaymentController.createStripeSession);
router.post("/webhook", handleStripeWebhook); 

export const PaymentRoutes = router;