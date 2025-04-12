import {  Response } from "express";
import catchAsync from "../../Utils/catchAsync";
import { sendResponse } from "../../Utils/sendResponse";

import { AuthenticatedRequest } from "../../middleware/authenticateRequest";
import { WishlistService } from "./wishList.service";

const addToWishlistController = catchAsync(async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user?.id;
  const { productId } = req.body;
 

  const result = await WishlistService.addToWishlist(userId!, productId);

  sendResponse(res, {
    status: 201,
    success: true,
    message: "Product added to wishlist",
    data: result,
  });
});

const removeFromWishlistController = catchAsync(async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user?.id;
  const { productId } = req.params;
  
  

  const result = await WishlistService.removeFromWishlist(userId!, productId);

  sendResponse(res, {
    status: 200,
    success: true,
    message: "Product removed from wishlist",
    data: result,
  });
});

const getUserWishlistController = catchAsync(async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user?.id;

  const result = await WishlistService.getUserWishlist(userId!);

  sendResponse(res, {
    status: 200,
    success: true,
    message: "Wishlist fetched successfully",
    data: result,
  });
});

export const WishlistController = {
  addToWishlistController,
  removeFromWishlistController,
  getUserWishlistController,
};
