import { Types } from "mongoose";
import { WishlistModel } from "./wishList.model";

const addToWishlist = async (userId: string, productId: string) => {
  const existingWishlistItem = await WishlistModel.findOne({
    user: userId,
    product: productId,
  });
  if (existingWishlistItem) {
    throw new Error("Product already in wishlist");
  }

  const wishlistItem = await WishlistModel.create({
    user: new Types.ObjectId(userId),
    product: new Types.ObjectId(productId),
  });
  return wishlistItem;
};

const removeFromWishlist = async (userId: string, productId: string) => {
  const result = await WishlistModel.findOneAndDelete({
    user: userId,
    product: productId,
  });

  if (!result) {
    throw new Error("Product not found in wishlist");
  }

  return result;
};

const getUserWishlist = async (userId: string) => {
  const wishlist = await WishlistModel.find({ user: userId }).populate({
    path: "product",
    match: { isDeleted: false },
  });

  return wishlist;
};
export const WishlistService = {
  addToWishlist,
  removeFromWishlist,
  getUserWishlist,
};
