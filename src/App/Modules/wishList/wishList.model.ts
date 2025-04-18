import { Schema, model } from "mongoose";
import { IWishlist } from "./wishList.schema";

const wishlistSchema = new Schema<IWishlist>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    addedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const WishlistModel = model<IWishlist>("Wishlist", wishlistSchema);
