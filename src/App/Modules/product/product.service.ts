// src/App/Modules/product/product.service.ts
import { ProductModel } from "./product.model";

import { Types } from "mongoose";
import { productSchema } from "./product.schema";

const createProduct = async (payload: productSchema) => {
  const newProduct = await ProductModel.create(payload);
  return newProduct;
};

const getAllProducts = async () => {
  const products = await ProductModel.find({ isDeleted: false });
  return products;
};

const getSingleProduct = async (id: string) => {
  const product = await ProductModel.findOne({
    _id: new Types.ObjectId(id),
    isDeleted: false,
  });
  return product;
};

const updateProduct = async (id: string, payload: Partial<productSchema>) => {
  const updated = await ProductModel.findOneAndUpdate(
    { _id: id, isDeleted: false },
    payload,
    { new: true }
  );
  return updated;
};

const deleteProduct = async (id: string) => {
  const deleted = await ProductModel.findOneAndUpdate(
    { _id: id, isDeleted: false },
    { isDeleted: true },
    { new: true }
  );
  return deleted;
};

const createManyProducts = async (payload: productSchema[]) => {
  const newProducts = await ProductModel.insertMany(payload);
  return newProducts;
};

export const ProductService = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  createManyProducts,
};
