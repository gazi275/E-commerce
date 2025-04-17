import { Types } from "mongoose";

export interface IOrderProduct {
  product: Types.ObjectId;
  quantity: number;
  price: number;
}

export interface IOrder {
  user: Types.ObjectId;
  products: IOrderProduct[];
  totalAmount: number;
  shippingAddress: {
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  status?: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";
  paymentStatus?: "unpaid" | "paid";
  isDeleted?: boolean;
  paymentMethod: "cod" | "stripe" | "bkash";
  paidAt?: Date;
}
