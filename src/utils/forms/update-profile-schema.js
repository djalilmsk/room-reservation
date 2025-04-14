import { z } from "zod";

export const formSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "First name must be at least 2 characters" })
    .max(50, { message: "First name must be less than 50 characters" })
    .regex(/^[a-zA-Z\s-]+$/, {
      message: "First name can only contain letters, spaces, or hyphens",
    })
    .trim(),

  lastName: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters" })
    .max(50, { message: "Last name must be less than 50 characters" })
    .regex(/^[a-zA-Z\s-]+$/, {
      message: "Last name can only contain letters, spaces, or hyphens",
    })
    .trim(),

  email: z
    .string()
    .trim()
    .min(1, { message: "Email is required" })
    .email({ message: "Please enter a valid email address" })
    .max(255, { message: "Email must be less than 255 characters" })
    .refine((email) => email.toLowerCase().endsWith(".com"), {
      message: "Only .com email addresses are accepted",
    }),

  image: z
    .instanceof(File, {
      message: "",
    })
    .optional()
    .refine(
      (file) => {
        if (file === null) return true;
        return ["image/png", "image/jpeg", "image/jpg"].includes(file.type);
      },
      { message: "Only .png and .jpg images are accepted" },
    )
    .refine(
      (file) => {
        if (!file) return true;
        return file.size <= 5 * 1024 * 1024;
      },
      { message: "Image must be less than 5MB" },
    ),
  profession: z
    .string()
    .min(1, { message: "Please select how you describe yourself" }),

  referral_source: z
    .string()
    .min(1, { message: "Please select how you found out about us" }),

  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .max(128, { message: "Password must be less than 128 characters" }),

  newPassword: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .max(128, { message: "Password must be less than 128 characters" }),

  confirmPassword: z
    .string()
    .min(1, { message: "Password confirmation is required" })
    .max(128),
});
