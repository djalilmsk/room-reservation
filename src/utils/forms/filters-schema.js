import { z } from "zod";

const timeInRange = (time) => {
  return (time >= "07:00" && time <= "18:00") || time === "";
};

export const filtersSchema = z.object({
  search: z.string().max(255, "Name must be 255 characters or less"),
  date: z.date().nullable().optional(),
  start_time: z.string().refine(timeInRange, {
    message: "Start time must be between 07:00 and 18:00",
  }),
  end_time: z.string().refine(timeInRange, {
    message: "End time must be between 07:00 and 18:00",
    path: ["start_time"],
  }),
  roomCapacity: z
    .number()
    .int()
    .min(0, "Room capacity must be a positive integer"),
});
