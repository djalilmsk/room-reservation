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
            className="flex w-full items-end gap-4 max-xl:flex-wrap"
          >
            <div className="flex gap-4 w-full">
              <div className="w-full">
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

              <div className="w-90">
                <CalendarField
                  control={form.control}
                  label="Booking Date"
                  name="date"
                />
              </div>
            </div>

            <div className="flex gap-4 w-full">
              <div className="w-full">
                <PickTimeRange control={form.control} />
              </div>

              <div>
                <RoomCapacity control={form.control} name="roomCapacity" />
              </div>
            </div>

            <div className="w-full">
              <Button type="submit" className="w-full">
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
