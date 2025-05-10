import { Button } from "@/components/ui/button";
import { customFetch } from "@/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CheckCircle, Edit, XCircle } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import RoomCard from "../rooms/room-card";
import { Separator } from "@/components/ui/separator";
import React from "react";
import { cn } from "@/lib/utils";
import { buttonLabel } from "@/components/ui/button-label";
import { defaults } from "@/utils/format/toast-styles";
import toast from "react-hot-toast";

export function BookingDetails({
  date,
  start_time,
  end_time,
  status,
  room_id,
  roomLink,
}) {
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

  return (
    <div className="flex flex-col-reverse gap-3 @xl:grid @xl:grid-cols-2">
      <Link to={roomLink} className="w-full">
        <RoomCard data={room} />
      </Link>
      <div className="bg-card w-full space-y-6 rounded-xl px-6 py-4 shadow-sm">
        <h2 className="text-xl font-bold">Booking Details</h2>
        <div className="flex h-[80%] flex-col justify-between gap-4">
          {bookingDetails.map(({ label, value }, idx) => (
            <div key={label}>
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

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
    onError: () => {
      toast.error("Failed to delete booking.", {
        style: defaults,
      });
    },
  });

  const handleDelete = () => {
    mutate();
  };

  const { mutate: update, isPending: isUpdating } = useMutation({
    mutationFn: async (booking) => {
      const response = await customFetch.patch(`/bookings/${id}`, booking);
      return response.data.updatedBooking;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["booking"]);
      queryClient.setQueryData(["booking", id], data);
      toast.success("Booking updated successfully!", {
        style: defaults,
      });

      navigate(`/dashboard/bookings/${id}`, { replace: true });
    },
    onError: () => {
      toast.error("Failed to update booking.", {
        style: defaults,
      });
    },
  });

  const handleUpdate = (data) => {
    update(data);
  };

  return (
    <div className="@container space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Booking ID: {bookingID}</h1>
          <div className="text-secondary-foreground flex gap-2">
            user id: <p className="w-50 truncate">{user_email}</p>
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
      <BookingDetails
        roomLink={`/dashboard/rooms/${room_id}`}
        {...bookingDetail}
      />
      <div
        className={cn(
          "flex w-full items-center justify-between",
          status === "Pending" || "justify-center",
        )}
      >
        <Button
          variant="destructive_secondary"
          className="hover:bg-destructive/20 bg-transparent"
          onClick={handleDelete}
          disabled={isUpdating || isPending}
        >
          {buttonLabel(
            isPending,
            <>
              <XCircle className="size-4" /> Delete Booking
            </>,
          )}
        </Button>
        {status === "Pending" && (
          <div className="space-x-1">
            <Button
              variant="destructive_secondary"
              className="hover:bg-destructive/20 bg-transparent"
              onClick={() => handleUpdate({ status: "Canceled" })}
              disabled={isUpdating || isPending}
            >
              {buttonLabel(
                isUpdating,
                <>
                  <XCircle className="size-4" /> Cancel Booking
                </>,
              )}
            </Button>
            <Button
              variant="secondary"
              className="hover:bg-primary/20 bg-transparent"
              onClick={() => handleUpdate({ status: "Confirmed" })}
              disabled={isUpdating}
            >
              {buttonLabel(
                isUpdating || isPending,
                <>
                  <CheckCircle className="size-4" /> Accept Booking
                </>,
              )}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default SingleBooking;
