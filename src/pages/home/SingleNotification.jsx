import { customFetch } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { BookingDetails } from "../dashboard/booking/single-booking";
import { Page } from "@/components/ui/page";
import { Section } from "@/components/ui/section";

function SingleNotification() {
  const { id } = useParams();

  const { data: booking, isLoading: isLoadingBooking } = useQuery({
    queryKey: ["booking", id],
    queryFn: async () => {
      const response = await customFetch.get(`/bookings/${id}`);
      return response.data.booking;
    },
  });

  const {
    id: bookingID,
    date,
    start_time,
    end_time,
    status,
    user_email,
    room_id,
  } = {
    ...booking,
    user_email: booking?.user?.email,
    date: booking?.start_time
      ? new Date(booking.start_time).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : "",
    start_time: booking?.start_time
      ? new Date(booking.start_time).toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        })
      : "",
    end_time: booking?.end_time
      ? new Date(booking.end_time).toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        })
      : "",
  } || {};

  const bookingDetail = {
    date,
    start_time,
    end_time,
    status,
    room_id,
  };

  return (
    <Page className="space-y-6 max-sm:pt-18 sm:space-y-30 md:pt-0">
      <Section className="@container space-y-2 xl:space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Booking ID: {bookingID}</h1>
            <div className="text-secondary-foreground flex gap-2">
              user id: <p className="w-50 truncate">{user_email}</p>
            </div>
          </div>
        </div>
        <BookingDetails roomLink={`/rooms/${room_id}`} {...bookingDetail} />
      </Section>
    </Page>
  );
}

export default SingleNotification;
