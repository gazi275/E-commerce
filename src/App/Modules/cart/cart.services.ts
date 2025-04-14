
import { ProductModel } from "../product/product.model";
import { CartModel } from "./cart.model";


const addToCart = async (userId: string, productId: string, quantity:number) => {
 
  const product = await ProductModel.findOne({ _id: productId, isDeleted: false });

  if (!product) {
    
    throw new Error("Product not found");
  }
    if (product.stock< quantity ){
         throw new Error("Product out of stock");
    }
  
    const existing = await CartModel.findOne({ user: userId, product: productId });

   
  if (existing) {
   const newQuantity = existing.quantity + quantity;
    if (newQuantity > product.stock) {
      throw new Error("Not enough stock available");
    }
    existing.price = product.price;
existing.quantity = newQuantity;
existing.totalPrice = product.price * newQuantity;
 existing.addedAt = new Date();

    return await existing.save();
  }

  const cartItem = await CartModel.create({
    user: userId,
    product: productId,
    quantity,
    price: product.price,
    addedAt: new Date(),
    totalPrice: product.price * quantity,
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
