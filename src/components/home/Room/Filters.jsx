import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Cast, Filter, Search } from "lucide-react";
import { useForm } from "react-hook-form";
import { SelectField } from "./forms/select-amenity";
import { SelectItem } from "@/components/ui/select";
import { CalendarField } from "./forms/pick-date";
import { PickTimeRange } from "./forms/pick-time-range";
import { Input } from "@/components/ui/input";
import { RoomCapacity } from "./forms/room-capacity";
import { filtersSchema } from "@/utils/forms/filters-schema";
import { zodResolver } from "@hookform/resolvers/zod";

function timeToMinutes(timeStr) {
  const [hours, minutes] = timeStr.split(":").map(Number);
  return hours * 60 + minutes;
}

const schema = filtersSchema
  .refine(
    (data) => {
      if (data.start_time && !data.end_time) {
        return false;
      }
      if (!data.start_time && data.end_time) {
        return false;
      }
      return true;
    },
    {
      path: ["start_time"],
      message: "Please select both start and end time",
    },
  )
  .refine(
    (data) =>
      timeToMinutes(data.start_time) < timeToMinutes(data.end_time) ||
      data.start_time === "",
    {
      path: ["start_time"],
      message: "Start date must be before end date",
    },
  );

function Filters() {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      search: "",
      date: null,
      start_time: "",
      end_time: "",
      roomCapacity: 0,
    },
  });

  const onSubmit = (data) => {
    console.log("Form submitted:", data);
  };
  const onError = (err) => {
    console.log("Form submitted:", err);
  };

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, onError)}
          className="xl:hidden"
        >
          <Button className="w-full" type="button" variant="secondary">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
        </form>
        <form
          onSubmit={form.handleSubmit(onSubmit, onError)}
          className="flex w-full items-end gap-4 max-xl:hidden"
        >
          <div className="flex w-full gap-4">
            <div className="w-full max-sm:w-1/2">
              <FormField
                control={form.control}
                name={"search"}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm">Name Search</FormLabel>
                    <Input
                      type="text"
                      placeholder="Search by name"
                      className="w-full"
                      {...field}
                    />{" "}
                  </FormItem>
                )}
              />
            </div>

            <div className="w-full max-sm:w-1/2">
              <CalendarField form={form} label="Booking Date" name="date" />
            </div>
          </div>

          <div className="flex w-full gap-4">
            <div className="w-full max-sm:w-1/2">
              <PickTimeRange form={form} />
            </div>

            <div className="w-full max-sm:w-1/2">
              <RoomCapacity form={form} name="roomCapacity" />
            </div>
          </div>

          <div className="">
            <Button type="submit" className="w-full">
              <Search className="h-4 w-4" /> Apply Filters
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default Filters;
