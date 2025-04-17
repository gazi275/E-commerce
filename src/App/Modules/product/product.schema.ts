import { Types } from "mongoose";

export interface productSchema {
  title: string;
  image?: string;
  brand?: string;
  description?: string;
  price: number;
  category?: string;
  stock?: number;
  seller: Types.ObjectId;
  isDeleted: boolean;
}
