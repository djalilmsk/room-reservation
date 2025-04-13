import { z } from "zod";

export const roomSchema = z.object({
  name: z.string().max(20).trim().nonempty(),
  capacity: z.number().int().positive(),
  amenities: z.string().max(255),
  type: z.string().max(50).trim().nullish(),
  note: z.string().trim().nullish(),
  description: z.string().trim().nullish(),
  status: z.enum(["Available", "Booked", "Maintenance"]).default("Available"),
});
