import z from "zod";
export const loginValidationSchema = z.object({
  email: z.string({ required_error: "Id is required." }),
  password: z.string({ required_error: "Password is required" }),
});
