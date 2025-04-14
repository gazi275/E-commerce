import { z } from "zod";

export const addToCartSchema = z.object({
  product: z.string({ required_error: "Product ID is required" }),
  quantity: z.number().min(1).optional(),
  
});