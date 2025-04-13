import { cn } from "@/lib/utils";

export const formatStatus = (status) => (
  <div
    className={cn(
      "rounded-lg px-3 py-1 text-sm w-fit",
      {
        Booked: "bg-destructive/25 text-destructive",
      }[status],
    )}
  >
    {status}
  </div>
);