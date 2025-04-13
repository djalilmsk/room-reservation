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
import { Save, X } from "lucide-react";
import { Link } from "react-router-dom";

function BookingForm({ onSubmit: externalOnSubmit, defaultValues }) {
  const form = useForm({
    resolver: zodResolver(bookingSchema),
    defaultValues: defaultValues || {
      user_id: 0,
      room_id: 0,
      start_time: new Date(),
      end_time: new Date(),
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
        <FormField
          control={form.control}
          name="user_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>User ID*</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter User ID"
                  {...field}
                  onChange={(e) =>
                    field.onChange(parseInt(e.target.value) || 0)
                  }
                  value={field.value || 0} // Ensure value is controlled
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="room_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Room ID*</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter Room ID"
                  {...field}
                  onChange={(e) =>
                    field.onChange(parseInt(e.target.value) || 0)
                  }
                  value={field.value || 0} // Ensure value is controlled
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
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
