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
  if (!timeStr) return 0;
  const [hours = 0, minutes = 0] = timeStr.split(":").map(Number);
  return hours * 60 + minutes;
}

const schema = filtersSchema
  .refine(
    ({ start_time, end_time }) =>
      !((start_time && !end_time) || (!start_time && end_time)),
    {
      path: ["start_time"],
      message: "Please select both start and end time",
    },
  )
  .refine(
    ({ start_time, end_time }) =>
      !start_time ||
      !end_time ||
      timeToMinutes(start_time) < timeToMinutes(end_time),
    {
      path: ["start_time"],
      message: "Start time must be before end time",
    },
  );

function FiltersForm({ form, className, onSubmit }) {
  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className={cn("flex w-full items-end gap-4 max-xl:flex-wrap", className)}
    >
      <div className="w-full">
        <FormField
          control={form.control}
          name="search"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm">Name Search</FormLabel>
              <Input type="text" placeholder="Search by name" {...field} />
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

      <div className="max-xl:mt-4 max-xl:w-full">
        <Button data-drawer-focus type="submit" className="w-full">
          <Search className="h-4 w-4" />
          Apply Filters
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

  const handleSubmit = (data) => {
    console.log(data);
    const drawerCloseButton = document.getElementById("drawer-close-button");
    drawerCloseButton?.click();
  };

  return (
    <div className="space-y-6">
      <Form {...form}>
        <Drawer>
          <DrawerTrigger asChild className="mb-2 w-full xl:hidden">
            <Button type="button" variant="secondary" className="w-full">
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

              <FiltersForm form={form} onSubmit={handleSubmit} />

              <DrawerClose asChild id="drawer-close-button">
                <Button variant="outline" className="mt-3 w-full">
                  Cancel
                </Button>
              </DrawerClose>
            </div>
          </DrawerContent>
        </Drawer>

        {/* Desktop Form */}
        <FiltersForm
          form={form}
          onSubmit={handleSubmit}
          className="max-xl:hidden"
        />
      </Form>
    </div>
  );
}

export default Filters;
