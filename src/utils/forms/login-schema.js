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
  agreedToTerms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and privacy policy",
  }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .max(128, { message: "Password must be less than 128 characters" }),
});
