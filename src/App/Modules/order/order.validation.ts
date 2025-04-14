import { z } from "zod";

export const orderZodSchema = z.object({
  shippingAddress: z.object({
    address: z.string(),
    city: z.string(),
    postalCode: z.string(),
    country: z.string(),
  }),
});
