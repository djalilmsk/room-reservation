import { Button } from "@/components/ui/button";
import { customFetch } from "@/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Edit, XCircle } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import RoomCard from "../rooms/room-card";
import { Separator } from "@/components/ui/separator";
import React from "react";
import { cn } from "@/lib/utils";
import { buttonLabel } from "@/components/ui/button-label";
import { defaults } from "@/utils/format/toast-styles";
import toast from "react-hot-toast";

function SingleBooking() {
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
    mutationFn: async (data) => {
      await customFetch.delete(`/bookings/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
        refetchActive: true,
        refetchInactive: true,
      });
      queryClient.removeQueries(["booking", id]);

      toast.success("Booking deleted successfully!", {
        style: defaults,
      });

      navigate("/dashboard/bookings");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to delete booking.", {
        style: defaults,
      });
    },
  });

  const {
    id: bookingID,
    room_id,
    date,
    start_time,
    end_time,
    status,
    user_id,
  } = {
    ...booking,
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

  const { data: room, isLoading: isLoadingRoom } = useQuery({
    queryKey: ["room", room_id],
    queryFn: async () => {
      const response = await customFetch.get(`/rooms/${room_id}`);
      return response.data.room;
    },
  });

  const bookingDetails = [
    { label: "date", value: date },
    { label: "start time", value: start_time },
    { label: "end time", value: end_time },
    { label: "status", value: status },
  ];

  const handleDelete = () => {
    mutate();
  };

  return (
    <div className="@container space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Booking ID: {bookingID}</h1>
          <div className="text-secondary-foreground flex gap-2">
            user id: <p className="w-50 truncate">{user_id}</p>
          </div>
        </div>
        <Button
          variant="secondary"
          onClick={() => navigate(`/dashboard/bookings/edit-booking/${id}`)}
        >
          <Edit className="h-5 w-5" />
          <p className="max-sm:hidden">Edit Booking</p>
        </Button>
      </div>
      <div className="flex flex-col-reverse gap-3 @xl:grid @xl:grid-cols-2">
        <Link to={`/dashboard/rooms/${room?.id}`} className="w-full">
          <RoomCard data={room} />
        </Link>
        <div className="bg-card w-full space-y-6 rounded-xl px-6 py-4 shadow-sm">
          <h2 className="text-xl font-bold">Booking Details</h2>
          <div className="flex h-[80%] flex-col justify-between gap-4">
            {bookingDetails.map(({ label, value }, idx) => (
              <React.Fragment key={label}>
                <div className="flex items-center justify-between">
                  <p className="flex-shrink-0 capitalize">{label}</p>
                  <p
                    className={cn(
                      "truncate text-right",
                      (value?.toLowerCase() === "pending" ||
                        value?.toLowerCase() === "canceled" ||
                        value?.toLowerCase() === "confirmed") &&
                        "my-1 w-fit rounded-md px-4 py-1 text-center",
                      {
                        pending: "bg-[#fbbc05]/20 text-[#fbbc05]",
                        confirmed: "bg-[#34a853]/20 text-[#34a853]",
                        canceled: "bg-[#eb4335]/20 text-[#eb4335]",
                      }[value?.toLowerCase()],
                    )}
                  >
                    {value}
                  </p>
                </div>
                {idx !== bookingDetails.length - 1 && <Separator />}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
      <div className="w-full text-center">
        <Button
          variant="destructive_secondary"
          className="hover:bg-destructive/20 bg-transparent"
          onClick={handleDelete}
        >
          {buttonLabel(
            isPending,
            <>
              <XCircle /> Delete Booking
            </>,
          )}
        </Button>
      </div>
    </div>
  );
}

export default SingleBooking;
