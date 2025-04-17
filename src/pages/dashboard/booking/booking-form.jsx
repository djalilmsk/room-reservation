"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { bookingSchema } from "@/utils/forms/booking-schema";
import { CalendarIcon, Save, X } from "lucide-react";
import { Link } from "react-router-dom";
import { CalendarField } from "@/components/home/Room/forms/pick-date";
import { PickTimeRange } from "@/components/home/Room/forms/pick-time-range";

function timeToMinutes(timeStr) {
  const [hours, minutes] = timeStr.split(":").map(Number);
  return hours * 60 + minutes;
}

const schema = bookingSchema.refine(
  (data) => timeToMinutes(data.start_time) < timeToMinutes(data.end_time),
  {
    path: ["start_time"],
    message: "Start date must be before end date",
  },
);

function BookingForm({ onSubmit: externalOnSubmit, defaultValues }) {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues || {
      date: null,
      start_time: "",
      end_time: "",
      status: "Pending",
    },
  });

  const onSubmit = (data) => {
    if (externalOnSubmit) {
      externalOnSubmit(data);
    }
    console.log("Form submitted with data:", data);
  };

  const onError = (errors) => {
    console.error("Validation errors:", errors);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, onError)}
        className="space-y-6"
      >
        <CalendarField
          name="date"
          label="Booking Date*"
          form={form}
          disabled={(date) => {
            const now = new Date();
            const max = new Date();
            max.setMonth(max.getMonth() + 3);
            return date <= now || date >= max;
          }}
        />

        <div className="space-y-2">
          <PickTimeRange form={form} />
          {form.formState.errors.start_time && (
            <FormMessage>
              {form.formState.errors.start_time.message}
            </FormMessage>
          )}
        </div>

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <div className="text-base font-semibold cursor-default">Status</div>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Confirmed">Confirmed</SelectItem>
                  <SelectItem value="Canceled">Canceled</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-x-3">
          <Button type="submit" className="w-40">
            <Save className="h-4 w-4" />
            Submit
          </Button>
          <Link to={-1}>
            <Button type="submit" variant="secondary">
              <X className="h-4 w-4" />
              cancel
            </Button>
          </Link>
        </div>
      </form>
    </Form>
  );
}

export default BookingForm;
