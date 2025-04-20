import { CalendarField } from "@/components/home/Room/forms/pick-date";
import { PickTimeRange } from "@/components/home/Room/forms/pick-time-range";
import RoomDetails from "@/components/home/Room/RoomDetails";
import { Form, FormMessage } from "@/components/ui/form";
import { Page } from "@/components/ui/page";
import { Section, SectionTitle } from "@/components/ui/section";
import { customFetch } from "@/utils";
import { bookingSchema } from "@/utils/forms/booking-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import React from "react";
import { DialogClose } from "@radix-ui/react-dialog";
import { BookingForm } from "@/components/home/Room/forms/booking-form";
import { useUser } from "@/hooks/useUser";
import { Pin } from "lucide-react";
import { defaults } from "@/utils/format/toast-styles";
import toast from "react-hot-toast";
import ActionProtection from "@/router/authentication/action-protection";

function timeToMinutes(timeStr) {
  const [hours, minutes] = timeStr.split(":").map(Number);
  return hours * 60 + minutes;
}

const schema = bookingSchema
  .pick({
    date: true,
    start_time: true,
    end_time: true,
  })
  .refine(
    (data) => timeToMinutes(data.start_time) < timeToMinutes(data.end_time),
    {
      path: ["start_time"],
      message: "Start date must be before end date",
    },
  );

function SingleRoom() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { data: user } = useUser();
  const { id } = useParams();

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      date: null,
      start_time: "",
      end_time: "",
    },
  });

  const {
    data: room,
    isLoading,
    error,
    isError,
  } = useQuery({
    queryKey: ["room", id],
    queryFn: async () => {
      const response = await customFetch.get(`/rooms/${id}`);
      return response.data.room;
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (booking) => {
      const response = await customFetch.post(`/bookings`, booking);
      return response.data;
    },
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries(["bookings"]);

      toast.success("Room booked successfully!", {
        style: defaults,
      });

      navigate(`/rooms`, { replace: true });
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to book room.", {
        style: defaults,
      });
    },
  });

  if (isError) {
    console.error(error);
    return <div>Error loading room details.</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!room) {
    return <div>Room not found!</div>;
  }

  const mergeTimeWithDate = (date, time) => {
    const [hours, minutes] = time.split(":").map(Number);
    const merged = new Date(date);
    merged.setHours(hours, minutes, 0, 0);
    return merged;
  };

  const onSubmit = (data) => {
    console.log(data);

    const postDate = {
      user_id: user.id,
      room_id: id,
      start_time: mergeTimeWithDate(data.date, data.start_time),
      end_time: mergeTimeWithDate(data.date, data.end_time),
    };

    console.log(postDate);
    mutate(postDate);
    form.reset();
  };

  return (
    <Page className="sm:space-y-18 sm:pt-10 lg:space-y-24">
      <Section>
        <RoomDetails {...room}>
          <div className="flex w-full justify-end">
            <Dialog className="shadow-none" modal={false}>
              <ActionProtection
                guest={
                  <Button>
                    <Pin className="h-4 w-4" /> Book Now
                  </Button>
                }
              >
                <DialogTrigger className="w-30 max-md:w-full" asChild>
                  <Button>
                    <Pin className="h-4 w-4" /> Book Now
                  </Button>
                </DialogTrigger>
              </ActionProtection>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Book Room</DialogTitle>
                  <DialogDescription>
                    Fill the form below to reserve your spot.
                  </DialogDescription>
                </DialogHeader>
                <BookingForm
                  onSubmit={onSubmit}
                  form={form}
                  isPending={isPending}
                />
              </DialogContent>
            </Dialog>
          </div>
        </RoomDetails>
      </Section>
    </Page>
  );
}

export default SingleRoom;
