import { z } from "zod";

export const formSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: "Email is required" })
    .email({ message: "Please enter a valid email address" })
    .max(255, { message: "Email must be less than 255 characters" })
    .refine((email) => email.toLowerCase().endsWith(".com"), {
      message: "Only .com email addresses are accepted",
    }),

  OTP: z.string().min(6, {
    message: "Confirmation code is required",
  }),

  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .max(128, { message: "Password must be less than 128 characters" }),

  confirmPassword: z
    .string()
    .min(1, { message: "Password confirmation is required" })
    .max(128),
});
