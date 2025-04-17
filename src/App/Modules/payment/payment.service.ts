// src/App/Modules/payment/payment.service.ts

import config from "../../config";
import { OrderModel } from "../order/order.model";
import { stripe } from "./utilis";

const createStripeCheckoutSession = async (orderId: string, userId:string) => {
  const order = await OrderModel.findById(orderId).populate("products.product");
  if (!order) throw new Error("Order not found");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const lineItems = order.products.map((item: any) => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: item.product.title,
        description: item.product.description,
      },
      unit_amount: Math.round(item.price * 100),
    },
    quantity: item.quantity,
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    success_url: `${config.CLIENT_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${config.CLIENT_URL}/payment-cancel`,
    metadata: {
      userId: userId,
      orderId: order._id.toString(),
    },
  });

  return session.url;
};

export const PaymentService = {
  createStripeCheckoutSession,
};
