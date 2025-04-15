import { Schema, model } from "mongoose";

const orderSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
      },
    ],
    totalAmount: { type: Number, required: true },
    shippingAddress: {
      address: String,
      city: String,
      postalCode: String,
      country: String,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
    paymentStatus: {
      type: String,
      enum: ["unpaid", "paid"],
      default: "unpaid",
    },
    isDeleted: { type: Boolean, default: false },
    paidAt: { type: Date },
    paymentMethod: {
      type: String,
      enum: ["cod", "stripe", "bkash"],
      default: "cod",
    },
  },
  { timestamps: true }
);

export const OrderModel = model("Order", orderSchema);
