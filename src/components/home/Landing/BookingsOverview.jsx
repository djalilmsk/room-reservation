import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Dot } from "lucide-react";
import { customFetch } from "@/utils";
import ListLoader from "@/components/ui/list-loader";
import { useState } from "react";

function ToggleGroupState({ setState }) {
  return (
    <ToggleGroup type="single" onValueChange={setState} defaultValue="Today">
      <ToggleGroupItem
        value="Today"
        aria-label="Toggle Today"
        className="hover:text-primary data-[state=on]:text-primary cursor-pointer p-0 hover:bg-transparent data-[state=on]:bg-transparent"
        variant="ghost"
      >
        Today
      </ToggleGroupItem>
      <Dot />
      <ToggleGroupItem
        value="Tomorrow"
        aria-label="Toggle Tomorrow"
        className="hover:text-primary data-[state=on]:text-primary cursor-pointer hover:bg-transparent data-[state=on]:bg-transparent"
        variant="ghost"
      >
        Tomorrow
      </ToggleGroupItem>
      <Dot />
      <ToggleGroupItem
        className="hover:text-primary data-[state=on]:text-primary cursor-pointer hover:bg-transparent data-[state=on]:bg-transparent"
        variant="ghost"
        value="ThisWeek"
        aria-label="Toggle This Week"
      >
        This Week
      </ToggleGroupItem>
    </ToggleGroup>
  );
}

function BookingsOverview({ className }) {
  const [state, setState] = useState("Today");
  const { data: bookings, isLoading } = useQuery({
    queryKey: ["bookings-overview"],
    queryFn: async () => {
      const res = await customFetch.get(
        `/bookings/overviewBookings?period=${state}`,
      );
      return res.data.bookings;
    },
  });

  return (
    <div className={cn(className, "space-y-2")}>
      <ToggleGroupState setState={setState} />
      <div className="max-h-[400px] overflow-y-auto">
        <div className="overflow-x-auto">
          <table className="w-full">
            <tbody>
              {isLoading ? (
                <tr>
                  <ListLoader />
                </tr>
              ) : (
                bookings?.map((booking, index) => (
                  <tr key={index} className="border-t">
                    <td className="p-3 whitespace-nowrap">
                      Room Number : {booking.room_id}
                    </td>
                    <td className="p-3 whitespace-nowrap">
                      Start :{" "}
                      {new Date(booking.start_time).toLocaleTimeString(
                        "en-US",
                        { hour: "2-digit", minute: "2-digit" },
                      )}
                    </td>
                    <td className="p-3 whitespace-nowrap">
                      End :{" "}
                      {new Date(booking.end_time).toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td className="p-3 whitespace-nowrap">{booking.status}</td>
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
