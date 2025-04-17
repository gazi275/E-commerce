// src/App/Modules/order/order.controller.ts
import { Response } from "express";
import catchAsync from "../../Utils/catchAsync";
import { sendResponse } from "../../Utils/sendResponse";
import { OrderService } from "./order.service";
import { AuthenticatedRequest } from "../../middleware/authenticateRequest";
import { orderZodSchema } from "./order.validation";

import { sendEmail } from "../../email/email";
import { UserModel } from "../user/User.model";

const createOrderController = catchAsync(
  async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user?.id!;

    const parsed = orderZodSchema.parse(req.body);
    const shippingAddressString = JSON.stringify(parsed.shippingAddress);
    const order = await OrderService.createOrder(userId, shippingAddressString);

    sendResponse(res, {
      status: 201,
      success: true,
      message: "Order placed successfully",
      data: order,
    });
  }
);

const getMyOrdersController = catchAsync(
  async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user?.id!;
    const orders = await OrderService.getOrdersByUser(userId);

    sendResponse(res, {
      status: 200,
      success: true,
      message: "Orders retrieved successfully",
      data: orders,
    });
  }
);

const cancelOrderController = catchAsync(
  async (req: AuthenticatedRequest, res: Response) => {
    const orderId = req.params.id;
    const order = await OrderService.cencelorder(orderId);

    sendResponse(res, {
      status: 200,
      success: true,
      message: "Order cancelled successfully",
      data: order,
    });
  }
);

const paymentWithCodController = catchAsync(async (req: AuthenticatedRequest, res: Response) => {
    const orderId = req.params.id;
    const userId = req.user?.id!;
    const order = await OrderService.paymentWithCod(orderId, userId, "cod");

  const user = await UserModel.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

    await sendEmail({
    to: user.email,
    subject: "🧾 Order Confirmed (Cash on Delivery)",
    text: `Hello ${user.name},\n\nYour order (${order._id}) has been confirmed.\nPayment Method: Cash on Delivery\n\nThank you for shopping with us!\n\nE-Shop Team`,
  });
    sendResponse(res, {
      status: 200,
      success: true,
      message: "Order paid successfully",
      data: order,
    });
  }
);

export const OrderController = {
  createOrderController,
  getMyOrdersController,
  cancelOrderController,
  paymentWithCodController,
};
