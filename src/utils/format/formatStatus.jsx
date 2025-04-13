import { cn } from "@/lib/utils";

export const formatStatus = (status) => (
  <div
    className={cn(
      "w-fit rounded-lg px-3 py-1 text-sm",
      {
        Booked: "bg-destructive/25 text-destructive",
        Maintenance: "bg-[#fbbc05]/25 text-[#fbbc05]",
        Available: "bg-[#34a853]/25 text-[#34a853]",
      }[status],
    )}
  >
    {status}
  </div>
);
