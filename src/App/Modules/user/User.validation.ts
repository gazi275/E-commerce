import { z } from "zod";

export const userSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Invalid email format"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .regex(/[A-Z]/, "Must contain at least one uppercase letter")
    .regex(/[0-9]/, "Must contain at least one number"),
  role: z.enum(["admin", "user", "seller"]).default("user"),
  contact: z.string().optional(),
  address: z.string().optional(),
  isDeleted: z.boolean().default(false),
  isVerified: z.boolean().default(false),
});

export const UserUpdatedSchema = z.object({
  name: z.string().optional(),
  contact: z.string().optional(),
  address: z.string().optional(),
});
