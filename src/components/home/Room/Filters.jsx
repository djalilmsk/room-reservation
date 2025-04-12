import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Cast } from "lucide-react";
import { useForm } from "react-hook-form";
import { SelectField } from "./forms/select-amenity";
import { SelectItem } from "@/components/ui/select";
import { CalendarField } from "./forms/pick-date";
import { PickTimeRange } from "./forms/pick-time-range";
import { Input } from "@/components/ui/input";
import { RoomCapacity } from "./forms/room-capacity";

function Filters() {
  const form = useForm({
    defaultValues: {
      amenities: "",
      date: null, // Default to null for the date field
    },
  });

  const onSubmit = (data) => {
    console.log("Form submitted:", data);
  };

  return (
    <div className="space-y-6">
      <Form {...form}>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex w-full gap-y-4 md:flex-row md:items-end md:gap-x-4"
          >
            <div className="w-full md:w-[calc(50%-0.5rem)] lg:w-full">
              <SelectField
                control={form.control}
                label="Amenities"
                placeholder="Select Amenities"
                name="amenities"
                icon={Cast}
              >
                <SelectItem value="apple">Apple</SelectItem>
                <SelectItem value="banana">Banana</SelectItem>
                <SelectItem value="blueberry">Blueberry</SelectItem>
                <SelectItem value="grapes">Grapes</SelectItem>
                <SelectItem value="pineapple">Pineapple</SelectItem>
              </SelectField>
            </div>

            <div className="w-full md:w-[calc(50%-0.5rem)] lg:w-full">
              <CalendarField
                control={form.control}
                label="Booking Date"
                name="date"
              />
            </div>

            <div className="w-full md:w-[calc(50%-0.5rem)] lg:w-full">
              <PickTimeRange control={form.control} />
            </div>

            <div /* className="w-full md:w-[calc(50%-0.5rem)] lg:w-full" */>
              <RoomCapacity control={form.control} name="roomCapacity" />
            </div>

            <div className="w-full md:w-auto">
              <Button type="submit" className="w-full md:w-auto">
                Apply Filters
              </Button>
            </div>
          </form>
        </Form>
      </Form>
    </div>
  );
}

export default Filters;
