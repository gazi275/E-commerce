import Stripe from "stripe";
import config from "../../config";

import { Request, Response } from "express";
import { OrderService } from "../order/order.service";
import { sendEmail } from "../../email/email";
import { UserModel } from "../user/User.model";

export const stripe = new Stripe(config.Stripe_Secret_Key as string, {
  apiVersion: "2025-03-31.basil",
});

export const handleStripeWebhook = async (req: Request, res: Response): Promise<void> => {
  const sig = req.headers["stripe-signature"];
  const webhookSecret = config.WEBHOOK_SECRET as string;

  let event: Stripe.Event;

  try {
    const rawBody = req.body;
    event = stripe.webhooks.constructEvent(rawBody, sig as string, webhookSecret);
  } catch (err: any) {
    console.error("❌ Webhook signature error:", err.message);
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    const orderId = session.metadata?.orderId;
    const userId = session.metadata?.userId;

    if (orderId && userId) {
      try {
        const updatedOrder = await OrderService.paymentWithCod(orderId, userId, "stripe");
        console.log("Order marked as paid successfully");
        const user = await UserModel.findById(userId);
        if (user) {
          await sendEmail({
            to: user.email,
            subject: "🧾 Order Confirmed (Stripe Payment)",
            text: `Hello ${user.name},\n\nYour payment via Stripe is successful.\nOrder ID: ${updatedOrder._id}\n\nThank you for shopping with us!\n\nE-Shop Team`,
          });

          console.log("📧 Email sent to", user.email);
      }
     }
      catch (err) {
        console.error("Error updating order payment:", err);
      }
    }
  }

  res.status(200).json({ received: true });
};

