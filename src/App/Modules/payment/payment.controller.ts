import {  Response } from "express";
import { PaymentService } from "./payment.service";
import catchAsync from "../../Utils/catchAsync";
import { sendResponse } from "../../Utils/sendResponse";
import { AuthenticatedRequest } from "../../middleware/authenticateRequest";


const createStripeSession = catchAsync(async (req:AuthenticatedRequest, res: Response) => {
  const { orderId } = req.body;
  const userId = req.user?.id!; 

  const session = await PaymentService.createStripeCheckoutSession(orderId, userId);
  console.log(session, "session url");

  sendResponse(res, {
    status: 200,
    success: true,
    message: "Stripe session created",
    data: { url: session},
  });
});

export const PaymentController = {
  createStripeSession,
};
