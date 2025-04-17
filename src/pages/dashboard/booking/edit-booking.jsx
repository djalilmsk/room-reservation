import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import BookingForm from "./booking-form";
import { replace, useNavigate, useParams } from "react-router-dom";
import { customFetch } from "@/utils";
import { date } from "zod";

function EditBooking() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { id } = useParams();

  const { data: booking, isLoading: isLoadingBooking } = useQuery({
    queryKey: ["booking", id],
    queryFn: async () => {
      const response = await customFetch.get(`/bookings/${id}`);
      return response.data.booking;
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (booking) => {
      const response = await customFetch.patch(`/bookings/${id}`, booking);
      return response.data.updatedBooking;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["booking"]);
      queryClient.setQueryData(["booking", id], data);

      navigate(`/dashboard/bookings/${id}`, { replace: true });
    },
  });

  const defaultValues =
    {
      ...booking,
      date: booking?.start_time
        ? new Date(booking.start_time.split("T")[0])
        : null,
      start_time: booking?.start_time
        ? new Date(booking.start_time).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })
        : "",
      end_time: booking?.end_time
        ? new Date(booking.end_time).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })
        : "",
    } || {};

  const mergeTimeWithDate = (date, time) => {
    const [hours, minutes] = time.split(":").map(Number);
    const merged = new Date(date);
    merged.setHours(hours, minutes, 0, 0);
    return merged;
  };

  const onSubmit = (data) => {
    console.log(mergeTimeWithDate(data.date, data.start_time));
    console.log(mergeTimeWithDate(data.date, data.end_time));

    const postDate = {
      start_time: mergeTimeWithDate(data.date, data.start_time),
      end_time: mergeTimeWithDate(data.date, data.end_time),
      status: data.status,
    };

    mutate(postDate);
  };

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Update Booking</h1>
      <BookingForm onSubmit={onSubmit} defaultValues={defaultValues} />
    </div>
  );
}

export default EditBooking;
