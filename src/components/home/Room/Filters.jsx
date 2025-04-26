import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Filter, Search } from "lucide-react";
import { useForm } from "react-hook-form";
import { CalendarField } from "./forms/pick-date";
import { PickTimeRange } from "./forms/pick-time-range";
import { Input } from "@/components/ui/input";
import { RoomCapacity } from "./forms/room-capacity";
import { filtersSchema } from "@/utils/forms/filters-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

function timeToMinutes(timeStr) {
  if (!timeStr || typeof timeStr !== "string") return 0;
  const [hours, minutes] = timeStr.split(":").map(Number);
  return isNaN(hours) || isNaN(minutes) ? 0 : hours * 60 + minutes;
}

const schema = filtersSchema
  .refine(
    (data) => {
      if (data.start_time && !data.end_time) return false;
      if (!data.start_time && data.end_time) return false;
      return true;
    },
    {
      path: ["start_time"],
      message: "Please select both start and end time",
    },
  )
  .refine(
    (data) => {
      if (data.start_time && data.end_time) {
        return timeToMinutes(data.start_time) < timeToMinutes(data.end_time);
      }
      return true; // Skip validation if either time is empty
    },
    {
      path: ["start_time"],
      message: "Start time must be before end time",
    },
  );

function FiltersForm({
  form,
  onSubmit: externalSubmit,
  onError: externalError,
  className,
}) {
  const onSubmit = (data) => {
    if (externalSubmit) {
      externalSubmit(data);
    }
  };

  const onError = (err) => {
    if (externalError) {
      externalError(err);
    }
  };

  return (
    <form
      onSubmit={form?.handleSubmit(onSubmit, onError)}
      className={cn("flex w-full items-end gap-4 max-xl:flex-wrap", className)}
    >
      <div className="w-full">
        <FormField
          control={form?.control}
          name={"search"}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm">Name Search</FormLabel>
              <Input
                type="text"
                placeholder="Search by name"
                className="w-full"
                {...field}
              />
            </FormItem>
          )}
        />
      </div>

      <div className="w-full">
        <CalendarField form={form} label="Booking Date" name="date" />
      </div>

      <div className="w-full">
        <PickTimeRange form={form} />
      </div>

      <div className="w-full">
        <RoomCapacity form={form} name="roomCapacity" />
      </div>

      <div className="max-xl:w-full max-xl:mt-4">
        <Button type="submit" className="w-full">
          <Search className="h-4 w-4" /> Apply Filters
        </Button>
      </div>
    </form>
  );
}

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
    console.log(data);
    // Handle form submission (e.g., API call or state update)
  };

  const onError = (err) => {
    // Handle form errors (e.g., display toast notification)
  };

  return (
    <div className="space-y-6">
      <Form {...form}>
        <Drawer>
          <DrawerTrigger className="w-full mb-2 xl:hidden">
            <Button className="w-full " type="button" variant="secondary">
              <Filter className="h-4 w-4" />
              Filters
            </Button>
          </DrawerTrigger>
          <DrawerContent className="flex items-center justify-center pb-10">
            <div className="max-w-[400px] px-4">
              <DrawerHeader>
                <DrawerTitle />
                <DrawerDescription />
              </DrawerHeader>
              <FiltersForm
                form={form}
                onSubmit={(data) => {
                  onSubmit(data);
                  // Optionally close the drawer after submission
                  document.getElementById("drawer-close-button")?.click();
                }}
                onError={onError}
              />

              <DrawerClose className="mt-3 w-full" id="drawer-close-button">
                <Button variant="outline" className="w-full">
                  Cancel
                </Button>
              </DrawerClose>
            </div>
          </DrawerContent>
        </Drawer>

        <FiltersForm
          form={form}
          onSubmit={onSubmit}
          onError={onError}
          className="max-xl:hidden"
        />
      </Form>
    </div>
  );
}

export default Filters;
