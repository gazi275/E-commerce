import { CartModel } from "./cart.model";


const addToCart = async (userId: string, productId: string, quantity = 1) => {
  const existing = await CartModel.findOne({ user: userId, product: productId });

  if (existing) {
    existing.quantity += quantity;
    return await existing.save();
  }

  const cartItem = await CartModel.create({
    user: userId,
    product: productId,
    quantity,
  });

  return cartItem;
};

const getUserCart = async (userId: string) => {
  return await CartModel.find({ user: userId }).populate("product");
};

const updateCartItem = async (userId: string, productId: string, quantity: number) => {
  return await CartModel.findOneAndUpdate(
    { user: userId, product: productId },
    { quantity },
    { new: true }
  );
};

const removeCartItem = async (userId: string, productId: string) => {
  return await CartModel.findOneAndDelete({ user: userId, product: productId });
};

const clearCart = async (userId: string) => {
  return await CartModel.deleteMany({ user: userId });
};

export const CartService = {
  addToCart,
  getUserCart,
  updateCartItem,
  removeCartItem,
  clearCart,
};
