import { z } from "zod";

// Password strength validation
const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters long")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/\d/, "Password must contain at least one number")
  .regex(
    /[!@#$%^&*(),.?":{}|<>]/,
    "Password must contain at least one special character"
  );

// Sign up validation schema
export const signUpSchema = z
  .object({
    username: z
      .string()
      .min(1, "Username is required")
      .min(2, "Username must be at least 2 characters")
      .max(50, "Username must be less than 50 characters")
      .regex(/^[a-zA-Z\s]+$/, "Username can only contain letters and spaces"),
    email: z
      .email("Please enter a valid email address")
      .min(1, "Email is required")
      .max(255, "Email must be less than 255 characters"),
    password: passwordSchema,
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// Sign in validation schema
export const signInSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean().optional(),
});

// Magic link validation schema
export const magicLinkSchema = z.object({
  email: z.email("Please enter a valid email address"),
});

// Password reset validation schema
export const resetPasswordSchema = z.object({
  email: z.email("Please enter a valid email address"),
});

// Types
export type SignUpFormData = z.infer<typeof signUpSchema>;
export type SignInFormData = z.infer<typeof signInSchema>;
export type MagicLinkFormData = z.infer<typeof magicLinkSchema>;
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
