import { Schema, model } from "mongoose";
import { ICart } from "./cart.interface";

const cartSchema = new Schema<ICart>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    quantity: { type: Number, required: true, default: 1 },
    price: { type: Number, required: true },
    addedAt: { type: Date, default: Date.now },
    totalPrice: { type: Number, required: true },
    isDeleted: { type: Boolean, default: false },
},
  {
    timestamps: true,
  }
);

cartSchema.index({ user: 1, product: 1 }, { unique: true });

export const CartModel = model<ICart>("Cart", cartSchema);
