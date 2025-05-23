import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Dot } from "lucide-react";

import { cn } from "@/lib/utils";
import { customFetch } from "@/utils";
import ListLoader from "@/components/ui/list-loader";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

function ToggleGroupState({ setState }) {
  const toggleItemClass =
    "hover:text-primary data-[state=on]:text-primary cursor-pointer hover:bg-transparent data-[state=on]:bg-transparent";

  return (
    <ToggleGroup type="single" onValueChange={setState} defaultValue="today">
      <ToggleGroupItem value="today" aria-label="Toggle Today" variant="ghost" className={cn(toggleItemClass, "p-0")}>
        Today
      </ToggleGroupItem>
      <Dot />
      <ToggleGroupItem value="tomorrow" aria-label="Toggle Tomorrow" variant="ghost" className={toggleItemClass}>
        Tomorrow
      </ToggleGroupItem>
      <Dot />
      <ToggleGroupItem value="thisweek" aria-label="Toggle This Week" variant="ghost" className={toggleItemClass}>
        This Week
      </ToggleGroupItem>
    </ToggleGroup>
  );
}

function BookingsOverview({ className }) {
  const [state, setState] = useState("today");

  const { data: bookings, isLoading } = useQuery({
    queryKey: ["bookings-overview", state],
    queryFn: async () => {
      const res = await customFetch.get(`/bookings/overviewBookings?period=${state}`);
      return res.data.bookings;
    },
  });

  const formatTime = (time) =>
    new Date(time).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-US", { day: "2-digit", month: "long" });

  return (
    <div className={cn("space-y-2", className)}>
      <ToggleGroupState setState={setState} />
      <div className="max-h-[400px] overflow-y-auto">
        <div className="overflow-x-auto">
          <table className="w-full">
            <tbody>
              {isLoading ? (
                <tr>
                  <td>
                    <ListLoader />
                  </td>
                </tr>
              ) : (
                bookings?.map((booking, index) => (
                  <tr key={index} className="border-t">
                    <td className="p-3 whitespace-nowrap">Room Number: {booking?.room_id}</td>
                    <td className="p-3 whitespace-nowrap">Start: {formatTime(booking?.start_time)}</td>
                    <td className="p-3 whitespace-nowrap">Date: {formatDate(booking?.start_time)}</td>
                    <td className="p-3 whitespace-nowrap">End: {formatTime(booking?.end_time)}</td>
                    <td className="p-3 whitespace-nowrap">{booking?.status}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default BookingsOverview;
