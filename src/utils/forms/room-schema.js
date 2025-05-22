import { z } from "zod";

export const roomSchema = z.object({
  name: z.string().max(20).trim().nonempty(),
  capacity: z.number().int().positive(),
  pricing: z.number().int().positive(),
  amenities: z.string().max(255),
  type: z.string().max(50).trim().nullish(),
  note: z.string().max(2000).trim().nullish(),
  description: z.string().trim().nullish(),
  status: z.enum(["Available", "Booked", "Maintenance"]).default("Available"),
  images: z
    .array(
      z
        .unknown()
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
            return file.size <= 10 * 1024 * 1024;
          },
          { message: "Image must be less than 1MB" },
        ),
    )
    .nonempty({
      message: "At least one image is required",
    }),
});
