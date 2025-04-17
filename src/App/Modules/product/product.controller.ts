import mongoose from "mongoose";
import { AuthenticatedRequest } from "../../middleware/authenticateRequest";
import catchAsync from "../../Utils/catchAsync";
import { sendResponse } from "../../Utils/sendResponse";
import { ProductService } from "./product.service";
import { productZodSchema, updateproductSchema } from "./product.validation";

const creatproductController = catchAsync(
  async (req: AuthenticatedRequest, res) => {
    const product = req.body;
    
    const parseProduct = productZodSchema.parse(product);

    // Add missing properties to match productSchema
    const completeProduct = {
      ...parseProduct,
      seller: req.user?.id,
      isDeleted: false,
    };

    const result = await ProductService.createProduct(completeProduct);
    sendResponse(res, {
      status: 200,
      success: true,
      message: "Product created successfully",
      data: result,
    });
  }
);

const getAllProductsController = catchAsync(async (req, res) => {
  const result = await ProductService.getAllProducts(req.query);
  sendResponse(res, {
    status: 200,
    success: true,
    message: "Products retrieved successfully",
    ...result
  });
});

const getSingleProductController = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ProductService.getSingleProduct(id);
  sendResponse(res, {
    status: 200,
    success: true,
    message: "Product retrieved successfully",
    data: result,
  });
});

const updateProductController = catchAsync(
  async (req: AuthenticatedRequest, res) => {
    const { id } = req.params;
    const product = req.body;
    const parseProduct = updateproductSchema.parse(product);
    const updatedProduct = {
      ...parseProduct,
      seller: req.user?.id
        ? new mongoose.Types.ObjectId(req.user.id)
        : undefined,
    };
    const result = await ProductService.updateProduct(id, updatedProduct);
    sendResponse(res, {
      status: 200,
      success: true,
      message: "Product updated successfully",
      data: result,
    });
  }
);
const deleteProductController = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ProductService.deleteProduct(id);
  sendResponse(res, {
    status: 200,
    success: true,
    message: "Product deleted successfully",
    data: result,
  });
});

const createManyProductsController = catchAsync(
  async (req: AuthenticatedRequest, res) => {
    const products = req.body;

    if (!Array.isArray(products) || products.length === 0) {
      throw new Error("Input must be a non-empty array of products");
    }

    const validatedProducts = products.map((product) => {
      const parsedProduct = productZodSchema.parse(product);
      return {
        ...parsedProduct,
        seller: req.user?.id, // Set seller from authenticated user
        isDeleted: false,
      };
    });

    const result = await ProductService.createManyProducts(validatedProducts);

    sendResponse(res, {
      status: 200,
      success: true,
      message: "Products created successfully",
      data: result,
    });
  }
);

export const ProductController = {
  creatproductController,
  getAllProductsController,
  getSingleProductController,
  updateProductController,
  deleteProductController,
  createManyProductsController,
};
