// src/App/Modules/order/order.service.ts
import { OrderModel } from "./order.model";
import { CartModel } from "../cart/cart.model";

const createOrder = async (userId: string, shippingAddress: string) => {
  const cartItems = await CartModel.find({ user: userId }).populate("product");
  if (!cartItems.length) throw new Error("Cart is empty");

  let totalAmount = 0;
  const items = cartItems.map((item) => {
    totalAmount += item.quantity * item.price;
    return {
      product: item.product._id,
      quantity: item.quantity,
      price: item.price,
      
    };
  });

  const order = await OrderModel.create({
    user: userId,
    products: items,
    totalAmount,
    shippingAddress,
    status: "pending",
    paymentStatus: "unpaid",
  });


//   await CartModel.deleteMany({ user: userId });

  return order;
};

const getOrdersByUser = async (userId: string) => {
  return OrderModel.find({ user: userId, isDeleted: false }).populate("items.product");
};

export const OrderService = {
  createOrder,
  getOrdersByUser,
};
