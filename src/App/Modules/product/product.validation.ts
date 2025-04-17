import { z } from "zod";

export const productZodSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  price: z.number().min(0),
  category: z.string().optional(),
  stock: z.number().optional(),
  images: z.array(z.string()).optional(),
  brand: z.string().optional(),
  // Assuming seller is a string (e.g., user ID)
});

export const updateproductSchema = productZodSchema.partial().extend({
  seller: z.string().optional(), // Assuming seller is a string (e.g., user ID)
});
