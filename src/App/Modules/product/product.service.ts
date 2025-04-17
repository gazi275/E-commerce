// src/App/Modules/product/product.service.ts
import { ProductModel } from "./product.model";

import { Types } from "mongoose";
import { IQueryParams, productSchema } from "./product.schema";

const createProduct = async (payload: productSchema) => {
  const existingProduct = await ProductModel.findOne({
    name: payload.title,
    isDeleted: false,
})
  if (existingProduct) {
    throw new Error("Product already exists");
  }
  const newProduct = await ProductModel.create(payload);
  return newProduct;
};

export const getAllProducts = async (query: IQueryParams) => {
  const {
    searchTerm,
    category,
    brand,
    minPrice,
    maxPrice,
    page = 1,
    limit = 10,
    sortBy = "createdAt",
    sortOrder = "desc",
  } = query;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const filters: any = { isDeleted: false };

  // 🔍 Search by title
  if (searchTerm) {
    filters.$or = [
      { title: { $regex: searchTerm, $options: "i" } },
      { description: { $regex: searchTerm, $options: "i" } },
    ];
  }
  
  if (category) {
    filters.category = { $regex: new RegExp(`^${category}$`, "i") };
  }
  
  if (brand) {
    filters.brand = { $regex: new RegExp(`^${brand}$`, "i") };
  }
  
  if (minPrice !== undefined || maxPrice !== undefined) {
    filters.price = {};
    if (minPrice !== undefined) {
      filters.price.$gte = minPrice;
    }
    if (maxPrice !== undefined) {
      filters.price.$lte = maxPrice;
    }
  }

  // 📄 Pagination
  const skip = (Number(page) - 1) * Number(limit);

  // ↕️ Sorting
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sortConditions: any = {};
  if (sortBy) sortConditions[sortBy] = sortOrder === "asc" ? 1 : -1;

  // 🚀 Query execution
  const products = await ProductModel.find(filters)
    .sort(sortConditions)
    .skip(skip)
    .limit(Number(limit));

  const total = await ProductModel.countDocuments(filters);

  return {
    meta: {
      page: Number(page),
      limit: Number(limit),
      total,
    },
    data: products,
  };
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
