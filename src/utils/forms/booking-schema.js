import { z } from "zod";

export const bookingSchema = z.object({
  date: z.date({
    message: "Date must be a valid",
  }),
  start_time: z.string().refine((date) => date !== "", {
    message: "Start time must be a valid date",
  }),
  end_time: z.string().refine((date) => date !== "", {
    path: ["start_time"],
    message: "End time must be a valid date",
  }),
  status: z.enum(["Pending", "Confirmed", "Canceled"], {
    message: "Status is required",
  }),
});
