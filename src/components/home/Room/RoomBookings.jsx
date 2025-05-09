import { Button } from "@/components/ui/button";
import { Section, SectionTitle } from "@/components/ui/section";
import { cn } from "@/lib/utils";
import { customFetch } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeftSquare, ArrowRightSquare } from "lucide-react";
import { useRef, useState } from "react";
import { useParams } from "react-router-dom";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// Generate 30-minute time slots for a specific date
const generateTimeSlots = (date) => {
  const slots = [];
  const start = new Date(date);
  start.setHours(7, 0, 0, 0);

  const end = new Date(date);
  end.setHours(18, 30, 0, 0);

  while (start < end) {
    const slotStart = new Date(start);
    const slotEnd = new Date(start);
    slotEnd.setMinutes(slotEnd.getMinutes() + 30);

    slots.push({ slotStart: new Date(slotStart), slotEnd: new Date(slotEnd) });
    start.setMinutes(start.getMinutes() + 30);
  }

  return slots;
};

function RoomBookings() {
  const btn = useRef(null);
  const section = useRef(null);
  const { id } = useParams();
  const [page, setPage] = useState(1);
  const [showAll, setShowAll] = useState(false);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["room-bookings", id, page],
    queryFn: async () => {
      const response = await customFetch.get(
        `/rooms/${id}/bookings?page=${page}`,
      );
      return response.data.data;
    },
    enabled: !!id,
    keepPreviousData: true,
  });

  if (isLoading) {
    return (
      <Section>
        <div>Loading bookings...</div>
      </Section>
    );
  }

  if (!data || data.length === 0) {
    return (
      <Section>
        <div>No bookings available.</div>
      </Section>
    );
  }

  return (
    <Section
      ref={section}
      className={cn("relative mt-10", !showAll && "h-140 overflow-hidden")}
    >
      <h1 className="py-5 text-2xl font-semibold">Current Room Bookings</h1>
      <div
        className={
          !showAll &&
          "[mask-image:linear-gradient(to_bottom,black,transparent_40%)]"
        }
      >
        {data.map((day, dayIndex) => {
          const bookingDate = day.date
            ? new Date(day.booking.start_time)
            : new Date(
                new Date().setDate(
                  new Date().getDate() + (dayIndex + 1) + (page - 1) * 7,
                ),
              );
          const slots = generateTimeSlots(bookingDate);

          return (
            <div key={dayIndex} className="mb-4 flex flex-wrap gap-2">
              <h3 className="w-full text-lg font-semibold">
                {bookingDate.toDateString()}
              </h3>
              {slots.map((slot, i) => {
                const isInBookingRange = day.some((booking) => {
                  const bookingStart = new Date(booking.start_time);
                  const bookingEnd = new Date(booking.end_time);

                  console.log(booking, slot);
                  return (
                    slot.slotEnd > bookingStart && slot.slotStart < bookingEnd
                  );
                });

                return (
                  <div
                    key={`${dayIndex}-${i}`}
                    className={cn(
                      "flex h-12 w-20 items-center justify-center rounded text-sm",
                      isInBookingRange
                        ? "bg-primary/40"
                        : "bg-muted-foreground/40",
                    )}
                  >
                    {slot.slotStart.toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: false,
                    })}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>

      <div className="mt-4 flex justify-between">
        <Button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          <ArrowLeftSquare /> Prev.
        </Button>
        <div className="flex items-center">
          <Button
            size="sm"
            className="cursor-default hover:no-underline"
            variant="link"
          >
            Page {page}
          </Button>{" "}
          -
          <Button
            ref={btn}
            onClick={() => {
              setShowAll((prv) => !prv);
              setPage(1);
            }}
            size="sm"
            variant="link"
          >
            Show Less
          </Button>
        </div>
        <Button
          onClick={() => setPage((prev) => prev + 1)}
          disabled={!data || data.length === 0}
        >
          Next
          <ArrowRightSquare />
        </Button>
      </div>

      <div
        className={cn(
          "flex items-end justify-center pb-10",
          showAll ? "hidden" : "sticky bottom-0",
        )}
      >
        <Button ref={btn} onClick={() => setShowAll((prv) => !prv)} size="sm">
          Show More
        </Button>
      </div>
    </Section>
  );
}

export default RoomBookings;
