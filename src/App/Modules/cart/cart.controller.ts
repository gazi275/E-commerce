import catchAsync from "../../Utils/catchAsync";
import { sendResponse } from "../../Utils/sendResponse";
import { AuthenticatedRequest } from "../../middleware/authenticateRequest";
import { CartService } from "./cart.services";

import { addToCartSchema } from "./cart.validation";

const addToCart = catchAsync(async (req: AuthenticatedRequest, res) => {
  const userId = req.user?.id!;
  const parsed = addToCartSchema.parse(req.body);

  const result = await CartService.addToCart(
    userId,
    parsed.product,
    parsed.quantity ?? 1
  );
  sendResponse(res, {
    status: 200,
    success: true,
    message: "Product added to cart",
    data: result,
  });
});

const getCart = catchAsync(async (req: AuthenticatedRequest, res) => {
  const result = await CartService.getUserCart(req.user?.id!);
  sendResponse(res, {
    status: 200,
    success: true,
    message: "Cart fetched",
    data: result,
  });
});

const updateCart = catchAsync(async (req: AuthenticatedRequest, res) => {
  const userId = req.user?.id!;
  const { product, quantity } = req.body;
  const result = await CartService.updateCartItem(userId, product, quantity);
  sendResponse(res, {
    status: 200,
    success: true,
    message: "Cart updated",
    data: result,
  });
});

const removeCart = catchAsync(async (req: AuthenticatedRequest, res) => {
  const userId = req.user?.id!;
  const { product } = req.params;
  const result = await CartService.removeCartItem(userId, product);
  sendResponse(res, {
    status: 200,
    success: true,
    message: "Product removed from cart",
    data: result,
  });
});

const clearCart = catchAsync(async (req: AuthenticatedRequest, res) => {
  const result = await CartService.clearCart(req.user?.id!);
  sendResponse(res, {
    status: 200,
    success: true,
    message: "Cart cleared",
    data: result,
  });
});

export const CartController = {
  addToCart,
  getCart,
  updateCart,
  removeCart,
  clearCart,
};
