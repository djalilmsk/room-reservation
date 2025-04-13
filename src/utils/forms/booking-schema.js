import { z } from "zod";

export const bookingSchema = z.object({
  id: z.number().int().optional(),
  user_id: z
    .number()
    .int()
    .min(1, { message: "User ID is required and must be a positive integer" }),
  room_id: z
    .number()
    .int()
    .min(1, { message: "Room ID is required and must be a positive integer" }),
  start_time: z.date().refine((date) => !isNaN(date.getTime()), {
    message: "Start time must be a valid date",
  }),
  end_time: z
    .date()
    .refine((date) => !isNaN(date.getTime()), {
      message: "End time must be a valid date",
    })
    .refine((end) => end > new Date(), {
      message: "End time must be in the future",
    }),
  status: z.enum(["Pending", "Confirmed", "Canceled"]).default("Pending"),
});
