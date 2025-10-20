import { z } from "zod";

export const signupFormSchema = z.object({
  email: z.email({
    message: "Email is required.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  name: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .optional(),
});
