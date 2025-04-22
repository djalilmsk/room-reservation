import { z } from "zod";

const timeInRange = (time) => {
  return time >= "07:00" && time <= "18:00";
};

export const bookingSchema = z.object({
  date: z.date({
    message: "Date must be a valid",
  }),
  start_time: z
    .string()
    .refine((date) => date !== "", {
      message: "Start time must be a valid date",
    })
    .refine(timeInRange, {
      message: "Start time must be between 07:00 and 18:00",
    }),
  end_time: z
    .string()
    .refine((date) => date !== "", {
      message: "End time must be a valid date",
    })
    .refine(timeInRange, {
      message: "End time must be between 07:00 and 18:00",
      path: ["start_time"], // Keep or remove depending on where you want the error to show
    }),
  status: z.enum(["Pending", "Confirmed", "Canceled"], {
    message: "Status is required",
  }),
});
