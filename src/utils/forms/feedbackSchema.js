import { z } from "zod";

export const feedbackSchema = z.object({
  is_anonymous: z.boolean().optional().nullable(),

  rating: z.number().min(0).max(5),

  satisfied_aspects: z
    .array(
      z.enum([
        "Customer-Service",
        "Room-Quality",
        "Amenities",
        "Booking-Process",
      ]),
    )
    .optional()
    .nullable(),

  feedback: z.string().max(500).optional().nullable(),
});
