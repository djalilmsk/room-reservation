import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Dot } from "lucide-react";

function ToggleGroupState() {
  return (
    <ToggleGroup type="single">
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
        value="Thisweek"
        aria-label="Toggle This Week"
      >
        This Week
      </ToggleGroupItem>
    </ToggleGroup>
  );
}

const data = [
  {
    room: "Conference Room A",
    time: "9:00 AM - 10:30 AM",
    event: "Team Standup",
    attendees: 8,
  },
  {
    room: "Board Room",
    time: "11:00 AM - 12:00 PM",
    event: "Client Meeting",
    attendees: 4,
  },
  {
    room: "Training Room",
    time: "2:00 PM - 4:00 PM",
    event: "Product Training",
    attendees: 12,
  },
  {
    room: "Training Room",
    time: "2:00 PM - 4:00 PM",
    event: "Product Training",
    attendees: 12,
  },
  {
    room: "Training Room",
    time: "2:00 PM - 4:00 PM",
    event: "Product Training",
    attendees: 12,
  },
];

function BookingsOverview({ className }) {
  const { data: bookings, isLoading } = useQuery({
    queryKey: ["bookings-overview"],
    queryFn: async () => {
      const res = await customFetch.get(
        `/bookings/overviewBookings?period=${""}`,
      );
      return res.data;
    },
  });

  return (
    <div className={cn(className, "space-y-2")}>
      <ToggleGroupState />
      <div className="max-h-[400px] overflow-y-auto">
        <div className="overflow-x-auto">
          <table className="w-full">
            <tbody>
              {false ? (
                <tr>
                  <td colSpan="4" className="p-4 text-center">
                    Loading...
                  </td>
                </tr>
              ) : (
                data?.map((booking, index) => (
                  <tr key={index} className="border-t">
                    <td className="p-3 whitespace-nowrap">{booking.room}</td>
                    <td className="p-3 whitespace-nowrap">{booking.time}</td>
                    <td className="p-3 whitespace-nowrap">{booking.event}</td>
                    <td className="p-3 whitespace-nowrap">
                      {booking.attendees}
                    </td>
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
