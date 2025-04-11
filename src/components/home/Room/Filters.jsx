import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { CalendarIcon, Cast } from "lucide-react";
import { useForm } from "react-hook-form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

function SelectField({
  control,
  label = "",
  placeholder = "",
  name = "",
  children,
  icon: IconComponent,
}) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-sm">{label}</FormLabel>
          <FormControl>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger
                className={`relative w-full ${IconComponent ? "pr-13" : ""}`}
              >
                <SelectValue placeholder={placeholder} />
                {IconComponent && (
                  <>
                    <Separator
                      orientation="vertical"
                      className="absolute right-10 h-full"
                    />
                    <IconComponent className="text-secondary-foreground absolute top-1/2 right-3 h-5 w-5 -translate-y-1/2" />
                  </>
                )}
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>{label}</SelectLabel>
                  {children}
                </SelectGroup>
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

function CalendarField({
  control,
  label = "",
  name = "",
  placeholder = "Pick a date",
}) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-sm">{label}</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              {/* <Button
                variant="outline"
                className={cn(
                  "w-[240px] justify-start text-left font-normal",
                  !field.value && "text-muted-foreground"
                )}
              > */}
              <div>
                {field.value ? format(field.value, "PPP") : placeholder}
                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
              </div>
              {/* </Button> */}
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                disabled={(date) => date < new Date()}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

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
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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

          <CalendarField
            control={form.control}
            label="Select Date"
            name="date"
          />

          <Button type="submit">Apply Filters</Button>
        </form>
      </Form>
    </div>
  );
}

export default Filters;
