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
export interface IQueryParams {
  searchTerm?: string;
  category?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}
