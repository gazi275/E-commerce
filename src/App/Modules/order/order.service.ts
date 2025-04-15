// src/App/Modules/order/order.service.ts
import { OrderModel } from "./order.model";
import { CartModel } from "../cart/cart.model";
import { ProductModel } from "../product/product.model";

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


   await CartModel.deleteMany({ user: userId });

  return order;
};

const getOrdersByUser = async (userId: string) => {
  return OrderModel.find({ user: userId, isDeleted: false }).populate("products.product");
};

const cencelorder = async (orderId: string) => {
  const order = await OrderModel.findById(orderId);
  if (!order) throw new Error("Order not found");
  if (order.status === "delivered"|| order.status === "cancelled" || order.status ==="shipped") throw new Error("Order cannot be cancelled");

  for(const item of order.products){
    await  ProductModel.findByIdAndUpdate(item.product,{$inc:{stock:item.quantity}})
  }
  order.status = "cancelled";
  await order.save();
  return order;

}

const paymentWithCod = async (orderId: string,userId:string) => {
  const order= await OrderModel.findOne({_id:orderId, user:userId});
  if (!order) throw new Error("Order not found");
  if (order.paymentStatus === "paid") throw new Error("Order already paid");
  order.paymentStatus = "paid";
  order.paidAt = new Date();
  order.status = "confirmed";
   return await order.save();
}



export const OrderService = {
  createOrder,
  getOrdersByUser,
  cencelorder,
  paymentWithCod,
};
